import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, CircularProgress, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { geminiService } from '../../services/geminiService';

const EnergyPredictions = ({ stateData, historicalData }) => {
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredictions = async () => {
      if (stateData && historicalData) {
        setLoading(true);
        try {
          const result = await geminiService.predictElectricityUsage(stateData, historicalData);
          setPredictions(result);
        } catch (error) {
          console.error('Error fetching predictions:', error);
        }
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [stateData, historicalData]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <CircularProgress />
      </Box>
    );
  }

  if (!predictions) {
    return null;
  }

  const chartData = predictions.hourlyPredictions.map((value, index) => ({
    hour: `${index}:00`,
    consumption: value
  }));

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 400,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
        border: '1px solid rgba(255, 183, 77, 0.2)',
        '&:hover': {
          borderColor: 'rgba(255, 183, 77, 0.4)',
          boxShadow: '0 4px 20px rgba(255, 183, 77, 0.2)',
        },
      }}
    >
      <Typography variant="h6" gutterBottom component="div" sx={{ color: '#FFB74D' }}>
        AI Energy Predictions
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="consumption"
                stroke="#FFB74D"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ color: '#FFB74D' }}>
              Peak Usage Time: {predictions.peakUsageTime}
            </Typography>
            <Typography variant="body1" sx={{ color: '#FFB74D', mt: 1 }}>
              Potential Savings: {predictions.potentialSavings}
            </Typography>
            <Typography variant="body1" sx={{ color: '#FFB74D', mt: 1 }}>
              Grid Stability Impact: {predictions.gridStabilityImpact}
            </Typography>
            <Typography variant="body1" sx={{ color: '#FFB74D', mt: 1 }}>
              Confidence Score: {predictions.confidenceScore}%
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EnergyPredictions;
