const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Node.js will run on port 3000

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define the POST /predict endpoint to interact with the Python Flask server
app.post('/predict', async (req, res) => {
  const { forecastPeriod, predictionType } = req.body;

  try {
    // Send the request to the Python Flask backend
    const response = await axios.post('http://localhost:5000/predict', {
      forecast_period: forecastPeriod,
      prediction_type: predictionType,
    });

    // Return the forecast data received from Python backend
    res.json(response.data); // Return the data from Flask directly to frontend
  } catch (error) {
    console.error('Error fetching prediction:', error);
    res.status(500).send('Error fetching prediction from Python backend.');
  }
});

// Start the Node.js server on port 3000
app.listen(PORT, () => {
  console.log(`Node.js server is running at http://localhost:${PORT}`);
});
