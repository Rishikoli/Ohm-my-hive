import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Box, Chip, LinearProgress, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import EvStationIcon from '@mui/icons-material/EvStation';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NatureIcon from '@mui/icons-material/Nature';
import BoltIcon from '@mui/icons-material/Bolt';
import BarChartIcon from '@mui/icons-material/BarChart';
import geminiService from '../../services/geminiService';

const EVChargingOptimization = ({ selectedState }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [climateImpact, setClimateImpact] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      setLoading(true);
      try {
        // Sample region data - replace with actual data in production
        const regionData = {
          state: selectedState || 'All India',
          chargingStations: {
            total: 150,
            types: {
              fast: 45,
              medium: 65,
              slow: 40
            }
          },
          historicalPatterns: {
            peakHours: ['18:00', '19:00', '20:00'],
            averageUtilization: 65,
            commonLocations: ['Delhi', 'Mumbai', 'Bangalore']
          },
          gridCapacity: {
            total: 1000,
            available: 400,
            renewable: 250
          }
        };

        // Get EV charging predictions
        const predictions = await geminiService.predictEVChargingPatterns(regionData);
        setData(predictions);

        // Get climate impact analysis
        const gridData = {
          capacity: 1000,
          currentLoad: 600,
          renewableShare: 45,
          stability: 95
        };
        
        const impact = await geminiService.getClimateImpactAnalysis(gridData, regionData);
        setClimateImpact(impact);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
    const interval = setInterval(fetchPredictions, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, [selectedState]);

  if (loading && !data.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        p: 3,
        background: 'rgba(26, 26, 26, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '10px',
        border: '1px solid rgba(255, 183, 77, 0.2)',
      }}
    >
      <Box display="flex" alignItems="center" mb={3}>
        <EvStationIcon sx={{ color: '#FFB74D', mr: 1 }} />
        <Typography variant="h6" sx={{ color: '#FFB74D' }}>
          EV Charging Pattern Optimization
          {selectedState && ` - ${selectedState}`}
        </Typography>
      </Box>

      {climateImpact && (
        <Box mb={3} p={2} sx={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
          <Typography variant="subtitle2" sx={{ color: '#4CAF50', mb: 1, display: 'flex', alignItems: 'center' }}>
            <NatureIcon sx={{ mr: 1 }} /> Environmental Impact
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box display="flex" flexWrap="wrap" gap={1}>
                <Chip
                  icon={<NatureIcon />}
                  label={`${climateImpact.totalCarbonReduction.toFixed(1)} tons CO₂ reduced`}
                  sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', color: '#4CAF50' }}
                />
                <Chip
                  icon={<BoltIcon />}
                  label={`${climateImpact.gridEfficiency.toFixed(1)}% grid efficiency`}
                  sx={{ bgcolor: 'rgba(255, 183, 77, 0.1)', color: '#FFB74D' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" flexWrap="wrap" gap={1}>
                <Chip
                  icon={<BarChartIcon />}
                  label={`${climateImpact.sustainabilityScore.toFixed(0)}/100 sustainability`}
                  sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', color: '#2196F3' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      <Grid container spacing={3}>
        {data.map((slot, index) => (
          <Grid item xs={12} md={3} key={slot.timeSlot}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Paper
                sx={{
                  p: 2,
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  <AccessTimeIcon sx={{ color: '#FFB74D', mr: 1 }} />
                  <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                    {slot.timeSlot}
                  </Typography>
                </Box>

                <Box mb={2}>
                  <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
                    Predicted Demand
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={slot.predictedDemand}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#FFB74D',
                      },
                    }}
                  />
                  <Typography variant="body2" sx={{ color: '#FFB74D', mt: 0.5 }}>
                    {slot.predictedDemand.toFixed(1)}%
                  </Typography>
                </Box>

                <Box mb={2}>
                  <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
                    Optimal Capacity
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={slot.optimalCapacity}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#4CAF50',
                      },
                    }}
                  />
                  <Typography variant="body2" sx={{ color: '#4CAF50', mt: 0.5 }}>
                    {slot.optimalCapacity.toFixed(1)}%
                  </Typography>
                </Box>

                <Box mb={2}>
                  <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
                    Carbon Reduction
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#4CAF50' }}>
                    {slot.carbonReduction.toFixed(1)} tons
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
                    Charging Hotspots
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {slot.hotspots.map((hotspot) => (
                      <Chip
                        key={hotspot}
                        label={hotspot}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(255, 183, 77, 0.2)',
                          color: '#FFB74D',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default EVChargingOptimization;
