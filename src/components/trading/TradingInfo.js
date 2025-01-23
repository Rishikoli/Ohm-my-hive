import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
import { motion } from 'framer-motion';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const TradingInfo = () => {
  const infoCards = [
    {
      title: "Efficient Trading",
      content: "Just as bees efficiently trade nectar within their colony, our platform enables seamless energy trading between community members.",
      icon: <CompareArrowsIcon sx={{ fontSize: 40, color: '#FFD180' }} />
    },
    {
      title: "Market Dynamics",
      content: "Like the waggle dance of bees communicating flower locations, our market signals help users identify optimal trading opportunities.",
      icon: <ShowChartIcon sx={{ fontSize: 40, color: '#FFD180' }} />
    },
    {
      title: "Value Storage",
      content: "Similar to how bees store honey for future use, our system allows energy credits to be stored and traded when most valuable.",
      icon: <AccountBalanceIcon sx={{ fontSize: 40, color: '#FFD180' }} />
    }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography 
        variant="h5" 
        sx={{ 
          color: '#FFD180',
          mb: 3,
          fontWeight: 500,
          textAlign: 'center'
        }}
      >
        Bio-Inspired Trading System
      </Typography>
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
    </Box>
  );
};

export default TradingInfo;
