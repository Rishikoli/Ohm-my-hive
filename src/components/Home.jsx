import React, { useState, useEffect, Suspense } from 'react';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { HiveModel } from './HiveModel';
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
              <Grid container spacing={4} sx={{ mt: 4 }}>
                <Grid item xs={12} md={6}>
                  <Paper
                    sx={{
                      p: 4,
                      height: '500px',
                      background: 'rgba(26, 26, 26, 0.95)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 183, 77, 0.2)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h3" component="h1" sx={{ color: '#FFB74D', mb: 3 }}>
                      Welcome to BioHive
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#FFD180', mb: 2 }}>
                      Intelligent Energy Market Analysis
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#FFF', mb: 3 }}>
                      Revolutionizing energy market analysis through biomimicry and swarm intelligence.
                      Our system learns from nature's most efficient organizers - honeybees - to predict
                      and adapt to energy stock market patterns.
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper
                    sx={{
                      height: '500px',
                      background: 'rgba(26, 26, 26, 0.95)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 183, 77, 0.2)',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                      <Canvas
                        shadows
                        camera={{ position: [0, 0, 5], fov: 50 }}
                        style={{ background: 'transparent' }}
                      >
                        <Suspense fallback={null}>
                          <ambientLight intensity={0.5} />
                          <pointLight position={[10, 10, 10]} intensity={1} castShadow />
                          <spotLight
                            position={[0, 5, 0]}
                            angle={0.3}
                            penumbra={1}
                            intensity={1}
                            castShadow
                          />
                          <HiveModel position={[0, -0.5, 0]} />
                          <OrbitControls
                            enablePan={false}
                            enableZoom={true}
                            minDistance={3}
                            maxDistance={8}
                            autoRotate
                            autoRotateSpeed={1}
                          />
                          <Environment preset="sunset" />
                        </Suspense>
                      </Canvas>
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 16,
                          left: 16,
                          color: '#FFB74D',
                          fontSize: '0.875rem',
                          pointerEvents: 'none',
                          textShadow: '0 0 4px rgba(0,0,0,0.5)',
                        }}
                      >
                        Drag to rotate • Scroll to zoom
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 4,
                      background: 'rgba(26, 26, 26, 0.95)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 183, 77, 0.2)',
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ color: '#FFB74D', mb: 2 }}>
                          Swarm Intelligence Trading
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#FFF' }}>
                          Like bees optimizing nectar collection routes, our AI analyzes market patterns
                          using swarm intelligence to predict energy stock movements and optimize trading strategies.
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ color: '#FFB74D', mb: 2 }}>
                          Hive Pattern Recognition
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#FFF' }}>
                          Just as bees communicate through dance patterns to share resource locations,
                          our system identifies recurring market patterns in energy stocks using advanced
                          biomimetic algorithms.
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ color: '#FFB74D', mb: 2 }}>
                          Adaptive Market Response
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#FFF' }}>
                          Mimicking how bee colonies rapidly adapt to environmental changes,
                          our system dynamically adjusts trading strategies based on real-time
                          market conditions and energy sector volatility.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </motion.div>
          </Container>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
