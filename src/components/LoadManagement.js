import React from 'react';
import { Box, LinearProgress, Typography, Grid } from '@mui/material';

const loads = [
  { name: 'HVAC System', usage: 75 },
  { name: 'Lighting', usage: 45 },
  { name: 'Equipment', usage: 60 },
  { name: 'Servers', usage: 90 },
];

function LoadManagement() {
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      {loads.map((load) => (
        <Box key={load.name} sx={{ my: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <Typography variant="body2">{load.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <LinearProgress
                variant="determinate"
                value={load.usage}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 5,
                    backgroundColor: load.usage > 80 ? '#f44336' : '#2196f3',
                  },
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" color="textSecondary">
                {load.usage}%
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}

export default LoadManagement;
