import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
import { motion } from 'framer-motion';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import HubIcon from '@mui/icons-material/Hub';
import GroupWorkIcon from '@mui/icons-material/GroupWork';

const DashboardBeeInfo = () => {
  const infoCards = [
    {
      title: "Hive Intelligence",
      content: "Like honey bees organizing their hive with remarkable efficiency, our system optimizes energy distribution through smart algorithms and real-time monitoring.",
      icon: <ElectricBoltIcon sx={{ fontSize: 40, color: '#FFD180' }} />
    },
    {
      title: "Community Power",
      content: "Similar to bee colonies working together, our smart grid enables community-based energy sharing and optimization.",
      icon: <GroupWorkIcon sx={{ fontSize: 40, color: '#FFD180' }} />
    },
    {
      title: "Swarm Optimization",
      content: "Inspired by bee swarm behavior, our network of nodes collaborates to achieve optimal energy distribution and load balancing.",
      icon: <HubIcon sx={{ fontSize: 40, color: '#FFD180' }} />
    }
  ];

  return (
    <Grid container spacing={2}>
      {infoCards.map((card, index) => (
        <Grid item xs={12} md={4} key={index}>
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
                minHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(26, 26, 26, 0.95)',
                border: '1px solid rgba(255, 183, 77, 0.2)',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  border: '1px solid rgba(255, 183, 77, 0.3)',
                  boxShadow: '0 4px 20px rgba(255, 183, 77, 0.1)'
                }
              }}
            >
              <Box sx={{ mb: 2 }}>
                {card.icon}
              </Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#FFD180',
                  textAlign: 'center',
                  mb: 1,
                  fontWeight: 500
                }}
              >
                {card.title}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 209, 128, 0.7)',
                  textAlign: 'center',
                  px: 1
                }}
              >
                {card.content}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardBeeInfo;
