import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import './BeeLoader.css';

const BeeLoader = ({ text = 'Loading...' }) => {
  const beeVariants = {
    initial: { x: -20, y: 0 },
    animate: {
      x: 20,
      y: [0, -10, 0, 10, 0],
      transition: {
        x: {
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
        },
        y: {
          duration: 2.5,
          repeat: Infinity,
          repeatType: 'reverse',
        },
      },
    },
  };

  const pathVariants = {
    initial: {
      pathLength: 0,
    },
    animate: {
      pathLength: 1,
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Box sx={{ position: 'relative', width: 100, height: 100 }}>
        {/* Bee flight path */}
        <motion.svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <motion.path
            d="M10 50 Q 50 20, 90 50"
            fill="transparent"
            stroke="rgba(255, 183, 77, 0.3)"
            strokeWidth="2"
            variants={pathVariants}
            initial="initial"
            animate="animate"
          />
        </motion.svg>

        {/* Animated bee */}
        <motion.div
          style={{
            position: 'absolute',
            top: '40%',
            left: '40%',
          }}
          variants={beeVariants}
          initial="initial"
          animate="animate"
        >
          <Box
            sx={{
              width: 20,
              height: 20,
              backgroundColor: '#FFB74D',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '80%',
                height: '60%',
                background: 'repeating-linear-gradient(90deg, #000, #000 2px, #FFB74D 2px, #FFB74D 6px)',
                opacity: 0.7,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '15%',
                right: '-30%',
                width: '40%',
                height: '70%',
                background: 'rgba(255, 255, 255, 0.7)',
                clipPath: 'polygon(0 50%, 100% 0, 100% 100%)',
                animation: 'wing 0.5s ease-in-out infinite alternate',
              },
            }}
          />
        </motion.div>
      </Box>

      <Typography
        variant="body1"
        sx={{
          color: '#FFB74D',
          textAlign: 'center',
          fontWeight: 500,
          mt: 2,
        }}
      >
        {text}
      </Typography>

      <CircularProgress
        size={24}
        thickness={4}
        sx={{
          color: '#FFB74D',
          opacity: 0.7,
        }}
      />
    </Box>
  );
};

export default BeeLoader;
