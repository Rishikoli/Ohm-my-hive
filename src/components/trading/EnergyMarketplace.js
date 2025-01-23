import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, IconButton, Chip, Slider, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

const StyledCard = styled(motion(Card))(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: 'white',
  overflow: 'visible',
}));

const PriceTag = styled(Typography)(({ theme }) => ({
  color: '#FFD400',
  textShadow: '0 0 10px rgba(255, 212, 0, 0.5)',
  fontWeight: 'bold',
  display: 'inline-block',
  transition: 'all 0.3s ease',
  '&:hover': {
    textShadow: '0 0 20px rgba(255, 212, 0, 0.8)',
    transform: 'scale(1.05)',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
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

const MarketItem = ({ title, price, amount, seller, type, efficiency }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState(20);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <Grid item xs={12} md={4}>
      <StyledCard
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        layoutId={`card-${title}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <IconButton sx={{ color: '#FFD400' }}>
              <span className="material-icons">
                {type === 'Solar' ? 'wb_sunny' : type === 'Wind' ? 'air' : 'eco'}
              </span>
            </IconButton>
          </Box>
          
          <PriceTag variant="h4">
            {price} Credits/kWh
          </PriceTag>

          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              label={`${amount} kWh Available`}
              sx={{ 
                backgroundColor: 'rgba(255, 212, 0, 0.1)',
                color: '#FFD400',
                border: '1px solid #FFD400'
              }}
            />
            <Chip 
              label={`${efficiency}% Efficient`}
              sx={{ 
                backgroundColor: 'rgba(144, 202, 249, 0.1)',
                color: '#90CAF9',
                border: '1px solid #90CAF9'
              }}
            />
          </Box>

          <Typography variant="body2" sx={{ mt: 2, color: 'rgba(255,255,255,0.7)' }}>
            Seller: {seller}
          </Typography>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ mt: 3 }}>
                  <Typography gutterBottom>Purchase Amount (kWh)</Typography>
                  <Slider
                    value={purchaseAmount}
                    onChange={(e, value) => setPurchaseAmount(value)}
                    min={0}
                    max={amount}
                    valueLabelDisplay="auto"
                    sx={{
                      color: '#FFD400',
                      '& .MuiSlider-thumb': {
                        '&:hover, &.Mui-focusVisible': {
                          boxShadow: '0 0 0 8px rgba(255, 212, 0, 0.16)',
                        },
                      },
                    }}
                  />
                  <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,0.7)' }}>
                    Total Cost: {(price * purchaseAmount).toFixed(2)} Credits
                  </Typography>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>

          <ActionButton 
            fullWidth 
            sx={{ mt: 2 }}
            onClick={(e) => {
              e.stopPropagation();
              // Handle purchase
            }}
          >
            Purchase Now
          </ActionButton>
        </CardContent>
      </StyledCard>
    </Grid>
  );
};

const EnergyMarketplace = () => {
  const marketItems = [
    { 
      title: "Solar Energy Bundle", 
      price: 12, 
      amount: 100, 
      seller: "SolarHub_A1",
      type: "Solar",
      efficiency: 95
    },
    { 
      title: "Wind Energy Pack", 
      price: 10, 
      amount: 150, 
      seller: "WindFarm_B2",
      type: "Wind",
      efficiency: 88
    },
    { 
      title: "Mixed Renewable", 
      price: 11, 
      amount: 75, 
      seller: "GreenEnergy_C3",
      type: "Mixed",
      efficiency: 92
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h5" sx={{ mb: 3, color: 'white' }}>
          Energy Marketplace
        </Typography>
      </motion.div>
      
      <Grid container spacing={3}>
        {marketItems.map((item, index) => (
          <MarketItem 
            key={index} 
            {...item} 
          />
        ))}
      </Grid>
    </Box>
  );
};

export default EnergyMarketplace;
