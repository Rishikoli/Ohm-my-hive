import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Grid, Typography, CircularProgress } from '@mui/material';
import { geminiService } from '../../services/geminiService';

const StateEnergyAnalytics = ({ stateData }) => {
  const [loadManagement, setLoadManagement] = useState(null);
  const [activeNodes, setActiveNodes] = useState(null);
  const [energyOverview, setEnergyOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const [loadData, nodesData, overviewData] = await Promise.all([
          geminiService.predictLoadManagement(stateData),
          geminiService.getActiveNodesAnalysis(stateData),
          geminiService.getStateEnergyOverview(stateData)
        ]);

        setLoadManagement(loadData);
        setActiveNodes(nodesData);
        setEnergyOverview(overviewData);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    if (stateData) {
      fetchAnalytics();
    }
  }, [stateData]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>

      {/* Energy Overview Card */}
      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%', background: 'rgba(0, 0, 0, 0.6)', borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" color="primary.light" gutterBottom>
              Energy Overview
            </Typography>
            {energyOverview && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Generation: {energyOverview.totalGeneration} MW
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Renewable Mix: {energyOverview.renewablePercentage}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Grid Stability: {energyOverview.gridStability}%
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StateEnergyAnalytics;
