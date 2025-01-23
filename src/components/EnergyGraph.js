import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';

const data = [
  { time: '00:00', consumption: 4000 },
  { time: '04:00', consumption: 3000 },
  { time: '08:00', consumption: 5000 },
  { time: '12:00', consumption: 7000 },
  { time: '16:00', consumption: 6000 },
  { time: '20:00', consumption: 4500 },
  { time: '23:59', consumption: 3500 },
];

function EnergyGraph() {
  return (
    <Box sx={{ 
      width: '100%', 
      height: '20px',
      position: 'relative',
      zIndex: 3,
      pointerEvents: 'none' // Disable pointer events on the container
    }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 1,
            right: 10,
            left: 15,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 10 }} 
            height={20}
          />
          <YAxis 
            tick={{ fontSize: 10 }}
            width={30}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(26, 26, 26, 0.95)',
              border: '1px solid rgba(255, 183, 77, 0.2)',
              borderRadius: '4px',
              fontSize: '10px',
              padding: '4px',
              zIndex: 5
            }}
            wrapperStyle={{
              zIndex: 5,
              position: 'relative',
              pointerEvents: 'auto' // Re-enable pointer events for tooltip
            }}
          />
          <Line
            type="monotone"
            dataKey="consumption"
            stroke="#2196f3"
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default EnergyGraph;
