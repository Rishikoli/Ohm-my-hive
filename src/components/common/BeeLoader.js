import React from 'react';
import { Box, LinearProgress, Typography, styled } from '@mui/material';

const BeeLoaderContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  background: 'linear-gradient(-45deg, #000000, #1a1a1a, #333333, #000000)',
  backgroundSize: '400% 400%',
  animation: 'gradient 15s ease infinite',
  '@keyframes gradient': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
}));

const ProgressBarContainer = styled(Box)({
  width: '500px',
  position: 'relative',
  marginTop: '50px',
});

const BeeProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: '30px',
  borderRadius: '15px',
  backgroundColor: 'rgba(255, 224, 130, 0.2)',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#FFB300',
    borderRadius: '15px',
  },
}));

const BeeImage = styled('div')(({ progress = 0 }) => ({
  width: '100px',
  height: '100px',
  position: 'absolute',
  top: '-55px',
  left: `calc(${progress}% - 50px)`,
  backgroundImage: 'url("/assets/images/bee.png")',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  transition: 'left 0.3s ease-out',
  animation: 'flyBee 0.8s ease-in-out infinite',
  '@keyframes flyBee': {
    '0%, 100%': {
      transform: 'translateY(0)',
    },
    '50%': {
      transform: 'translateY(-10px)',
    },
  },
}));

const ProgressText = styled(Typography)(({ theme }) => ({
  color: '#FFB300',
  fontSize: '2rem',
  fontWeight: 'bold',
  marginTop: '20px',
  fontFamily: 'monospace',
  position: 'relative',
  '&::after': {
    content: '"%"',
    marginLeft: '5px',
    color: '#FFE082',
  },
  animation: 'numberFlicker 1s linear infinite',
  '@keyframes numberFlicker': {
    '0%, 100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
    '50%': {
      opacity: 0.7,
      transform: 'translateY(-2px)',
    },
  },
}));

const RandomNumbers = styled(Box)({
  position: 'absolute',
  color: 'rgba(255, 224, 130, 0.1)',
  fontSize: '1rem',
  fontFamily: 'monospace',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: -1,
});

const BeeLoader = ({ loading = true, progress = 0 }) => {
  if (!loading) return null;

  const generateRandomNumbers = () => {
    return Array.from({ length: 50 }, () => ({
      number: Math.floor(Math.random() * 10),
      x: Math.random() * 100,
      y: Math.random() * 100,
      animation: `fall ${Math.random() * 10 + 5}s linear infinite`,
    }));
  };

  return (
    <BeeLoaderContainer>
      <RandomNumbers>
        {generateRandomNumbers().map((num, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              left: `${num.x}%`,
              top: `${num.y}%`,
              animation: num.animation,
              '@keyframes fall': {
                '0%': { transform: 'translateY(-100%)', opacity: 0 },
                '50%': { opacity: 0.5 },
                '100%': { transform: 'translateY(1000%)', opacity: 0 },
              },
            }}
          >
            {num.number}
          </Box>
        ))}
      </RandomNumbers>
      <ProgressBarContainer>
        <BeeImage progress={progress} />
        <BeeProgressBar variant="determinate" value={progress} />
      </ProgressBarContainer>
      <ProgressText>{Math.round(progress)}</ProgressText>
    </BeeLoaderContainer>
  );
};

export default BeeLoader;
