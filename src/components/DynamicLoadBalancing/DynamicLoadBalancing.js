import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, List, ListItem, ListItemText, Chip, CircularProgress, Alert } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import NatureIcon from '@mui/icons-material/Nature';
import BoltIcon from '@mui/icons-material/Bolt';
import WarningIcon from '@mui/icons-material/Warning';
import geminiService from '../../services/geminiService';

const DynamicLoadBalancing = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [climateImpact, setClimateImpact] = useState({
    totalCarbonReduction: 0,
    renewableUtilization: 0,
    gridEfficiency: 0,
    sustainabilityScore: 0,
    recommendations: [],
    impactByRegion: []
  });

  const fetchRealTimeData = async () => {
    try {
      // Get real-time grid data from your energy monitoring system
      // This is a simulation - replace with actual API calls in production
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

      // Get load balancing predictions from Gemini API
      const predictions = await geminiService.predictLoadBalancing(gridData);
      
      if (Array.isArray(predictions) && predictions.length > 0) {
        setData(predictions.map(region => ({
          ...region,
          currentLoad: region.currentLoad || gridData.currentLoads[region.region] || 0,
          predictedLoad: region.predictedLoad || 0,
          carbonImpact: region.carbonImpact || 0,
          renewableUtilization: region.renewableUtilization || 0,
          gridStability: region.gridStability || gridData.gridStability[region.region] || 0,
          weather: gridData.weatherConditions[region.region] || 'Unknown'
        })));

        // Get climate impact analysis
        const evData = {
          chargingStations: 150,
          averageUtilization: 65,
          peakHours: ['18:00', '19:00', '20:00'],
          renewableShare: 45
        };
        
        const impact = await geminiService.getClimateImpactAnalysis(gridData, evData);
        if (impact) {
          setClimateImpact({
            totalCarbonReduction: impact.totalCarbonReduction || 0,
            renewableUtilization: impact.renewableUtilization || 0,
            gridEfficiency: impact.gridEfficiency || 0,
            sustainabilityScore: impact.sustainabilityScore || 0,
            recommendations: impact.recommendations || [],
            impactByRegion: impact.impactByRegion || []
          });
        }
      } else {
        throw new Error('Invalid predictions data received from API');
      }
      
      setError(null);
    } catch (error) {
      console.error('Error fetching real-time data:', error);
      setError(error.message || 'Failed to fetch real-time grid data');
      // Keep existing data if available
      if (!data.length) {
        setData([]);
        setClimateImpact({
          totalCarbonReduction: 0,
          renewableUtilization: 0,
          gridEfficiency: 0,
          sustainabilityScore: 0,
          recommendations: [],
          impactByRegion: []
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchRealTimeData();
      setLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  if (loading && !data.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          sx={{
            p: 2,
            height: '100%',
            background: 'rgba(26, 26, 26, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 183, 77, 0.2)',
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" sx={{ color: '#FFB74D' }}>
              AI-Driven Dynamic Load Balancing
            </Typography>
            {error && (
              <Chip
                icon={<WarningIcon />}
                label="Data sync error"
                color="error"
                size="small"
                sx={{ bgcolor: 'rgba(211, 47, 47, 0.1)' }}
              />
            )}
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {climateImpact && (
            <Box mb={3} p={2} sx={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
              <Typography variant="subtitle2" sx={{ color: '#4CAF50', mb: 1, display: 'flex', alignItems: 'center' }}>
                <NatureIcon sx={{ mr: 1 }} /> Climate Impact
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={2}>
                <Chip
                  icon={<NatureIcon />}
                  label={`${climateImpact.totalCarbonReduction.toFixed(1)} tons CO₂ reduced`}
                  sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', color: '#4CAF50' }}
                />
                <Chip
                  icon={<BoltIcon />}
                  label={`${climateImpact.renewableUtilization.toFixed(1)}% renewable`}
                  sx={{ bgcolor: 'rgba(255, 183, 77, 0.1)', color: '#FFB74D' }}
                />
              </Box>
            </Box>
          )}

          <List>
            {data.map((region, index) => (
              <motion.div
                key={region.region || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ListItem
                  sx={{
                    mb: 2,
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                          {region.region || 'Unknown'} Region
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#aaa' }}>
                          Weather: {region.weather}
                        </Typography>
                      </Box>
                      <Chip
                        label={region.recommendation || 'No recommendation'}
                        color={region.recommendation === 'Redistribute' ? 'warning' : 'success'}
                        size="small"
                      />
                    </Box>
                    <Box mt={1}>
                      <Box display="flex" alignItems="center" mb={0.5}>
                        <TrendingUpIcon sx={{ color: '#4CAF50', mr: 1, fontSize: 20 }} />
                        <Typography variant="body2" sx={{ color: '#ccc' }}>
                          Current Load: {(region.currentLoad || 0).toFixed(1)}%
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" mb={0.5}>
                        <TrendingDownIcon sx={{ color: '#FF9800', mr: 1, fontSize: 20 }} />
                        <Typography variant="body2" sx={{ color: '#ccc' }}>
                          Predicted Load: {(region.predictedLoad || 0).toFixed(1)}%
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <NatureIcon sx={{ color: '#4CAF50', mr: 1, fontSize: 20 }} />
                        <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                          Carbon Impact: -{(region.carbonImpact || 0).toFixed(1)} tons CO₂
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
              </motion.div>
            ))}
          </List>
        </Paper>
      </motion.div>
    </AnimatePresence>
  );
};

export default DynamicLoadBalancing;
