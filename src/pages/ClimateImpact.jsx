import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Card, CardContent, TextField, Button, CircularProgress } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';
import LightModeIcon from '@mui/icons-material/LightMode';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import { useCarbonContext } from '../context/CarbonContext';
import PeerComparison from '../components/CarbonFootprint/PeerComparison';
import HistoricalChart from '../components/CarbonFootprint/HistoricalChart';
import GoalTracker from '../components/CarbonFootprint/GoalTracker';

const ClimateImpact = () => {
  const { addFootprintData } = useCarbonContext();
  const [formData, setFormData] = useState({
    electricityUsage: 0,
    carMileage: 0,
    publicTransport: 0,
    homeSize: 0,
  });

  const [result, setResult] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 28,
    humidity: 65,
    condition: 'Partly Cloudy'
  });

  const [weatherImpact, setWeatherImpact] = useState({
    heatingImpact: 0,
    coolingImpact: 0,
    totalImpact: 0
  });

  const calculateWeatherImpact = () => {
    // Calculate impact based on temperature
    const optimalTemp = 22; // Optimal temperature for minimal energy usage
    const tempDiff = Math.abs(currentWeather.temperature - optimalTemp);
    
    let heatingImpact = 0;
    let coolingImpact = 0;

    if (currentWeather.temperature < optimalTemp) {
      heatingImpact = tempDiff * 50; // Approximate kWh impact
    } else {
      coolingImpact = tempDiff * 40; // AC is slightly more efficient
    }

    // Adjust for humidity
    const humidityFactor = (currentWeather.humidity > 60) 
      ? 1 + ((currentWeather.humidity - 60) / 100)
      : 1;

    const totalImpact = (heatingImpact + coolingImpact) * humidityFactor;

    setWeatherImpact({
      heatingImpact,
      coolingImpact,
      totalImpact
    });

    return totalImpact;
  };

  const calculateFootprint = () => {
    const weatherImpactValue = calculateWeatherImpact();
    
    // Base calculations
    const electricityFootprint = (formData.electricityUsage + weatherImpactValue) * 0.85;
    const carFootprint = formData.carMileage * 0.404;
    const transportFootprint = formData.publicTransport * 0.14;
    const homeFootprint = formData.homeSize * 0.5;

    const total = electricityFootprint + carFootprint + transportFootprint + homeFootprint;

    const suggestions = [];
    
    // Weather-based suggestions
    if (currentWeather.temperature > 25) {
      suggestions.push('Use natural ventilation during cooler hours');
      suggestions.push('Consider using solar reflective window films');
    } else if (currentWeather.temperature < 18) {
      suggestions.push('Optimize heating system efficiency');
      suggestions.push('Check for drafts and improve insulation');
    }
    
    if (currentWeather.humidity > 60) {
      suggestions.push('Use dehumidifiers to reduce AC load');
      suggestions.push('Ensure proper ventilation');
    }

    // Usage-based suggestions
    if (electricityFootprint > 1000) {
      suggestions.push('Consider installing smart thermostats');
      suggestions.push('Switch to LED lighting');
    }
    if (carFootprint > 1000) {
      suggestions.push('Consider carpooling or using public transport');
      suggestions.push('Switch to an electric or hybrid vehicle');
    }
    if (homeFootprint > 1000) {
      suggestions.push('Improve home insulation');
      suggestions.push('Install energy-efficient windows');
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
      weatherImpact: weatherImpactValue
    };

    setResult(resultData);
    addFootprintData(resultData);
  };

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: Number(event.target.value)
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
                Climate Impact Calculator
              </Typography>
              <Typography variant="body1" sx={{ color: '#fff', mb: 2 }}>
                Current conditions: {currentWeather.temperature}°C, {currentWeather.humidity}% humidity, {currentWeather.condition}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        {/* Weather Impact Section */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Paper
              sx={{
                p: 3,
                height: '100%',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(26, 26, 26, 0.95)',
                border: '1px solid rgba(255, 183, 77, 0.2)',
                borderRadius: '8px',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: '#FFB74D' }}>
                Weather Impact
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ color: '#fff', display: 'flex', alignItems: 'center', mb: 1 }}>
                  <DeviceThermostatIcon sx={{ mr: 1, color: '#FFB74D' }} />
                  Temperature Impact: {Math.round(weatherImpact.heatingImpact + weatherImpact.coolingImpact)} kWh
                </Typography>
                <Typography variant="body1" sx={{ color: '#fff', display: 'flex', alignItems: 'center', mb: 1 }}>
                  <WaterDropIcon sx={{ mr: 1, color: '#FFB74D' }} />
                  Humidity Factor: {Math.round((currentWeather.humidity > 60 ? 1 + ((currentWeather.humidity - 60) / 100) : 1) * 100)}%
                </Typography>
                <Typography variant="h6" sx={{ color: '#FFB74D', mt: 2 }}>
                  Total Weather Impact: {Math.round(weatherImpact.totalImpact)} kWh
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* Calculator Form */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper
              sx={{
                p: 3,
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(26, 26, 26, 0.95)',
                border: '1px solid rgba(255, 183, 77, 0.2)',
                borderRadius: '8px',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: '#FFB74D' }}>
                Calculate Your Impact
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Electricity Usage (kWh)"
                    type="number"
                    value={formData.electricityUsage}
                    onChange={handleChange('electricityUsage')}
                    InputProps={{
                      startAdornment: <ElectricBoltIcon sx={{ mr: 1, color: '#FFB74D' }} />,
                    }}
                    sx={{
                      '& label': { color: '#FFB74D' },
                      '& input': { color: '#fff' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255, 183, 77, 0.3)' },
                        '&:hover fieldset': { borderColor: '#FFB74D' },
                        '&.Mui-focused fieldset': { borderColor: '#FFB74D' },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Car Mileage"
                    type="number"
                    value={formData.carMileage}
                    onChange={handleChange('carMileage')}
                    InputProps={{
                      startAdornment: <DirectionsCarIcon sx={{ mr: 1, color: '#FFB74D' }} />,
                    }}
                    sx={{
                      '& label': { color: '#FFB74D' },
                      '& input': { color: '#fff' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255, 183, 77, 0.3)' },
                        '&:hover fieldset': { borderColor: '#FFB74D' },
                        '&.Mui-focused fieldset': { borderColor: '#FFB74D' },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Public Transport (miles)"
                    type="number"
                    value={formData.publicTransport}
                    onChange={handleChange('publicTransport')}
                    sx={{
                      '& label': { color: '#FFB74D' },
                      '& input': { color: '#fff' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255, 183, 77, 0.3)' },
                        '&:hover fieldset': { borderColor: '#FFB74D' },
                        '&.Mui-focused fieldset': { borderColor: '#FFB74D' },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Home Size (sq ft)"
                    type="number"
                    value={formData.homeSize}
                    onChange={handleChange('homeSize')}
                    InputProps={{
                      startAdornment: <HomeIcon sx={{ mr: 1, color: '#FFB74D' }} />,
                    }}
                    sx={{
                      '& label': { color: '#FFB74D' },
                      '& input': { color: '#fff' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255, 183, 77, 0.3)' },
                        '&:hover fieldset': { borderColor: '#FFB74D' },
                        '&.Mui-focused fieldset': { borderColor: '#FFB74D' },
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
                      mt: 2,
                      backgroundColor: '#FFB74D',
                      '&:hover': {
                        backgroundColor: '#FFA726',
                      },
                    }}
                  >
                    Calculate Impact
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Grid>

        {/* Results Section */}
        {result && (
          <>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(26, 26, 26, 0.95)',
                    border: '1px solid rgba(255, 183, 77, 0.2)',
                    borderRadius: '8px',
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ color: '#FFB74D' }}>
                    Your Climate Impact
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#FFB74D', mb: 2 }}>
                    {result.total} kg CO₂e
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Card sx={{ backgroundColor: 'rgba(26, 26, 26, 0.95)', border: '1px solid rgba(255, 183, 77, 0.2)' }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ color: '#FFB74D', mb: 2 }}>
                            Breakdown
                          </Typography>
                          <Typography variant="body1" sx={{ color: '#fff', display: 'flex', alignItems: 'center', mb: 1 }}>
                            <ElectricBoltIcon sx={{ mr: 1, color: '#FFB74D' }} />
                            Electricity: {result.breakdown.electricity} kg CO₂e
                          </Typography>
                          <Typography variant="body1" sx={{ color: '#fff', display: 'flex', alignItems: 'center', mb: 1 }}>
                            <DirectionsCarIcon sx={{ mr: 1, color: '#FFB74D' }} />
                            Car Travel: {result.breakdown.car} kg CO₂e
                          </Typography>
                          <Typography variant="body1" sx={{ color: '#fff', display: 'flex', alignItems: 'center', mb: 1 }}>
                            Public Transport: {result.breakdown.transport} kg CO₂e
                          </Typography>
                          <Typography variant="body1" sx={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
                            <HomeIcon sx={{ mr: 1, color: '#FFB74D' }} />
                            Home: {result.breakdown.home} kg CO₂e
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card sx={{ backgroundColor: 'rgba(26, 26, 26, 0.95)', border: '1px solid rgba(255, 183, 77, 0.2)' }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ color: '#FFB74D', mb: 2 }}>
                            Recommendations
                          </Typography>
                          {result.suggestions.map((suggestion, index) => (
                            <Typography key={index} variant="body1" sx={{ color: '#fff', mb: 1 }}>
                              • {suggestion}
                            </Typography>
                          ))}
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Paper>
              </motion.div>
            </Grid>

            {/* Historical Data */}
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <HistoricalChart />
              </motion.div>
            </Grid>

            {/* Peer Comparison */}
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <PeerComparison currentFootprint={result.total} />
              </motion.div>
            </Grid>

            {/* Goal Tracker */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <GoalTracker />
              </motion.div>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default ClimateImpact;
