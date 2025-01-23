import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const ActiveNodes = ({ activeNodes, totalNodes }) => {
  const progress = (activeNodes / totalNodes) * 100;

  if (!totalNodes) {
    return <div style={{ color: '#FFD180' }}>Select a state to view node status</div>;
  }

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={120}
          thickness={4}
          sx={{ color: 'rgba(255, 183, 77, 0.2)' }}
        />
        <CircularProgress
          variant="determinate"
          value={progress}
          size={120}
          thickness={4}
          sx={{
            color: '#FFA500',
            position: 'absolute',
            left: 0,
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h4" sx={{ color: '#FFD180' }}>
            {activeNodes}
          </Typography>
          <Typography variant="caption" sx={{ color: '#FFD180' }}>
            Active
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ mt: 2, color: '#FFD180' }}>
        {activeNodes} out of {totalNodes} nodes active
      </Typography>
    </Box>
  );
};

export default ActiveNodes;
