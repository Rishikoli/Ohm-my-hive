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
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';

const ClimateImpact = () => {
  const { addFootprintData } = useCarbonContext();
  const [formData, setFormData] = useState({
    electricityUsage: 0,
    carMileage: 0,
    publicTransport: 0,
    homeSize: 0,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Simulate loading weather data
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCurrentWeather({
          temperature: 28,
          humidity: 65,
          condition: 'Partly Cloudy'
        });
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

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

    return totalImpact;
  };

  const generateSuggestions = (total, weatherImpactValue) => {
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
    if (total > 1000) {
      suggestions.push('Consider installing smart thermostats');
      suggestions.push('Switch to LED lighting');
    }
    if (formData.carMileage > 1000) {
      suggestions.push('Consider carpooling or using public transport');
      suggestions.push('Switch to an electric or hybrid vehicle');
    }
    if (formData.homeSize > 1000) {
      suggestions.push('Improve home insulation');
      suggestions.push('Install energy-efficient windows');
    }

    return suggestions;
  };

  const calculateFootprint = async () => {
    setCalculating(true);
    try {
      // Simulate calculation time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const weatherImpactValue = calculateWeatherImpact();
      const electricityFootprint = (formData.electricityUsage + weatherImpactValue) * 0.85;
      const carFootprint = formData.carMileage * 0.404;
      const transportFootprint = formData.publicTransport * 0.14;
      const homeFootprint = formData.homeSize * 0.5;

      const total = electricityFootprint + carFootprint + transportFootprint + homeFootprint;
      const suggestions = generateSuggestions(total, weatherImpactValue);
      
      setResult({
        total: Math.round(total),
        breakdown: {
          electricity: Math.round(electricityFootprint),
          car: Math.round(carFootprint),
          transport: Math.round(transportFootprint),
          home: Math.round(homeFootprint),
        },
        suggestions,
      });
      
      addFootprintData({
        total: Math.round(total),
        timestamp: new Date().toISOString(),
        breakdown: {
          electricity: Math.round(electricityFootprint),
          car: Math.round(carFootprint),
          transport: Math.round(transportFootprint),
          home: Math.round(homeFootprint),
        }
      });
    } catch (error) {
      console.error('Error calculating footprint:', error);
    } finally {
      setCalculating(false);
    }
  };

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: Number(event.target.value)
    });
  };

  if (loading) {
    return (
      <LoadingScreen 
        text="Analyzing Climate Data" 
        subtext="Fetching weather information and calculating environmental impact..."
        fullScreen={true}
      />
    );
  }

  if (calculating) {
    return (
      <LoadingScreen 
        text="Calculating Carbon Footprint" 
        subtext="Processing your data and generating personalized insights..."
        fullScreen={false}
      />
    );
  }

  return (
    <Container maxWidth="xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={3}>
          {/* Header Section */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(26, 26, 26, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 183, 77, 0.2)',
              }}
            >
              <Typography variant="h4" sx={{ color: '#FFB74D', mb: 2 }}>
                Climate Impact Analysis
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'rgba(255, 183, 77, 0.8)' }}>
                Real-time analysis of energy usage and environmental impact
              </Typography>
            </Paper>
          </Grid>

          {/* Calculator Form */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(26, 26, 26, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 183, 77, 0.2)',
              }}
            >
              <Typography variant="h6" sx={{ color: '#FFB74D', mb: 3 }}>
                Carbon Footprint Calculator
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
          </Grid>

          {/* Results Section */}
          <Grid item xs={12} md={6}>
            {result ? (
              <Paper
                sx={{
                  p: 3,
                  background: 'rgba(26, 26, 26, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 183, 77, 0.2)',
                }}
              >
                <Typography variant="h6" sx={{ color: '#FFB74D', mb: 2 }}>
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
            ) : null}
          </Grid>

          {/* Historical Data */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(26, 26, 26, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 183, 77, 0.2)',
              }}
            >
              <Typography variant="h6" sx={{ color: '#FFB74D', mb: 3 }}>
                Historical Impact
              </Typography>
              <HistoricalChart />
            </Paper>
          </Grid>

          {/* Peer Comparison */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(26, 26, 26, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 183, 77, 0.2)',
              }}
            >
              <Typography variant="h6" sx={{ color: '#FFB74D', mb: 3 }}>
                Peer Comparison
              </Typography>
              <PeerComparison data={result} />
            </Paper>
          </Grid>

          {/* Goal Tracker */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(26, 26, 26, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 183, 77, 0.2)',
              }}
            >
              <Typography variant="h6" sx={{ color: '#FFB74D', mb: 3 }}>
                Goal Tracker
              </Typography>
              <GoalTracker data={result} />
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default ClimateImpact;
