import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';

const LoadManagement = ({ data }) => {
  if (!data) {
    return <Typography sx={{ color: '#FFD180' }}>Select a state to view load management data</Typography>;
  }

  // Generate hourly load data based on state's energy consumption
  const loadData = Array.from({ length: 24 }, (_, hour) => ({
    hour: `${hour}:00`,
    load: data.energyConsumption * (0.7 + Math.sin(hour / 24 * Math.PI) * 0.3)
  }));

  return (
    <div style={{ height: '100%', minHeight: '300px' }}>
      <Typography variant="h6" sx={{ color: '#FFD180', mb: 2 }}>
        Load Distribution (24h)
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={loadData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 183, 77, 0.2)" />
          <XAxis 
            dataKey="hour" 
            stroke="#FFD180"
            tick={{ fill: '#FFD180' }}
          />
          <YAxis 
            stroke="#FFD180"
            tick={{ fill: '#FFD180' }}
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(26, 26, 26, 0.95)',
              border: '1px solid rgba(255, 183, 77, 0.4)',
              color: '#FFD180'
            }}
            formatter={(value) => [`${(value / 1000).toFixed(1)}k MW`, 'Load']}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="load" 
            stroke="#FFA500" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LoadManagement;
