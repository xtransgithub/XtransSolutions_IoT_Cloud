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

const CombinedLineChart = ({ historicalData, fields }) => {
    const datasets = fields.map((field, index) => ({
        label: field,
        data: historicalData[field]?.map(entry => entry.value) || [],
        borderColor: `hsl(${(index * 360) / fields.length}, 70%, 50%)`, 
        backgroundColor: `hsla(${(index * 360) / fields.length}, 70%, 50%, 0.2)`,
        borderWidth: 2,
        fill: false,
      }));
    
      const data = {
        labels: historicalData[fields[0]]?.map(entry => {
          const date = new Date(entry.timestamp);
          return date.toLocaleTimeString([], { day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' });
        }) || [],
        datasets,
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
        text: 'Fields Data overview',
      },
    },
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default CombinedLineChart;