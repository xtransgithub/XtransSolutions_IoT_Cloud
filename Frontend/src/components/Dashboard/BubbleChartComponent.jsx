import React from 'react';
import { Bubble } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const BubbleChartComponent = ({ historicalData, fields }) => {
  const data = {
    datasets: fields.map((field, index) => ({
      label: field,
      data: historicalData[field]?.map((entry, i) => ({
        x: i + 1, 
        y: entry.value, 
        r: Math.abs(entry.value) / 10, 
      })),
      backgroundColor: `hsla(${(index * 360) / fields.length}, 70%, 50%, 0.6)`,
      borderColor: `hsl(${(index * 360) / fields.length}, 70%, 50%)`,
    })),
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
        text: 'Bubble Chart - Field Data',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Entry Index',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Field Value',
        },
      },
    },
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Bubble data={data} options={options} />
    </div>
  );
};

export default BubbleChartComponent;