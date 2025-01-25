import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, CircularProgress, Box, TextField, Button, MenuItem, Chip } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { geminiService } from '../../services/geminiService';
import AnimatedBee from '../AnimatedBee';


const regions = ['North', 'South', 'East', 'West', 'Central'];

const getSentimentColor = (sentiment) => {
  switch (sentiment?.toLowerCase()) {
    case 'positive':
      return '#4CAF50';
    case 'negative':
      return '#f44336';
    case 'neutral':
      return '#FF9800';
    default:
      return '#FFB74D';
  }
};

const EnergyPredictions = ({ selectedState, data }) => {
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [error, setError] = useState(null);
  const [sentiment, setSentiment] = useState(null);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handlePredict = async () => {
    if (!selectedRegion) {
      setError('Please select a region');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const currentTime = new Date();
      const requestData = {
        region: selectedRegion,
        timestamp: currentTime.toISOString(),
        currentState: {
          temperature: 25 + Math.random() * 10,
          humidity: 50 + Math.random() * 30,
          weatherCondition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
          timeOfDay: currentTime.getHours(),
          dayOfWeek: currentTime.getDay(),
          isHoliday: false
        },
        historicalData: {
          averageLoad: 65 + Math.random() * 20,
          peakLoad: 85 + Math.random() * 15,
          renewableShare: 30 + Math.random() * 20,
          gridStability: 90 + Math.random() * 10
        },
        gridParameters: {
          capacity: 100,
          currentLoad: 70 + Math.random() * 15,
          maintenanceScheduled: false,
          renewableAvailability: {
            solar: 80 + Math.random() * 20,
            wind: 60 + Math.random() * 30
          }
        }
      };

      // Get predictions and sentiment analysis in parallel
      const [result, sentimentResult] = await Promise.all([
        geminiService.predictLoadBalancing({
          ...requestData,
          regions: [selectedRegion]
        }),
        geminiService.analyzeEnergySentiment({
          region: selectedRegion,
          currentLoad: requestData.gridParameters.currentLoad,
          gridStability: requestData.historicalData.gridStability,
          renewableShare: requestData.historicalData.renewableShare,
          peakHours: '14:00-16:00',
          weather: requestData.currentState.weatherCondition
        })
      ]);

      if (Array.isArray(result) && result.length > 0) {
        const hourlyPredictions = Array.from({ length: 24 }, (_, hour) => {
          const baseLoad = result[0].predictedLoad || 70;
          const timeMultiplier = hour >= 9 && hour <= 18 ? 1.2 : 0.8;
          return (baseLoad * timeMultiplier * (0.9 + Math.random() * 0.2)).toFixed(1);
        });

        setPredictions({
          hourlyPredictions,
          peakUsageTime: result[0].peakHours || '14:00-16:00',
          potentialSavings: result[0].potentialSavings || '15-20%',
          gridStabilityImpact: result[0].gridStabilityImpact || 'Moderate',
          confidenceScore: result[0].confidenceScore || 85,
          renewableUtilization: result[0].renewableUtilization || 40,
          carbonImpact: result[0].carbonImpact || 25
        });

        setSentiment(sentimentResult);
      } else {
        throw new Error('Invalid prediction data received');
      }
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setError('Failed to fetch predictions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const chartData = predictions?.hourlyPredictions?.map((value, index) => ({
    hour: `${index}:00`,
    consumption: parseFloat(value)
  })) || [];

  return (
    <Box sx={{ width: '100%' }}>
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
        <Typography variant="h5" gutterBottom sx={{ color: '#FFB74D', mb: 3 }}>
          AI-Driven Energy Predictions
        </Typography>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          <TextField
            select
            label="Select Region"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            sx={{ minWidth: '200px' }}
          >
            {regions.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            onClick={handlePredict}
            disabled={loading}
            sx={{
              height: '56px',
              bgcolor: 'rgba(255, 183, 77, 0.2)',
              color: '#FFFFFF',
              '&:hover': {
                bgcolor: 'rgba(255, 183, 77, 0.3)',
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Predict'}
          </Button>
          <AnimatedBee />
        </div>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Grid>
        </Grid>

        {predictions && sentiment && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  p: 3,
                  background: 'rgba(26, 26, 26, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 183, 77, 0.2)',
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ color: '#FFB74D' }}>
                  24-Hour Load Prediction - {selectedRegion} Region
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 183, 77, 0.1)" />
                    <XAxis
                      dataKey="hour"
                      stroke="#FFB74D"
                      tick={{ fill: '#FFB74D' }}
                    />
                    <YAxis
                      stroke="#FFB74D"
                      tick={{ fill: '#FFB74D' }}
                      label={{
                        value: 'Load (%)',
                        angle: -90,
                        position: 'insideLeft',
                        fill: '#FFB74D'
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(26, 26, 26, 0.95)',
                        border: '1px solid #FFB74D',
                        color: '#FFB74D'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="consumption"
                      stroke="#FFB74D"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  background: 'rgba(26, 26, 26, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 183, 77, 0.2)',
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ color: '#FFB74D' }}>
                  Prediction Insights
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" sx={{ color: '#FFB74D', mb: 1 }}>
                    Peak Usage Time: {predictions.peakUsageTime}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#FFB74D', mb: 1 }}>
                    Potential Savings: {predictions.potentialSavings}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#FFB74D', mb: 1 }}>
                    Grid Stability Impact: {predictions.gridStabilityImpact}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#FFB74D', mb: 1 }}>
                    Renewable Utilization: {predictions.renewableUtilization}%
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#FFB74D', mb: 1 }}>
                    Carbon Reduction: {predictions.carbonImpact} tons
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#FFB74D', mb: 1 }}>
                    Confidence Score: {predictions.confidenceScore}%
                  </Typography>
                </Box>
              </Paper>
            </Grid>

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
                <Typography variant="h6" gutterBottom sx={{ color: '#FFB74D' }}>
                  Energy Sentiment Analysis - {selectedRegion} Region
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Chip
                      label={`Overall Sentiment: ${sentiment.overallSentiment}`}
                      sx={{
                        bgcolor: getSentimentColor(sentiment.overallSentiment),
                        color: '#fff',
                        mr: 1,
                        mb: 1,
                      }}
                    />
                    <Chip
                      label={`Sentiment Score: ${sentiment.sentimentScore}%`}
                      sx={{ bgcolor: 'rgba(255, 183, 77, 0.2)', color: '#FFB74D', mr: 1, mb: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" sx={{ color: '#FFB74D', mb: 1 }}>
                      Efficiency
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                      Score: {sentiment.efficiency.score}%
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                      Trend: {sentiment.efficiency.trend}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                      {sentiment.efficiency.analysis}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" sx={{ color: '#FFB74D', mb: 1 }}>
                      Reliability
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                      Score: {sentiment.reliability.score}%
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                      Trend: {sentiment.reliability.trend}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                      {sentiment.reliability.analysis}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" sx={{ color: '#FFB74D', mb: 1 }}>
                      Sustainability
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                      Score: {sentiment.sustainability.score}%
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                      Trend: {sentiment.sustainability.trend}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                      {sentiment.sustainability.analysis}
                    </Typography>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: '#FFB74D', mb: 1 }}>
                    Key Insights
                  </Typography>
                  {sentiment.keyInsights.map((insight, index) => (
                    <Typography key={index} variant="body2" sx={{ color: '#fff', mb: 0.5 }}>
                      • {insight}
                    </Typography>
                  ))}
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: '#FFB74D', mb: 1 }}>
                    Recommendations
                  </Typography>
                  {sentiment.recommendations.map((recommendation, index) => (
                    <Typography key={index} variant="body2" sx={{ color: '#fff', mb: 0.5 }}>
                      • {recommendation}
                    </Typography>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default EnergyPredictions;
