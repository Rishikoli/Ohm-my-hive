import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import IndiaMap from './IndiaMap/IndiaMap';
import HistoricalData from './HistoricalData/HistoricalData';
import BeeTrail from './BeeTrail';
import { soundManager } from './SoundEffects';
import { swarmApi } from '../services/apiService';
import { useSwarm } from '../context/SwarmContext';
import LoadingScreen from './LoadingScreen/LoadingScreen';
import DynamicLoadBalancing from './DynamicLoadBalancing/DynamicLoadBalancing';
import DashboardBeeInfo from './DashboardBeeInfo';
import EnergyConsumptionOverview from './EnergyConsumptionOverview/EnergyConsumptionOverview';
import EnergyPredictions from './EnergyPredictions/EnergyPredictions';
import geminiService from '../services/geminiService';

function Dashboard() {
  const [selectedState, setSelectedState] = useState(null);
  const [loadBalancingData, setLoadBalancingData] = useState(null);
  const [stateData, setStateData] = useState(null);
  const { swarmState, dispatch } = useSwarm();
  const [isLoading, setIsLoading] = useState(true);
  const [loadBalancingError, setLoadBalancingError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchLoadBalancingData = async () => {
      try {
        // Create real-time grid data
        const currentTime = new Date();
        const gridData = {
          timestamp: currentTime.toISOString(),
          regions: ['North', 'South', 'East', 'West', 'Central'],
          currentLoads: {
            North: 75 + Math.random() * 10,
            South: 60 + Math.random() * 15,
            East: 85 + Math.random() * 5,
            West: 45 + Math.random() * 20,
            Central: 65 + Math.random() * 15
          },
          renewableCapacity: {
            North: { solar: 40, wind: 30 },
            South: { solar: 55, wind: 15 },
            East: { solar: 35, wind: 40 },
            West: { solar: 60, wind: 25 },
            Central: { solar: 45, wind: 35 }
          },
          peakDemand: {
            North: 90,
            South: 80,
            East: 95,
            West: 70,
            Central: 85
          },
          gridStability: {
            North: 95,
            South: 92,
            East: 88,
            West: 94,
            Central: 91
          },
          weatherConditions: {
            North: 'Sunny',
            South: 'Cloudy',
            East: 'Rainy',
            West: 'Windy',
            Central: 'Partly Cloudy'
          }
        };

        // Get predictions from Gemini API
        const predictions = await geminiService.predictLoadBalancing(gridData);
        if (Array.isArray(predictions) && predictions.length > 0) {
          setLoadBalancingData(predictions.map(region => ({
            ...region,
            currentLoad: region.currentLoad || gridData.currentLoads[region.region] || 0,
            predictedLoad: region.predictedLoad || 0,
            carbonImpact: region.carbonImpact || 0,
            renewableUtilization: region.renewableUtilization || 0,
            gridStability: region.gridStability || gridData.gridStability[region.region] || 0,
            weather: gridData.weatherConditions[region.region] || 'Unknown'
          })));
          setLoadBalancingError(null);
        } else {
          throw new Error('Invalid predictions data received from API');
        }
      } catch (error) {
        console.error('Error fetching load balancing data:', error);
        setLoadBalancingError(error.message);
      }
    };

    fetchLoadBalancingData();
    const interval = setInterval(fetchLoadBalancingData, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const handleStateSelect = (stateName, data) => {
    setSelectedState(stateName);
    setStateData(data);
    
    // Generate consumption data for overview
    const consumptionData = {
      total: data.energyConsumption,
      renewable: (data.energyConsumption * data.renewableShare) / 100,
      peak: data.peakLoad,
      current: data.energyConsumption * (0.8 + Math.random() * 0.4)
    };

    // Update state data with generated data
    setStateData({
      ...data,
      consumptionData
    });
  };

  const getSeason = () => {
    const date = new Date();
    const month = date.getMonth();
    if (month >= 3 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer';
    if (month >= 9 && month <= 11) return 'Autumn';
    return 'Winter';
  };

  if (isLoading) {
    return <LoadingScreen text="Loading Dashboard Data..." />;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <BeeTrail />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* AI-Driven Energy Predictions - Full Width at Top */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  background: 'rgba(26, 26, 26, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 183, 77, 0.2)',
                  mb: 3,
                }}
              >
                <EnergyPredictions selectedState={selectedState} data={stateData} />
              </Paper>
            </Grid>

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
                  Smart Grid Management Dashboard
                </Typography>
                <DashboardBeeInfo />
              </Paper>
            </Grid>

            {/* Main Content Area */}
            <Grid item xs={12} container spacing={3}>
              {/* Left Column - Map and Load Balancing */}
              <Grid item xs={12} md={5} container spacing={3}>
                {/* Map Section */}
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      background: 'rgba(26, 26, 26, 0.95)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 183, 77, 0.2)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minHeight: 400,
                    }}
                  >
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                      <IndiaMap onStateSelect={handleStateSelect} />
                    </Box>
                  </Paper>
                </Grid>

                {/* Dynamic Load Balancing */}
                <Grid item xs={12}>
                  <DynamicLoadBalancing data={loadBalancingData} error={loadBalancingError} />
                </Grid>
              </Grid>

              {/* Right Column - Energy Overview and Historical Data */}
              <Grid item xs={12} md={7} container spacing={3}>
                {/* Energy Overview */}
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
                    <Typography variant="h6" sx={{ color: '#FFD180', mb: 2 }}>
                      Energy Overview {selectedState ? `- ${selectedState}` : ''}
                    </Typography>
                    <EnergyConsumptionOverview data={stateData?.consumptionData} />
                  </Paper>
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
                      height: '100%',
                    }}
                  >
                    <Typography variant="h6" sx={{ color: '#FFD180', mb: 2 }}>
                      Historical Data
                    </Typography>
                    <HistoricalData data={stateData} />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </motion.div>
    </AnimatePresence>
  );
}

export default Dashboard;
