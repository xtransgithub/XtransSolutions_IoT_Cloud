import React from 'react';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartComponent = ({ data, timeLabels }) => {
  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Data History',
        data: data.series1,
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true, 
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },

  };
  
  return (
    <div style={{ width: '100%', height: '200px' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChartComponent;
