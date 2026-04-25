import requests
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from flask_cors import CORS
import pytz
import io
import sys
import traceback
import base64
import jwt
SECRET_KEY = "secretkey123"  # same as Node backend
import matplotlib.pyplot as plt
app = Flask(__name__)
CORS(app)

# Sample Node.js API URL
# NODEJS_API_URL = 'http://cloud.xtranssolutions.com/node/api/channels/{channel_id}/entries/read'
# NODEJS_API_URL = 'http://127.0.0.1:4001/api/channels/{channel_id}/entries/read'
NODEJS_API_URL = 'http://server:4001/api/channels/{channel_id}/entries/read'

@app.route('/code/run', methods=['POST'])
def run_code():
    try:
        data = request.get_json()
        code = data.get("code")

        if not code:
            return jsonify({"error": "No code provided"}), 400

        # Capture print output
        old_stdout = sys.stdout
        sys.stdout = io.StringIO()

        plots = []

        # Execute code
        exec_globals = {}
        exec(code, exec_globals)

        # Capture printed output
        output = sys.stdout.getvalue()

        # Capture matplotlib plots (if any)
        for fig_num in plt.get_fignums():
            fig = plt.figure(fig_num)
            img = io.BytesIO()
            fig.savefig(img, format='png')
            img.seek(0)
            plots.append({
                "image": base64.b64encode(img.read()).decode('utf-8')
            })

        plt.close('all')

        sys.stdout = old_stdout

        return jsonify({
            "output": output,
            "plots": plots
        }), 200

    except Exception as e:
        sys.stdout = old_stdout
        return jsonify({
            "error": traceback.format_exc()
        }), 400

import os

BASE_UPLOAD_FOLDER = "uploads"
os.makedirs(BASE_UPLOAD_FOLDER, exist_ok=True)

# @app.route('/file/upload', methods=['POST'])
# def upload_file():
#     file = request.files.get("file")

#     if not file:
#         return jsonify({"error": "No file uploaded"}), 400

#     file.save(os.path.join(UPLOAD_FOLDER, file.filename))

#     return jsonify({"message": "File uploaded successfully"}), 200
@app.route('/file/upload', methods=['POST'])
def upload_file():
    token = request.headers.get('Authorization')
    user_id = get_user_id_from_token(token)

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user_folder = os.path.join(BASE_UPLOAD_FOLDER, user_id)
    os.makedirs(user_folder, exist_ok=True)

    file = request.files.get("file")

    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    file_path = os.path.join(user_folder, file.filename)
    file.save(file_path)

    return jsonify({"message": "File uploaded successfully"}), 200
# ===============================
# FILE MANAGEMENT ROUTES
# ===============================

# @app.route('/file/list', methods=['GET'])
# def list_files():
#     try:
#         files = os.listdir(UPLOAD_FOLDER)
#         return jsonify({"files": files}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
@app.route('/file/list', methods=['GET'])
def list_files():
    token = request.headers.get('Authorization')
    user_id = get_user_id_from_token(token)

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user_folder = os.path.join(BASE_UPLOAD_FOLDER, user_id)

    if not os.path.exists(user_folder):
        return jsonify({"files": []}), 200

    files = os.listdir(user_folder)

    return jsonify({"files": files}), 200


@app.route('/file/delete', methods=['DELETE'])
def delete_file():
    try:
        data = request.get_json()
        filename = data.get("filename")

        if not filename:
            return jsonify({"error": "Filename required"}), 400

        # file_path = os.path.join(UPLOAD_FOLDER, filename)
        token = request.headers.get('Authorization')
        user_id = get_user_id_from_token(token)
        
        user_folder = os.path.join(BASE_UPLOAD_FOLDER, user_id)
        file_path = os.path.join(user_folder, filename)

        if not os.path.exists(file_path):
            return jsonify({"error": "File not found"}), 404

        os.remove(file_path)
        return jsonify({"message": "File deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/file/rename', methods=['POST'])
def rename_file():
    try:
        data = request.get_json()
        old_name = data.get("old_filename")
        new_name = data.get("new_filename")

        if not old_name or not new_name:
            return jsonify({"error": "Both filenames required"}), 400

        # old_path = os.path.join(UPLOAD_FOLDER, old_name)
        # new_path = os.path.join(UPLOAD_FOLDER, new_name)
        token = request.headers.get('Authorization')
        user_id = get_user_id_from_token(token)
        
        user_folder = os.path.join(BASE_UPLOAD_FOLDER, user_id)
        
        old_path = os.path.join(user_folder, old_name)
        new_path = os.path.join(user_folder, new_name)

        if not os.path.exists(old_path):
            return jsonify({"error": "File not found"}), 404

        os.rename(old_path, new_path)

        return jsonify({"message": "File renamed successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/')
def home():
    return 'Flask API is running!'

@app.route('/file/fetch', methods=['POST'])
def fetch_csv():
    try:
        request_data = request.get_json()
        channel_id = request_data.get('channel_id')
        token = request.headers.get('Authorization')

        if not channel_id:
            return jsonify({"error": "channel_id is required"}), 400

        # Node.js CSV export URL
        # csv_url = f"http://127.0.0.1:4001/api/csv/channels/{channel_id}/fields/csv"
        csv_url = f"http://server:4001/api/csv/channels/{channel_id}/fields/csv"

        # # Call Node backend
        # response = requests.get(csv_url, headers={'Authorization': token})

        # if response.status_code != 200:
        #     return jsonify({"error": "Failed to fetch CSV from Node backend"}), 400

        # filename = f"{channel_id}.csv"
        # filepath = os.path.join(UPLOAD_FOLDER, filename)

        # with open(filepath, "wb") as f:
        #     f.write(response.content)

        # return jsonify({
        #     "message": "CSV fetched and saved successfully",
        #     "filename": filename
        # }), 200
        response = requests.get(csv_url, headers={'Authorization': token})
        # if response.status_code != 200:
        #     return jsonify({"error": "Failed to fetch CSV from Node backend"}), 400
        if response.status_code != 200:
            return jsonify({
                "error": "Unable to fetch data from Node backend",
                "status": response.status_code
            }), 400
            # Check if Node returned JSON instead of CSV
        content_type = response.headers.get('Content-Type', '')
        if 'application/json' in content_type:
            node_response = response.json()
            # If channel has no entries
            if node_response.get("data") == []:
                return jsonify({
                    "message": "No data available in this channel"
                    }), 200
        filename = f"{channel_id}.csv"
        # filepath = os.path.join(UPLOAD_FOLDER, filename)
        token = request.headers.get('Authorization')
        user_id = get_user_id_from_token(token)
        
        user_folder = os.path.join(BASE_UPLOAD_FOLDER, user_id)
        os.makedirs(user_folder, exist_ok=True)
        
        filepath = os.path.join(user_folder, filename)

        with open(filepath, "wb") as f:
            f.write(response.content)
        return jsonify({
            "message": "CSV fetched and saved successfully",
            "filename": filename
            }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/analysis', methods=['POST'])
def analysis():
    try:
        request_data = request.get_json()
        channel_id = request_data.get('channel_id')
        field = request_data.get('field')
        analysis_type = request_data.get('analysis_type')
        num_entries = request_data.get('num_entries')
        token = request.headers.get('Authorization')

        # if not all([channel_id, field, analysis_type, num_entries]):
        #     return jsonify({'error': 'channel_id, field, analysis_type, and num_entries are required'}), 400
        if not all([channel_id, field, analysis_type]):
            return jsonify({'error': 'channel_id, field, and analysis_type are required'}), 400
        # print("TOKEN FROM REACT:", token)

        nodejs_response = requests.get(
            NODEJS_API_URL.format(channel_id=channel_id),
            headers={'Authorization': token}
        )
        # print("Node Status Code:", nodejs_response.status_code)
        # print("Node Response Body:", nodejs_response.text)

        if nodejs_response.status_code != 200:
            return jsonify({'error': 'Failed to fetch data from Node.js backend'}), 400

        # nodejs_data = nodejs_response.json()
        # data = clean_data(nodejs_data['entries'], field)
        nodejs_data = nodejs_response.json()
        if 'entries' not in nodejs_data:
            return jsonify({'error': 'Invalid response from Node backend', 'node_response': nodejs_data}), 400
        data = clean_data(nodejs_data['entries'], field)
        
        if num_entries is None or num_entries == "":
            num_entries = len(data)
        else:
            num_entries = int(num_entries)
            if num_entries <= 0:
                return jsonify({'error': 'Number of Entries must be more than 0'}), 400



        if len(data) < num_entries:
            return jsonify({'error': 'Requested {} entries, but only {} available'.format(num_entries, len(data))}), 400

        data = data.tail(num_entries)
        result = perform_analysis(data, analysis_type)

        return jsonify(result), 200

    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred: {}'.format(str(e))}), 400

@app.route('/prediction', methods=['POST'])
def prediction():
    try:
        request_data = request.get_json()
        channel_id = request_data.get('channel_id')
        field = request_data.get('field')
        prediction_hours = request_data.get('prediction_hours')
        test_csv = request_data.get('test_csv')
        token = request.headers.get('Authorization')

        if prediction_hours is None or prediction_hours == "":
            return jsonify({'error': 'Prediction Hours is a mandatory field'}), 400
        
        prediction_hours = int(prediction_hours)
        if prediction_hours <= 0:
            return jsonify({'error': 'Prediction Hours must be greater than 0'}), 400

        required_entries = prediction_hours * 12

        if test_csv:
            data = None
        else:
            nodejs_response = requests.get(
                NODEJS_API_URL.format(channel_id=channel_id),
                headers={'Authorization': token}
            )

            if nodejs_response.status_code != 200:
                return jsonify({'error': 'Failed to fetch data from Node.js backend'}), 400

            nodejs_data = nodejs_response.json()
            data = clean_data(nodejs_data['entries'], field)

            if len(data) < required_entries:
                return jsonify({'error': 'Not enough data for prediction. Required: {}, Available: {}'.format(required_entries, len(data))}), 400

        forecast, timestamps = perform_prediction_with_timestamps(data, prediction_hours)
        forecast_with_timestamps = [{"timestamp": ts, "value": val} for ts, val in zip(timestamps, forecast)]

        return jsonify({"forecast": forecast_with_timestamps}), 200

    except Exception as e:
        return jsonify({"error": 'An unexpected error occurred: {}'.format(str(e))}), 500

def clean_data(entries, field):
    field_data = []
    for entry in entries:
        if 'fieldData' in entry:
            for field_entry in entry['fieldData']:
                if field_entry.get('name') == field:
                    field_data.append({
                        'timestamp': entry.get('timestamp'),
                        'value': float(field_entry.get('value', 0))
                    })

    if not field_data:
        raise ValueError("No data found for the field: {}".format(field))

    df = pd.DataFrame(field_data)
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df.set_index('timestamp', inplace=True)
    df.fillna(method='ffill', inplace=True)
    return df

def perform_analysis(data, analysis_type):
    try:
        if analysis_type == 'average':
            return {"average": data['value'].mean()}
        elif analysis_type == 'median':
            return {"median": data['value'].median()}
        elif analysis_type == 'mode':
            try:
                mode_value = data['value'].mode().iloc[0]
                return {"mode": mode_value}
            except IndexError:
                raise ValueError("Mode cannot be computed due to insufficient data.")
        elif analysis_type == 'std_dev':
            return {"std_dev": data['value'].std()}
        elif analysis_type == 'variance':
            return {"variance": data['value'].var()}
        elif analysis_type == 'quartiles':
            quartiles = np.percentile(data['value'], [25, 50, 75])
            print(data)
            return {
                "Q1": quartiles[0],
                "Q2 (Median)": quartiles[1],
                "Q3": quartiles[2]
            }
        elif analysis_type == 'max':
            return {"max": data['value'].max()}
        elif analysis_type == 'min':
            return {"min": data['value'].min()}
        elif analysis_type == 'overview':
            return {
                "average": data['value'].mean(),
                "median": data['value'].median(),
                "mode": data['value'].mode().tolist() if not data['value'].mode().empty else None,
                "max": data['value'].max(),
                "min": data['value'].min()
            }
        

        else:
            raise ValueError("Invalid analysis type: {}".format(analysis_type))
    except Exception as e:
        raise ValueError("Error performing analysis: {}".format(str(e)))


def perform_prediction_with_timestamps(data, prediction_hours):
    try:
        if data is None or data.empty:
            raise ValueError("Insufficient data for prediction.")

        time_diffs = data.index.to_series().diff().dropna()
        # if not time_diffs.nunique() == 1:
        #     raise ValueError("Data is inconsistent. Time intervals must be evenly spaced.")

        model = ARIMA(data['value'], order=(2, 0, 1))
        model_fit = model.fit()

        forecast_steps = prediction_hours * 12
        if forecast_steps <= 0:
            raise ValueError("Invalid number of forecast steps.")
        
        forecast = model_fit.forecast(steps=forecast_steps)

        # first_timestamp = data.index[0]
        # last_timestamp = data.index[-1]
        # start_date = last_timestamp + pd.Timedelta(days=1)
        # start_time = first_timestamp.time()
        # start_datetime = pd.Timestamp.combine(start_date.date(), start_time).tz_localize('UTC')
        
        # frequency = time_diffs.iloc[0]
        # timestamps = pd.date_range(start=start_datetime, periods=forecast_steps, freq='5T')
        last_timestamp = data.index[-1]
        
        timestamps = pd.date_range(
            start=last_timestamp + pd.Timedelta(minutes=5),
            periods=forecast_steps,
            freq="5T"
        )

        ist = pytz.timezone('Asia/Kolkata')
        formatted_timestamps = [ts.tz_convert(ist).strftime('%A, %B %d, %Y, %I:%M:%S %p (IST)') for ts in timestamps]
        
        return forecast.round(2), formatted_timestamps
    except Exception as e:
        raise ValueError("Error during prediction: {}".format(str(e)))
    
# def perform_prediction_with_timestamps(data, prediction_hours):
#     try:
#         if data is None or data.empty:
#             raise ValueError("Insufficient data for prediction.")

#         model = ARIMA(data['value'], order=(2, 0, 1))
#         model_fit = model.fit()

#         forecast_steps = prediction_hours * 12
#         if forecast_steps <= 0:
#             raise ValueError("Invalid number of forecast steps.")
        
#         forecast = model_fit.forecast(steps=forecast_steps)

#         if len(data.index) < 2:
#             raise ValueError("Not enough timestamps to calculate frequency.")

#         last_timestamp = data.index[-1]
#         frequency = max((data.index[1] - data.index[0]).seconds // 60, 1) if len(data.index) > 1 else 5
#         timestamps = pd.date_range(start=last_timestamp, periods=forecast_steps + 1, freq="{}T".format(frequency))[1:]

#         # formatted_timestamps = [
#         #     "{}.{{:03d}}Z".format(ts.strftime('%Y-%m-%dT%H:%M:%S'), int(ts.microsecond / 1000))
#         #     for ts in timestamps
#         # ]
#         formatted_timestamps = [
#             ts.strftime('%A, %B %d, %Y, %I:%M:%S %p (UTC)') for ts in timestamps
#         ]
#         return forecast, formatted_timestamps
#     except Exception as e:
#         raise ValueError("Error during prediction: {}".format(str(e)))
def get_user_id_from_token(token):
    try:
        if token.startswith("Bearer "):
            token = token.split(" ")[1]

        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded.get("id") or decoded.get("_id") or decoded.get("userId")

    except Exception as e:
        print("Token decode error:", e)
        return None

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5001)
