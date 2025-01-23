import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Slider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import NatureIcon from '@mui/icons-material/Nature';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import { motion } from 'framer-motion';
import PeerComparison from '../components/CarbonFootprint/PeerComparison';
import HistoricalChart from '../components/CarbonFootprint/HistoricalChart';
import GoalTracker from '../components/CarbonFootprint/GoalTracker';
import { useCarbonContext } from '../context/CarbonContext';

const CarbonFootprint = () => {
  const [formData, setFormData] = useState({
    electricityUsage: 0,
    carMileage: 0,
    publicTransport: 0,
    homeSize: 0,
  });

  const [result, setResult] = useState(null);
  const { addFootprintData } = useCarbonContext();

  const calculateFootprint = () => {
    // Simple calculation formula (can be made more complex based on requirements)
    const electricityFootprint = formData.electricityUsage * 0.85; // kWh to CO2
    const carFootprint = formData.carMileage * 0.404; // miles to CO2
    const transportFootprint = formData.publicTransport * 0.14; // miles to CO2
    const homeFootprint = formData.homeSize * 0.5; // sqft to CO2

    const total = electricityFootprint + carFootprint + transportFootprint + homeFootprint;

    const suggestions = [];
    if (electricityFootprint > 1000) {
      suggestions.push('Consider using energy-efficient appliances');
      suggestions.push('Switch to LED lighting');
    }
    if (carFootprint > 1000) {
      suggestions.push('Consider carpooling or using public transport');
      suggestions.push('Switch to an electric or hybrid vehicle');
    }
    if (homeFootprint > 1000) {
      suggestions.push('Improve home insulation');
      suggestions.push('Install smart thermostats');
    }

    const resultData = {
      total: Math.round(total),
      breakdown: {
        electricity: Math.round(electricityFootprint),
        car: Math.round(carFootprint),
        transport: Math.round(transportFootprint),
        home: Math.round(homeFootprint),
      },
      suggestions,
    };

    setResult(resultData);
    addFootprintData(resultData);
  };

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: parseFloat(event.target.value) || 0,
    });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Title Section */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              sx={{
                p: 3,
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(26, 26, 26, 0.95)',
                border: '1px solid rgba(255, 183, 77, 0.2)',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(255, 183, 77, 0.2)',
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ color: '#FFB74D' }}>
                Carbon Footprint Calculator
              </Typography>
              <Typography variant="body1" sx={{ color: '#fff', mb: 2 }}>
                Calculate your carbon footprint and discover ways to reduce your environmental impact.
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        {/* Calculator Form */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper
              sx={{
                p: 3,
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(26, 26, 26, 0.95)',
                border: '1px solid rgba(255, 183, 77, 0.2)',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(255, 183, 77, 0.2)',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: '#FFB74D' }}>
                Enter Your Usage Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Monthly Electricity Usage (kWh)"
                    type="number"
                    value={formData.electricityUsage}
                    onChange={handleChange('electricityUsage')}
                    InputLabelProps={{
                      style: { color: '#FFB74D' },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 183, 77, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FFB74D',
                        },
                      },
                      '& input': {
                        color: '#fff',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Monthly Car Mileage"
                    type="number"
                    value={formData.carMileage}
                    onChange={handleChange('carMileage')}
                    InputLabelProps={{
                      style: { color: '#FFB74D' },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 183, 77, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FFB74D',
                        },
                      },
                      '& input': {
                        color: '#fff',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Monthly Public Transport Miles"
                    type="number"
                    value={formData.publicTransport}
                    onChange={handleChange('publicTransport')}
                    InputLabelProps={{
                      style: { color: '#FFB74D' },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 183, 77, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FFB74D',
                        },
                      },
                      '& input': {
                        color: '#fff',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Home Size (sq ft)"
                    type="number"
                    value={formData.homeSize}
                    onChange={handleChange('homeSize')}
                    InputLabelProps={{
                      style: { color: '#FFB74D' },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 183, 77, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FFB74D',
                        },
                      },
                      '& input': {
                        color: '#fff',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={calculateFootprint}
                    sx={{
                      backgroundColor: '#FFB74D',
                      '&:hover': {
                        backgroundColor: '#FFA726',
                      },
                    }}
                  >
                    Calculate Footprint
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Grid>

        {/* Results Section */}
        {result && (
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                sx={{
                  p: 3,
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(26, 26, 26, 0.95)',
                  border: '1px solid rgba(255, 183, 77, 0.2)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(255, 183, 77, 0.2)',
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ color: '#FFB74D' }}>
                  Your Carbon Footprint
                </Typography>
                <Typography variant="h4" gutterBottom sx={{ color: '#4CAF50' }}>
                  {result.total} kg CO2/month
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ color: '#FFB74D', mb: 1 }}>
                    Breakdown
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <ElectricBoltIcon sx={{ color: '#FFB74D' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Electricity" 
                        secondary={`${result.breakdown.electricity} kg CO2`}
                        sx={{ 
                          '& .MuiListItemText-primary': { color: '#fff' },
                          '& .MuiListItemText-secondary': { color: '#FFB74D' }
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DirectionsCarIcon sx={{ color: '#FFB74D' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Car Usage" 
                        secondary={`${result.breakdown.car} kg CO2`}
                        sx={{ 
                          '& .MuiListItemText-primary': { color: '#fff' },
                          '& .MuiListItemText-secondary': { color: '#FFB74D' }
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <HomeIcon sx={{ color: '#FFB74D' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Home Energy" 
                        secondary={`${result.breakdown.home} kg CO2`}
                        sx={{ 
                          '& .MuiListItemText-primary': { color: '#fff' },
                          '& .MuiListItemText-secondary': { color: '#FFB74D' }
                        }}
                      />
                    </ListItem>
                  </List>
                </Box>

                <Typography variant="subtitle1" sx={{ color: '#FFB74D', mb: 1 }}>
                  Suggestions for Improvement
                </Typography>
                <List>
                  {result.suggestions.map((suggestion, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <NatureIcon sx={{ color: '#4CAF50' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={suggestion}
                        sx={{ 
                          '& .MuiListItemText-primary': { color: '#fff' }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </motion.div>
          </Grid>
        )}

        {/* Historical Data */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HistoricalChart />
          </motion.div>
        </Grid>

        {/* Peer Comparison */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <PeerComparison currentFootprint={result?.total || 0} />
          </motion.div>
        </Grid>

        {/* Goal Tracker */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GoalTracker />
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CarbonFootprint;
