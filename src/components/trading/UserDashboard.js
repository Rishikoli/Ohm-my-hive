import React from 'react';
import { Box, Paper, Typography, Grid, Card, CardContent, IconButton, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledCard = styled(motion(Card))(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: 'white',
  overflow: 'visible',
}));

const GlowingNumber = styled(Typography)(({ theme }) => ({
  color: '#FFD400',
  textShadow: '0 0 10px rgba(255, 212, 0, 0.5)',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  '&:hover': {
    textShadow: '0 0 20px rgba(255, 212, 0, 0.8)',
    transform: 'scale(1.05)',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  background: 'linear-gradient(45deg, #FFD400 30%, #FFA000 90%)',
  borderRadius: '25px',
  border: 0,
  color: 'black',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 212, 0, .3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 10px 4px rgba(255, 212, 0, .3)',
  },
}));

const UserDashboard = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h5" sx={{ mb: 3, color: 'white' }}>
          User Dashboard
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledCard
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Energy Balance
                </Typography>
                <IconButton sx={{ color: '#FFD400' }}>
                  <span className="material-icons">bolt</span>
                </IconButton>
              </Box>
              <GlowingNumber variant="h3">
                245 kWh
              </GlowingNumber>
              <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,0.7)' }}>
                Available for trading
              </Typography>
              <ActionButton fullWidth>
                Trade Energy
              </ActionButton>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledCard
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: 0.2 }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Credit Balance
                </Typography>
                <IconButton sx={{ color: '#FFD400' }}>
                  <span className="material-icons">account_balance_wallet</span>
                </IconButton>
              </Box>
              <GlowingNumber variant="h3">
                1,250 Credits
              </GlowingNumber>
              <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,0.7)' }}>
                Current trading power
              </Typography>
              <ActionButton fullWidth>
                Buy Credits
              </ActionButton>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12}>
          <StyledCard
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: 0.4 }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6} sm={3}>
                  <ActionButton fullWidth startIcon={<span className="material-icons">add_circle</span>}>
                    Sell Energy
                  </ActionButton>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <ActionButton fullWidth startIcon={<span className="material-icons">shopping_cart</span>}>
                    Buy Energy
                  </ActionButton>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <ActionButton fullWidth startIcon={<span className="material-icons">history</span>}>
                    View History
                  </ActionButton>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <ActionButton fullWidth startIcon={<span className="material-icons">analytics</span>}>
                    Analytics
                  </ActionButton>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
