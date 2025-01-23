import React, { useState } from 'react';
import { Box, Typography, ButtonGroup, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

// Sample historical data (replace with actual data)
const yearlyData = [
  { year: 2015, consumption: 1050, renewable: 150 },
  { year: 2016, consumption: 1150, renewable: 200 },
  { year: 2017, consumption: 1250, renewable: 280 },
  { year: 2018, consumption: 1320, renewable: 350 },
  { year: 2019, consumption: 1400, renewable: 420 },
  { year: 2020, consumption: 1280, renewable: 480 },
  { year: 2021, consumption: 1450, renewable: 550 },
  { year: 2022, consumption: 1580, renewable: 650 },
  { year: 2023, consumption: 1680, renewable: 750 },
  { year: 2024, consumption: 1750, renewable: 850 },
];

const monthlyData = Array.from({ length: 12 }, (_, i) => ({
  month: format(new Date(2024, i, 1), 'MMM'),
  consumption: 1500 + Math.random() * 300,
  renewable: 700 + Math.random() * 200,
}));

const HistoricalData = () => {
  const [timeframe, setTimeframe] = useState('yearly');
  const data = timeframe === 'yearly' ? yearlyData : monthlyData;

  return (
    <Box sx={{ width: '100%', height: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ color: '#FFB74D' }}>
          Historical Energy Consumption
        </Typography>
        <ButtonGroup 
          variant="outlined" 
          sx={{ 
            '& .MuiButton-root': {
              color: '#FFB74D',
              borderColor: 'rgba(255, 183, 77, 0.3)',
              '&.active': {
                backgroundColor: 'rgba(255, 183, 77, 0.1)',
              },
              '&:hover': {
                borderColor: '#FFB74D',
                backgroundColor: 'rgba(255, 183, 77, 0.1)',
              },
            },
          }}
        >
          <Button 
            onClick={() => setTimeframe('yearly')}
            className={timeframe === 'yearly' ? 'active' : ''}
          >
            Yearly
          </Button>
          <Button 
            onClick={() => setTimeframe('monthly')}
            className={timeframe === 'monthly' ? 'active' : ''}
          >
            Monthly
          </Button>
        </ButtonGroup>
      </Box>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis 
            dataKey={timeframe === 'yearly' ? 'year' : 'month'} 
            stroke="#FFB74D"
          />
          <YAxis 
            stroke="#FFB74D"
            label={{ 
              value: 'TWh', 
              angle: -90, 
              position: 'insideLeft',
              style: { fill: '#FFB74D' }
            }} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(26, 26, 26, 0.95)',
              border: '1px solid rgba(255, 183, 77, 0.3)',
              borderRadius: '4px',
              color: '#FFB74D'
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="consumption"
            name="Total Consumption"
            stroke="#FFB74D"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="renewable"
            name="Renewable Energy"
            stroke="#4CAF50"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Total Consumption (2024)
          </Typography>
          <Typography variant="h6" color="#FFB74D">
            1,750 TWh
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Renewable Share (2024)
          </Typography>
          <Typography variant="h6" color="#4CAF50">
            48.6%
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Growth Rate (YoY)
          </Typography>
          <Typography variant="h6" color="#FFB74D">
            +4.2%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HistoricalData;
