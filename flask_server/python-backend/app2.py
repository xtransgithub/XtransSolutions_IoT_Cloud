import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample Node.js API URL
NODEJS_API_URL = 'http://localhost:8000/api/channels/{channel_id}/entries/read'

@app.route('/')
def home():
    return 'Flask API is running!'

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get request data (field, forecast_period, channel_id) and the token from headers
        request_data = request.get_json()
        field = request_data.get('field')
        forecast_period = int(request_data.get('forecast_period', 1))  # Default to 1 if not specified
        channel_id = request_data.get('channel_id')  # Channel ID
        token = request.headers.get('Authorization')

        # Print the data received from the frontend
        print(f"Received data: {request_data}")
        print(f"Received field: {field}")
        print(f"Received forecast_period: {forecast_period}")
        print(f"Received channel_id: {channel_id}")
        print(f"Received Authorization token: {token}")

        # Step 2: Send request to Node.js backend for the required data using the channel_id
        nodejs_response = requests.get(
            f'{NODEJS_API_URL.format(channel_id=channel_id)}',
            headers={'Authorization': token}
        )

        if nodejs_response.status_code != 200:
            return jsonify({'error': 'Failed to fetch data from Node.js backend'}), 400

        # Parse the JSON data
        nodejs_data = nodejs_response.json()

        # Step 3: Clean the data and extract the required field
        data = clean_data(nodejs_data['entries'], field)

        # Step 4: Predict the future values using the cleaned data
        forecast = predict_field(data, forecast_period)

        # Step 5: Send the forecasted data back to the frontend
        return jsonify({"forecast": forecast.tolist()}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# def clean_data(entries, field):
#     """
#     Clean the data and extract the required field.
#     Args:
#         entries (list): List of entries from Node.js
#         field (str): The field (e.g., "temp", "humidity") for which prediction is requested.
#     Returns:
#         pd.DataFrame: Cleaned data containing only the relevant field.
#     """
#     import pandas as pd

#     field_data = []
#     print("Raw entries received:", entries)  # Debugging: Print raw entries

#     if not entries:
#         raise ValueError("No entries received from the Node.js backend.")

#     for entry in entries:
#         if 'fieldData' not in entry:
#             continue  # Skip if there's no 'fieldData' in the entry
        
#         for field_entry in entry['fieldData']:
#             if field_entry.get('name') == field:
#                 field_data.append({
#                     'timestamp': entry.get('timestamp'),  # Get timestamp
#                     'value': float(field_entry.get('value', 0))  # Get field value and ensure it's a float
#                 })

#     print("Extracted field_data:", field_data)  # Debugging: Print extracted field data

#     if not field_data:
#         raise ValueError(f"No data found for the field: {field}")

#     # Convert to DataFrame for easier handling
#     df = pd.DataFrame(field_data)
#     print("DataFrame before processing:\n", df)  # Debugging: Print DataFrame before processing

#     df['timestamp'] = pd.to_datetime(df['timestamp'])
#     print("DataFrame after timestamp conversion:\n", df)  # Debugging: Print after timestamp conversion

#     df.set_index('timestamp', inplace=True)
#     print("DataFrame after setting timestamp as index:\n", df)  # Debugging: Print after setting index

#     # Handle missing values by forward filling
#     df.ffill(inplace=True)
#     print("DataFrame after forward filling:\n", df)  # Debugging: Print after forward fill

#     # Ensure the index has a frequency (e.g., daily or hourly)
#     if not df.index.inferred_freq:
#         try:
#             df = df.asfreq(pd.infer_freq(df.index))
#         except Exception as e:
#             print("Error inferring frequency:", e)  # Debugging: Print frequency inference error
#             raise ValueError("Need at least 3 dates to infer frequency")

#     print("DataFrame after frequency adjustment:\n", df)  # Debugging: Print after frequency adjustment

#     return df

# def clean_data(entries, field):
#     """
#     Clean the data and extract the required field with robust frequency handling.
#     """
#     import pandas as pd
#     import numpy as np

#     field_data = []
#     print("Raw entries received:", entries)

#     if not entries:
#         raise ValueError("No entries received from the Node.js backend.")

#     for entry in entries:
#         if 'fieldData' not in entry:
#             continue
        
#         for field_entry in entry['fieldData']:
#             if field_entry.get('name') == field:
#                 field_data.append({
#                     'timestamp': entry.get('timestamp'),
#                     'value': float(field_entry.get('value', 0))
#                 })

#     print("Extracted field_data:", field_data)

#     if not field_data:
#         raise ValueError(f"No data found for the field: {field}")

#     # Convert to DataFrame
#     df = pd.DataFrame(field_data)
#     print("DataFrame before processing:\n", df)

#     # Parse timestamps and set as index
#     df['timestamp'] = pd.to_datetime(df['timestamp'])
#     df.set_index('timestamp', inplace=True)

#     print("DataFrame after setting timestamp:\n", df)

#     # Calculate approximate frequency (time difference median)
#     time_deltas = np.diff(df.index.values).astype('timedelta64[s]')
#     if len(time_deltas) == 0:
#         raise ValueError("Not enough data points to calculate frequency.")

#     median_delta = np.median(time_deltas).astype('timedelta64[s]')
#     print("Calculated median delta (frequency):", median_delta)

#     # Resample the data to this frequency
#     freq = f'{median_delta.item()}S'  # Convert to string format like '10S'
#     df = df.resample(freq).mean()

#     print("DataFrame after resampling:\n", df)

#     # Fill missing values
#     df.ffill(inplace=True)
#     df.bfill(inplace=True)

#     print("DataFrame after filling missing values:\n", df)
#     return df

def clean_data(entries, field):
    """
    Clean the data and extract the required field with robust frequency handling.
    """
    import pandas as pd
    import numpy as np

    field_data = []
    print("Raw entries received:", entries)

    if not entries:
        raise ValueError("No entries received from the Node.js backend.")

    for entry in entries:
        if 'fieldData' not in entry:
            continue
        
        for field_entry in entry['fieldData']:
            if field_entry.get('name') == field:
                field_data.append({
                    'timestamp': entry.get('timestamp'),
                    'value': float(field_entry.get('value', 0))
                })

    print("Extracted field_data:", field_data)

    if not field_data:
        raise ValueError(f"No data found for the field: {field}")

    # Convert to DataFrame
    df = pd.DataFrame(field_data)
    print("DataFrame before processing:\n", df)

    # Parse timestamps and set as index
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df.set_index('timestamp', inplace=True)

    print("DataFrame after setting timestamp:\n", df)

    # Calculate approximate frequency (time difference median)
    time_deltas = np.diff(df.index.values).astype('timedelta64[s]')
    if len(time_deltas) == 0:
        raise ValueError("Not enough data points to calculate frequency.")

    median_delta_seconds = int(np.median(time_deltas).item())  # Convert to integer seconds
    print("Calculated median delta in seconds:", median_delta_seconds)

    # Resample the data to this frequency
    freq = f'{median_delta_seconds}S'  # Use valid format like '10S'
    df = df.resample(freq).mean()

    print("DataFrame after resampling:\n", df)

    # Fill missing values
    df.ffill(inplace=True)
    df.bfill(inplace=True)

    print("DataFrame after filling missing values:\n", df)
    return df


def predict_field(data, forecast_period):
    """
    Use ARIMA to predict future values for the given field.
    """
    from statsmodels.tsa.arima.model import ARIMA

    # Ensure data sufficiency for ARIMA
    if len(data) < 10:
        raise ValueError("Insufficient data for ARIMA modeling (minimum 10 observations required).")

    # Fit ARIMA model
    model = ARIMA(data['value'], order=(5, 1, 0))  # Adjust order as needed
    model_fit = model.fit()

    forecast = model_fit.forecast(steps=forecast_period)
    return forecast


# def predict_field(data, forecast_period):
#     """
#     Use ARIMA to predict the future values for the given field.
#     Args:
#         data (pd.DataFrame): Cleaned data
#         forecast_period (int): Number of periods to predict
#     Returns:
#         np.array: Predicted future values
#     """
#     from statsmodels.tsa.arima.model import ARIMA

#     model = ARIMA(data['value'], order=(5, 1, 0))  # You can modify ARIMA order as per requirements
#     model_fit = model.fit()

#     forecast = model_fit.forecast(steps=forecast_period)
#     return forecast


if __name__ == '__main__':
    app.run(debug=True, port=5000)
