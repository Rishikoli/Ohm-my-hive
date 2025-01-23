import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Card, CardContent } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LightModeIcon from '@mui/icons-material/LightMode';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

// Sample weather impact data
const weatherData = [
  { month: 'Jan', temperature: 15, consumption: 1200, humidity: 65 },
  { month: 'Feb', temperature: 18, consumption: 1100, humidity: 60 },
  { month: 'Mar', temperature: 22, consumption: 1000, humidity: 55 },
  { month: 'Apr', temperature: 28, consumption: 1300, humidity: 45 },
  { month: 'May', temperature: 32, consumption: 1500, humidity: 40 },
  { month: 'Jun', temperature: 34, consumption: 1700, humidity: 60 },
  { month: 'Jul', temperature: 30, consumption: 1600, humidity: 75 },
  { month: 'Aug', temperature: 29, consumption: 1550, humidity: 80 },
  { month: 'Sep', temperature: 27, consumption: 1400, humidity: 70 },
  { month: 'Oct', temperature: 24, consumption: 1200, humidity: 65 },
  { month: 'Nov', temperature: 19, consumption: 1100, humidity: 60 },
  { month: 'Dec', temperature: 16, consumption: 1150, humidity: 65 }
];

const weatherTips = [
  {
    condition: 'High Temperature',
    icon: <LightModeIcon sx={{ color: '#FFB74D' }} />,
    tips: [
      'Use light-colored curtains to reflect sunlight',
      'Set AC temperature to 24°C for optimal efficiency',
      'Use ceiling fans along with AC to distribute cool air',
      'Schedule high-energy activities for cooler hours'
    ]
  },
  {
    condition: 'Low Temperature',
    icon: <AcUnitIcon sx={{ color: '#90CAF9' }} />,
    tips: [
      'Seal windows and doors to prevent heat loss',
      'Use natural sunlight for heating during day',
      'Set heaters to moderate temperature (20-22°C)',
      'Use heavy curtains at night to retain heat'
    ]
  },
  {
    condition: 'High Humidity',
    icon: <WaterDropIcon sx={{ color: '#81C784' }} />,
    tips: [
      'Use dehumidifiers to reduce AC load',
      'Ensure proper ventilation',
      'Run exhaust fans while cooking',
      'Consider using energy-efficient fans'
    ]
  },
  {
    condition: 'Optimal Conditions',
    icon: <DeviceThermostatIcon sx={{ color: '#FFB74D' }} />,
    tips: [
      'Use natural ventilation',
      'Minimize artificial lighting during day',
      'Schedule energy-intensive tasks',
      'Perform regular HVAC maintenance'
    ]
  }
];

const WeatherImpact = () => {
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 28,
    humidity: 65,
    condition: 'Partly Cloudy'
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Current Weather Impact */}
        <Grid item xs={12}>
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
              Weather Impact on Energy Usage
            </Typography>
            <Typography variant="body1" sx={{ color: '#fff', mb: 2 }}>
              Current conditions: {currentWeather.temperature}°C, {currentWeather.humidity}% humidity, {currentWeather.condition}
            </Typography>
          </Paper>
        </Grid>

        {/* Weather Impact Chart */}
        <Grid item xs={12} md={8}>
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
              Annual Weather Impact on Energy Consumption
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={weatherData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="month" stroke="#FFB74D" />
                <YAxis yAxisId="left" stroke="#FFB74D" />
                <YAxis yAxisId="right" orientation="right" stroke="#81C784" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(26, 26, 26, 0.95)',
                    border: '1px solid rgba(255, 183, 77, 0.3)',
                    borderRadius: '4px',
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="consumption"
                  name="Energy Consumption (kWh)"
                  stroke="#FFB74D"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="temperature"
                  name="Temperature (°C)"
                  stroke="#81C784"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Weather Tips */}
        <Grid item xs={12} md={4}>
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
              Energy Saving Tips by Weather
            </Typography>
            <Grid container spacing={2}>
              {weatherTips.map((tip, index) => (
                <Grid item xs={12} key={index}>
                  <Card
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 183, 77, 0.1)',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        {tip.icon}
                        <Typography variant="subtitle1" sx={{ color: '#FFB74D', ml: 1 }}>
                          {tip.condition}
                        </Typography>
                      </Box>
                      <Box component="ul" sx={{ color: '#fff', m: 0, pl: 2 }}>
                        {tip.tips.map((item, i) => (
                          <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WeatherImpact;
