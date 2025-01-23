import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

const EnergyConsumptionOverview = ({ data }) => {
  if (!data) {
    return <div style={{ color: '#FFD180' }}>Select a state to view consumption data</div>;
  }

  const renewablePercentage = (data.renewable / data.total) * 100;
  const currentPercentage = (data.current / data.peak) * 100;

  const MetricRow = ({ label, value, total, unit }) => (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" sx={{ color: '#FFD180' }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ color: '#FFD180' }}>
          {value.toLocaleString()} {unit}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={(value / total) * 100}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(255, 183, 77, 0.2)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#FFA500',
            borderRadius: 4,
          },
        }}
      />
    </Box>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <MetricRow
        label="Current Consumption"
        value={data.current}
        total={data.peak}
        unit="MW"
      />
      <MetricRow
        label="Renewable Energy"
        value={data.renewable}
        total={data.total}
        unit="MW"
      />
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ color: '#FFD180', mb: 1 }}>
          Peak Load: {data.peak.toLocaleString()} MW
        </Typography>
        <Typography variant="body2" sx={{ color: '#FFD180' }}>
          Total Consumption: {data.total.toLocaleString()} MW
        </Typography>
      </Box>
    </Box>
  );
};

export default EnergyConsumptionOverview;
