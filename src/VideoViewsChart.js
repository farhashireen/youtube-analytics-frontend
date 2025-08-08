import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function VideoViewsChart({ videos }) {
  const titles = videos.map(video => video.snippet.title.slice(0, 20) + '...');
  const views = videos.map(video => parseInt(video.statistics.viewCount));

  const data = {
    labels: titles,
    datasets: [
      {
        label: 'Views',
        data: views,
        backgroundColor: '#FF0000',
        borderColor: '#FF0000',
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        ticks: { color: '#000' },
        grid: { color: '#eee' },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1000000,
          color: '#000'
        },
        grid: { color: '#eee' },
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
        maxWidth: '800px',
        margin: '40px auto'
      }}
    >
      <h3 style={{ color: '#FF0000', marginBottom: '16px' }}>📊 Views per Video</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default VideoViewsChart;
