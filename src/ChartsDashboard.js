import React from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from 'recharts';
import dayjs from 'dayjs';

const ChartsDashboard = ({ videos }) => {
  const videoStats = videos.map(video => {
    const views = parseInt(video.statistics.viewCount || 0);
    const likes = parseInt(video.statistics.likeCount || 0);
    const comments = parseInt(video.statistics.commentCount || 0);
    const title = video.snippet.title;
    const publishedAt = video.snippet.publishedAt;

    return {
      title,
      shortTitle: title.length > 40 ? title.slice(0, 40) + '…' : title,
      views,
      likes,
      comments,
      engagementRate: +(((likes + comments) / (views || 1)) * 100).toFixed(2),
      date: dayjs(publishedAt).format('YYYY-MM-DD'),
      publishedAt,
      thumbnail: video.snippet.thumbnails.medium.url
    };
  });

  const topEngagement = [...videoStats]
    .sort((a, b) => b.engagementRate - a.engagementRate)
    .slice(0, 10);

  const viewsOverTime = [...videoStats]
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const latestVideos = [...videoStats]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 6);

  const cardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '40px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
  };

  const headingStyle = {
    color: '#FF0000',
    marginBottom: '12px'
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h3 style={{ color: '#FF0000', marginBottom: '30px' }}>📊 Channel Analytics</h3>

      {/* 🏆 Top 10 Videos by Engagement Rate */}
      <div style={cardStyle}>
        <h4 style={headingStyle}>🏆 Top 10 Videos by Engagement Rate</h4>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            layout="vertical"
            data={topEngagement}
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" stroke="#000" />
            <YAxis type="category" dataKey="shortTitle" stroke="#000" width={250} />
            <Tooltip />
            <Bar dataKey="engagementRate" fill="#FF0000" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📈 Views Trend Over Time */}
      <div style={cardStyle}>
        <h4 style={headingStyle}>📈 Views Trend Over Time</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={viewsOverTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#000" />
            <YAxis
              stroke="#000"
              tickFormatter={(value) => `${(value / 1_000_000).toFixed(1)}M`}
              domain={[0, 'dataMax + 10000000']}
            />
            <Tooltip
              formatter={(value) => `${(value / 1_000_000).toFixed(2)}M views`}
            />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#FF0000"
              strokeWidth={2}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 📹 Latest Videos */}
      <div style={cardStyle}>
        <h4 style={headingStyle}>📹 Latest Videos</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {latestVideos.map((video, idx) => (
            <div key={idx} style={{ ...cardStyle, width: '300px' }}>
              <img
                src={video.thumbnail}
                alt={video.title}
                style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
              />
              <h5>{video.title.length > 50 ? video.title.slice(0, 50) + '…' : video.title}</h5>
              <p>Views: {(video.views / 1_000_000).toFixed(2)}M</p>
              <p>Likes: {video.likes.toLocaleString()}</p>
              <p>Published: {new Date(video.publishedAt).toDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartsDashboard;
