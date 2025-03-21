import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FieldEntryBarChart = ({ fieldCounts, fields }) => {
  const data = {
    labels: fields,
    datasets: [
      {
        label: 'Number of Entries',
        data: fields.map(field => fieldCounts[field] || 0),
        backgroundColor: fields.map((_, index) => `hsl(${(index * 360) / fields.length}, 70%, 50%)`),
        borderColor: fields.map((_, index) => `hsl(${(index * 360) / fields.length}, 70%, 30%)`),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Field Entries',
      },
    },
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default FieldEntryBarChart;