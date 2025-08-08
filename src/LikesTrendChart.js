import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const LikesTrendChart = ({ videos }) => {
  const data = videos.map((video, index) => ({
    name: `#${index + 1}`,
    likes: parseInt(video.statistics.likeCount || 0, 10),
  }));

  return (
    <div
      style={{
        marginTop: '40px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      }}
    >
      <h3 style={{ color: '#FF0000', marginBottom: '16px' }}>📈 Likes Trend (Latest Videos)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" />
          <XAxis dataKey="name" stroke="#000" />
          <YAxis stroke="#000" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="likes"
            stroke="#FF0000"
            strokeWidth={3}
            dot={{ r: 5, fill: '#FF0000' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LikesTrendChart;
