import React from 'react';
import { Box, Typography } from '@mui/material';
import './LoadingScreen.css';

const LoadingScreen = ({ text = 'Initializing Energy Grid', subtext = 'Connecting to smart grid network...', fullScreen = true }) => {
  const containerStyle = fullScreen ? 'loading-screen' : 'loading-container';
  
  return (
    <Box className={containerStyle}>
      <div className="hexagon-loader">
        <div className="hexagon hex1"></div>
        <div className="hexagon hex2"></div>
        <div className="hexagon hex3"></div>
      </div>
      <Typography 
        variant="h5" 
        className="loading-text"
        sx={{
          fontFamily: "'Orbitron', sans-serif",
          color: '#FFB74D',
          mt: 3,
          textAlign: 'center',
          textShadow: '0 0 10px rgba(255, 183, 77, 0.5)'
        }}
      >
        {text}
      </Typography>
      <Typography 
        variant="body1" 
        className="loading-subtext"
        sx={{
          fontFamily: "'Rajdhani', sans-serif",
          color: 'rgba(255, 255, 255, 0.7)',
          mt: 1,
          textAlign: 'center'
        }}
      >
        {subtext}
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
