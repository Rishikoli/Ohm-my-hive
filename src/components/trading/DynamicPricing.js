import React from 'react';
import { Box, Typography, Grid, Card, CardContent, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '10px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: 'white',
}));

const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
    backgroundColor: '#FFD400',
  },
}));

const DynamicPricing = () => {
  const priceFactors = [
    { name: "Current Demand", value: 75, trend: "↑" },
    { name: "Grid Load", value: 60, trend: "→" },
    { name: "Renewable Supply", value: 85, trend: "↑" },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, color: 'white' }}>
        Dynamic Pricing
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <Typography variant="h4" gutterBottom sx={{ color: '#FFD400' }}>
                12.5 Credits/kWh
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                Current Market Price
              </Typography>
              
              {priceFactors.map((factor, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>{factor.name}</Typography>
                    <Typography>{factor.trend} {factor.value}%</Typography>
                  </Box>
                  <CustomLinearProgress 
                    variant="determinate" 
                    value={factor.value} 
                  />
                </Box>
              ))}
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DynamicPricing;
