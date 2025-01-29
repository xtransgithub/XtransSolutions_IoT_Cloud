import requests
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample Node.js API URL
NODEJS_API_URL = 'http://http://162.255.85.191/:8000/api/channels/{channel_id}/entries/read'

@app.route('/')
def home():
    return 'Flask API is running!'


@app.route('/analysis', methods=['POST'])
def analysis():
    try:
        # Get request data
        request_data = request.get_json()
        channel_id = request_data.get('channel_id')
        field = request_data.get('field')
        analysis_type = request_data.get('analysis_type')
        num_entries = request_data.get('num_entries')  # User must provide this
        token = request.headers.get('Authorization')

        if not all([channel_id, field, analysis_type, num_entries]):
            return jsonify({'error': 'channel_id, field, analysis_type, and num_entries are required'}), 400

        num_entries = int(num_entries)

        # Fetch data from Node.js backend
        nodejs_response = requests.get(
            NODEJS_API_URL.format(channel_id=channel_id),
            headers={'Authorization': token}
        )

        if nodejs_response.status_code != 200:
            return jsonify({'error': 'Failed to fetch data from Node.js backend'}), 400

        # Parse the JSON response
        nodejs_data = nodejs_response.json()
        data = clean_data(nodejs_data['entries'], field)

        if len(data) < num_entries:
            return jsonify({'error': f'Requested {num_entries} entries, but only {len(data)} available'}), 400

        # Take the last 'num_entries' rows
        data = data.tail(num_entries)

        # Perform the requested analysis
        result = perform_analysis(data, analysis_type)

        return jsonify(result), 200

    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500



@app.route('/prediction', methods=['POST'])
def prediction():
    try:
        # Get request data
        request_data = request.get_json()
        channel_id = request_data.get('channel_id')
        field = request_data.get('field')
        prediction_hours = int(request_data.get('prediction_hours', 1))  # Default to 1 hour
        test_csv = request_data.get('test_csv')  # Relative path to the CSV file for testing (optional)
        token = request.headers.get('Authorization')

        # Calculate required data points
        required_entries = prediction_hours * 12  # 12 entries per hour

        if test_csv:
            # Use the new cleaning function for the test CSV
            data = clean_temperature_data(test_csv, required_entries)
        else:
            # Fetch data from Node.js backend
            nodejs_response = requests.get(
                NODEJS_API_URL.format(channel_id=channel_id),
                headers={'Authorization': token}
            )

            if nodejs_response.status_code != 200:
                return jsonify({'error': 'Failed to fetch data from Node.js backend'}), 400

            # Parse the JSON response
            nodejs_data = nodejs_response.json()
            data = clean_data(nodejs_data['entries'], field)

            if len(data) < required_entries:
                return jsonify({
                    "error": f"Not enough data for prediction. Required: {required_entries}, Available: {len(data)}"
                }), 400

        # Perform prediction
        forecast, timestamps = perform_prediction_with_timestamps(data, prediction_hours)

        # Combine timestamps and forecasted values into a result
        forecast_with_timestamps = [{"timestamp": ts, "value": val} for ts, val in zip(timestamps, forecast)]

        return jsonify({"forecast": forecast_with_timestamps}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def clean_data(entries, field):
    """
    Clean the data and extract the required field.
    """
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
        raise ValueError(f"No data found for the field: {field}")

    df = pd.DataFrame(field_data)
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df.set_index('timestamp', inplace=True)
    df.fillna(method='ffill', inplace=True)
    return df

def clean_temperature_data(csv_path, required_entries):
    """
    Clean the temperature data from a CSV file.
    Args:
        csv_path (str): Path to the CSV file.
        required_entries (int): Number of required entries.
    Returns:
        pd.DataFrame: Cleaned DataFrame ready for prediction.
    """
    try:
        # Load data
        try:
            df = pd.read_csv('temperature_data.csv', encoding='utf-8')
        except UnicodeDecodeError:
            df = pd.read_csv('temperature_data.csv', encoding='latin1')

        # Convert 'Timestamp' to datetime
        df['Timestamp'] = pd.to_datetime(df['Timestamp'], errors='coerce')

        # Drop rows with invalid timestamps
        df.dropna(subset=['Timestamp'], inplace=True)

        # Set 'Timestamp' as the index
        df.set_index('Timestamp', inplace=True)

        # Ensure 'Temperature (°C)' is numeric
        df['Temperature (°C)'] = pd.to_numeric(df['Temperature (°C)'], errors='coerce')

        # Drop rows with invalid temperature values
        df.dropna(subset=['Temperature (°C)'], inplace=True)

        # Rename the column to 'value' for compatibility
        df.rename(columns={'Temperature (°C)': 'value'}, inplace=True)

        # Check if enough data is available
        if len(df) < required_entries:
            raise ValueError(
                f"Not enough data for prediction. Required: {required_entries}, Available: {len(df)}"
            )

        # Return the last 'required_entries' data points
        return df.iloc[-required_entries:]

    except Exception as e:
        raise ValueError(f"Error cleaning temperature data: {str(e)}")


def perform_analysis(data, analysis_type):
    """
    Perform the requested analysis on the data.
    """
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
        elif analysis_type == 'quartiles':
            quartiles = np.percentile(data['value'], [25, 50, 75])
            print(data)
            return {
                "Q1": quartiles[0],
                "Q2 (Median)": quartiles[1],
                "Q3": quartiles[2]
            }
        elif analysis_type == 'std_dev':
            return {"std_dev": data['value'].std()}
        elif analysis_type == 'variance':
            return {"variance": data['value'].var()}
        elif analysis_type == 'max':
            return {"max": data['value'].max()}
        elif analysis_type == 'min':
            return {"min": data['value'].min()}
        elif analysis_type == 'overview':
            return {
                "mean": data['value'].mean(),
                "median": data['value'].median(),
                "mode": data['value'].mode().tolist() if not data['value'].mode().empty else None,
                "max": data['value'].max(),
                "min": data['value'].min()
            }
        else:
            raise ValueError(f"Invalid analysis type: {analysis_type}")
    except Exception as e:
        raise ValueError(f"Error performing analysis: {str(e)}")


def perform_prediction(data, prediction_hours):
    """
    Use ARIMA to predict the next 'prediction_hours' based on the data.
    """
    try:
        # Fit ARIMA Model
        model = ARIMA(data['value'], order=(2, 0, 1))
        model_fit = model.fit()

        # Forecast future values
        forecast = model_fit.forecast(steps=prediction_hours * 12)  # 12 data points per hour
        return forecast
    except Exception as e:
        raise ValueError(f"Error during prediction: {str(e)}")


def perform_prediction_with_timestamps(data, prediction_hours):
    """
    Use ARIMA to predict the next 'prediction_hours' based on the data and include timestamps with correct format.
    """
    try:
        # Fit ARIMA Model
        model = ARIMA(data['value'], order=(2, 0, 1))
        model_fit = model.fit()

        # Forecast future values
        forecast_steps = prediction_hours * 12  # 12 data points per hour
        forecast = model_fit.forecast(steps=forecast_steps)

        # Generate future timestamps based on the last available timestamp
        last_timestamp = data.index[-1]  # Get the last timestamp in the dataset
        frequency = (data.index[1] - data.index[0]).seconds // 60  # Frequency in minutes

        # Create future timestamps
        timestamps = pd.date_range(
            start=last_timestamp,
            periods=forecast_steps + 1,  # +1 to include the starting timestamp
            freq=f"{frequency}T"  # Frequency in minutes
        )[1:]  # Exclude the starting timestamp

        # Format timestamps in ISO 8601 with 3 decimal points for milliseconds and 'Z' for UTC
        formatted_timestamps = [
            f"{ts.strftime('%Y-%m-%dT%H:%M:%S')}.{int(ts.microsecond / 1000):03d}Z"
            for ts in timestamps
        ]

        return forecast, formatted_timestamps
    except Exception as e:
        raise ValueError(f"Error during prediction: {str(e)}")


if __name__ == '__main__':
    app.run(debug=True, port=5000)
