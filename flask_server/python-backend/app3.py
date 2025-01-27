import requests
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from sklearn.linear_model import LinearRegression
from scipy.stats import zscore

app = Flask(__name__)

# Sample Node.js API URL
NODEJS_API_URL = 'http://localhost:8000/api/channels/{channel_id}/entries/read'

@app.route('/')
def home():
    return 'Flask API is running!'

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        # Get request data
        request_data = request.get_json()
        field = request_data.get('field')
        analysis_type = request_data.get('analysis_type')
        channel_id = request_data.get('channel_id')
        token = request.headers.get('Authorization')

        # Fetch data from the Node.js backend
        nodejs_response = requests.get(
            NODEJS_API_URL.format(channel_id=channel_id),
            headers={'Authorization': token}
        )

        if nodejs_response.status_code != 200:
            return jsonify({'error': 'Failed to fetch data from Node.js backend'}), 400

        # Parse the data
        nodejs_data = nodejs_response.json()
        data = clean_data(nodejs_data['entries'], field)

        # Perform the requested analysis
        if analysis_type == "Calculate Average":
            result = calculate_average(data)
        elif analysis_type == "Remove Outliers":
            result = remove_outliers(data)
        elif analysis_type == "Convert Temperature Units":
            result = convert_temperature_units(data)
        elif analysis_type == "Calculate High and Low":
            result = calculate_high_low(data)
        elif analysis_type == "Time Series Prediction":
            result = time_series_prediction(data)
        elif analysis_type == "Standard Deviation and Variance":
            result = calculate_std_variance(data)
        elif analysis_type == "Trend Detection":
            result = detect_trend(data)
        elif analysis_type == "Data Summarization":
            result = summarize_data(data)
        elif analysis_type == "Anomaly Detection":
            result = detect_anomalies(data)
        else:
            return jsonify({"error": "Invalid analysis type"}), 400

        # Return the result
        return jsonify({"result": result}), 200

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

def calculate_average(data):
    """Calculate the average of the field values."""
    print(data)
    return {"average": data['value'].mean()}

def remove_outliers(data, threshold=3):
    """Remove outliers based on Z-score."""
    z_scores = zscore(data['value'])
    filtered_data = data[np.abs(z_scores) <= threshold]
    return filtered_data.to_dict()

def convert_temperature_units(data):
    """Convert temperature from Celsius to Fahrenheit."""
    data['value'] = data['value'] * 9/5 + 32
    return data.to_dict()

def calculate_high_low(data):
    """Calculate the highest and lowest values."""
    return {"high": data['value'].max(), "low": data['value'].min()}

def time_series_prediction(data, steps=5):
    """Predict future values using ARIMA."""
    from statsmodels.tsa.arima.model import ARIMA
    model = ARIMA(data['value'], order=(5, 1, 0))
    model_fit = model.fit()
    forecast = model_fit.forecast(steps=steps)
    return forecast.tolist()

def calculate_std_variance(data):
    """Calculate standard deviation and variance."""
    return {
        "standard_deviation": data['value'].std(),
        "variance": data['value'].var()
    }

def detect_trend(data):
    """Detect trends using linear regression."""
    X = np.arange(len(data)).reshape(-1, 1)
    y = data['value'].values.reshape(-1, 1)
    model = LinearRegression()
    model.fit(X, y)
    slope = model.coef_[0][0]
    trend = "increasing" if slope > 0 else "decreasing" if slope < 0 else "stable"
    return {"trend": trend, "slope": slope}

def summarize_data(data):
    """Summarize the data with key statistics."""
    return {
        "count": data['value'].count(),
        "mean": data['value'].mean(),
        "median": data['value'].median(),
        "min": data['value'].min(),
        "max": data['value'].max(),
        "25th_percentile": data['value'].quantile(0.25),
        "50th_percentile": data['value'].quantile(0.5),
        "75th_percentile": data['value'].quantile(0.75)
    }

def detect_anomalies(data, threshold=3):
    """Detect anomalies using Z-score."""
    z_scores = zscore(data['value'])
    anomalies = np.where(np.abs(z_scores) > threshold)[0]
    return {"anomalies": anomalies.tolist()}

if __name__ == '__main__':
    app.run(debug=True, port=5000)
