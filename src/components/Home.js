import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import './Home/HexGrid.css';
// import AnimatedBee from './AnimatedBee';
import GlowingFlower from './GlowingFlower';
const Home = () => {
  const generateHexagons = () => {
    const hexagons = [];
    const totalHexagons = 13;
    
    for (let i = 0; i < totalHexagons; i++) {
      if (i === 6) continue; // Skip center
      hexagons.push(
        <div key={i} className="hex-block">
          <span className="hex-content">{String.fromCodePoint(0x1F41D)}</span>
        </div>
      );
    }
    return hexagons;
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Paper
                elevation={3}
                sx={{
                  position: 'relative',
                  p: 4,
                  backdropFilter: 'blur(5px)',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(255, 183, 77, 0.2)',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(255, 183, 77, 0.2)',
                  overflow: 'hidden',
                  minHeight: '80vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                {/* Title Section */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                    textAlign: 'center',
                    width: '100%',
                    padding: '0 20px',
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    <Typography 
                      variant="h1" 
                      sx={{ 
                        color: '#FFB74D',
                        fontFamily: "'Orbitron', sans-serif",
                        textShadow: '0 0 20px rgba(255, 183, 77, 0.3)',
                        mb: 2,
                        fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                        fontWeight: 'bold',
                      }}
                    >
                      Ohm My Hive
                    </Typography>
                  </motion.div>
                  <GlowingFlower />

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  >
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: '#fff',
                        fontFamily: "'Rajdhani', sans-serif",
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                        maxWidth: '800px',
                        margin: '0 auto',
                        mb: 4,
                      }}
                    >
                      Smart Energy Management
                    </Typography>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.9 }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontFamily: "'Rajdhani', sans-serif",
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: 1.6,
                      }}
                    >
                      Revolutionizing energy management with smart hive technology
                    </Typography>
                  </motion.div>
                </Box>

                {/* Hexagonal Background */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                    opacity: 0.5,
                  }}
                >
                  <div className="hex-grid">
                    {generateHexagons()}
                  </div>
                </Box>

                {/* Animated Background Effect */}
                <motion.div
                  className="energy-flow"
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at center, rgba(255, 183, 77, 0.1) 0%, transparent 70%)',
                    zIndex: 0,
                  }}
                />
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
