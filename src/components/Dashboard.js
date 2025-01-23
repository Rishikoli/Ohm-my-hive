import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import IndiaMap from './IndiaMap/IndiaMap';
import LoadManagement from './LoadManagement/LoadManagement';
import HistoricalData from './HistoricalData/HistoricalData';
import BeeTrail from './BeeTrail';
import { soundManager } from './SoundEffects';
import { swarmApi } from '../services/apiService';
import { useSwarm } from '../context/SwarmContext';
import LoadingScreen from './LoadingScreen/LoadingScreen';
import EnergyConsumptionOverview from './EnergyConsumptionOverview/EnergyConsumptionOverview';
import DashboardBeeInfo from './DashboardBeeInfo';
import EnergyPredictions from './EnergyPredictions/EnergyPredictions';
import '../styles/global.css';

function Dashboard() {
  const [selectedState, setSelectedState] = useState(null);
  const [stateData, setStateData] = useState(null);
  const { swarmState, dispatch } = useSwarm();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
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
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BeeTrail />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
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
                  Energy Management Dashboard
                </Typography>
                <DashboardBeeInfo />
              </Paper>
            </Grid>

            {/* Map and Overview Section */}
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  p: 2,
                  background: 'rgba(26, 26, 26, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 183, 77, 0.2)',
                  minHeight: 400,
                }}
              >
                <IndiaMap onStateSelect={handleStateSelect} />
              </Paper>
            </Grid>

            {/* Energy Overview */}
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  background: 'rgba(26, 26, 26, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 183, 77, 0.2)',
                  minHeight: 400,
                }}
              >
                <Typography variant="h6" sx={{ color: '#FFD180', mb: 2 }}>
                  Energy Overview {selectedState ? `- ${selectedState}` : ''}
                </Typography>
                <EnergyConsumptionOverview data={stateData?.consumptionData} />
              </Paper>
            </Grid>

            {/* Load Management */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  background: 'rgba(26, 26, 26, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 183, 77, 0.2)',
                  minHeight: 400,
                }}
              >
                <LoadManagement data={stateData} />
              </Paper>
            </Grid>

            {/* Historical Data */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  background: 'rgba(26, 26, 26, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 183, 77, 0.2)',
                  minHeight: 400,
                }}
              >
                <Typography variant="h6" sx={{ color: '#FFD180', mb: 2 }}>
                  Historical Data
                </Typography>
                <HistoricalData data={stateData} />
              </Paper>
            </Grid>

            {/* AI Predictions */}
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
                  AI Energy Predictions
                </Typography>
                <EnergyPredictions 
                  stateData={stateData} 
                  historicalData={{
                    averageConsumption: stateData?.consumptionData?.total || 0,
                    season: getSeason(),
                    industrialIndex: 0.8
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </motion.div>
    </AnimatePresence>
  );
}

export default Dashboard;
