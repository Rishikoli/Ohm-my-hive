import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './LoadingScreen/LoadingScreen';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen text="Initializing Smart Energy Platform..." />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
          pt: 8,
        }}>
          <Container maxWidth="xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h2" sx={{
                color: '#FFB74D',
                fontWeight: 700,
                textAlign: 'center',
                mb: 3,
                fontFamily: "'Orbitron', sans-serif",
                textShadow: '0 0 20px rgba(255, 183, 77, 0.3)',
              }}>
                Smart Energy Grid
              </Typography>
              <Typography variant="h5" sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                textAlign: 'center',
                mb: 6,
                fontFamily: "'Rajdhani', sans-serif",
              }}>
                Revolutionizing energy distribution through blockchain and AI
              </Typography>
            </motion.div>

            {/* Add your home page content here */}
          </Container>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
