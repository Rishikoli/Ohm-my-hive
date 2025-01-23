import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCarbonContext } from '../../context/CarbonContext';

const HistoricalChart = () => {
  const { historicalData } = useCarbonContext();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('default', { month: 'short', year: '2-digit' });
  };

  return (
    <Paper
      sx={{
        p: 3,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
        border: '1px solid rgba(255, 183, 77, 0.2)',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(255, 183, 77, 0.2)',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: '#FFB74D' }}>
        Historical Emissions
      </Typography>
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={historicalData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 183, 77, 0.2)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="#FFB74D"
              tick={{ fill: '#FFB74D' }}
            />
            <YAxis 
              stroke="#FFB74D"
              tick={{ fill: '#FFB74D' }}
              label={{ 
                value: 'CO₂ Emissions (kg)', 
                angle: -90, 
                position: 'insideLeft',
                fill: '#FFB74D'
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 26, 26, 0.95)',
                border: '1px solid rgba(255, 183, 77, 0.4)',
                color: '#FFB74D'
              }}
              labelFormatter={formatDate}
            />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#FFB74D" 
              strokeWidth={2}
              dot={{ fill: '#FFB74D', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default HistoricalChart;
