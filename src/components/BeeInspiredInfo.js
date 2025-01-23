import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
import { motion } from 'framer-motion';

const BeeInspiredInfo = () => {
  const infoCards = [
    {
      title: "Hive Intelligence",
      content: "Like honey bees organizing their hive with remarkable efficiency, our system optimizes energy distribution through smart algorithms and real-time monitoring.",
      icon: ""
    },
    {
      title: "Swarm Optimization",
      content: "Inspired by bee swarm behavior, our network of nodes collaborates to achieve optimal energy distribution and load balancing.",
      icon: ""
    },
    {
      title: "Community Power",
      content: "Similar to bee colonies working together, our smart grid enables community-based energy sharing and optimization.",
      icon: ""
    }
  ];

  return (
    <Paper 
      elevation={3}
      sx={{
        p: 3,
        background: 'rgba(26, 26, 26, 0.95)',
        borderRadius: '15px',
        border: '1px solid rgba(255, 183, 77, 0.2)'
      }}
    >
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          color: '#FFD180',
          mb: 3,
          textAlign: 'center',
          fontWeight: 500
        }}
      >
        Bio-Inspired Energy Management
      </Typography>
      
      <Grid container spacing={2}>
        {infoCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  height: '100%',
                  background: 'rgba(26, 26, 26, 0.8)',
                  border: '1px solid rgba(255, 183, 77, 0.1)',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    border: '1px solid rgba(255, 183, 77, 0.3)',
                    boxShadow: '0 4px 20px rgba(255, 183, 77, 0.1)'
                  }
                }}
              >
                <Box sx={{ mb: 1, fontSize: '24px', textAlign: 'center' }}>
                  {card.icon}
                </Box>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    color: '#FFD180',
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    mb: 1
                  }}
                >
                  {card.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255, 209, 128, 0.7)',
                    textAlign: 'center'
                  }}
                >
                  {card.content}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default BeeInspiredInfo;
