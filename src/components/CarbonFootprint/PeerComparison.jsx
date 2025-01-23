import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCarbonContext } from '../../context/CarbonContext';

const PeerComparison = ({ currentFootprint }) => {
  const { averages } = useCarbonContext();

  const data = [
    { name: 'Your Footprint', value: currentFootprint },
    { name: 'Regional Average', value: averages.regional },
    { name: 'National Average', value: averages.national },
    { name: 'Global Average', value: averages.global },
  ];

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
        Peer Comparison
      </Typography>
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 183, 77, 0.2)" />
            <XAxis 
              dataKey="name" 
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
            />
            <Bar 
              dataKey="value" 
              fill="rgba(255, 183, 77, 0.6)"
              stroke="#FFB74D"
              strokeWidth={1}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default PeerComparison;
