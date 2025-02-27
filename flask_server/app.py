import requests
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample Node.js API URL
NODEJS_API_URL = 'http://cloud.xtranssolutions.com/node/api/channels/{channel_id}/entries/read'

@app.route('/')
def home():
    return 'Flask API is running!'

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
        

        nodejs_response = requests.get(
            NODEJS_API_URL.format(channel_id=channel_id),
            headers={'Authorization': token}
        )

        if nodejs_response.status_code != 200:
            return jsonify({'error': 'Failed to fetch data from Node.js backend'}), 400

        nodejs_data = nodejs_response.json()
        data = clean_data(nodejs_data['entries'], field)
        
        
        if num_entries is None:
            num_entries = len(data)
        else:
            num_entries = int(num_entries)
            if num_entries == 0:
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

        model = ARIMA(data['value'], order=(2, 0, 1))
        model_fit = model.fit()

        forecast_steps = prediction_hours * 12
        if forecast_steps <= 0:
            raise ValueError("Invalid number of forecast steps.")
        
        forecast = model_fit.forecast(steps=forecast_steps)

        if len(data.index) < 2:
            raise ValueError("Not enough timestamps to calculate frequency.")

        last_timestamp = data.index[-1]
        frequency = max((data.index[1] - data.index[0]).seconds // 60, 1) if len(data.index) > 1 else 5
        timestamps = pd.date_range(start=last_timestamp, periods=forecast_steps + 1, freq="{}T".format(frequency))[1:]

        # formatted_timestamps = [
        #     "{}.{{:03d}}Z".format(ts.strftime('%Y-%m-%dT%H:%M:%S'), int(ts.microsecond / 1000))
        #     for ts in timestamps
        # ]
        formatted_timestamps = [
            ts.strftime('%A, %B %d, %Y, %I:%M:%S %p (UTC)') for ts in timestamps
        ]
        return forecast, formatted_timestamps
    except Exception as e:
        raise ValueError("Error during prediction: {}".format(str(e)))
    
if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5001)