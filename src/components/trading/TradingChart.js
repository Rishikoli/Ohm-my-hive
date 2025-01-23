  import React, { useEffect } from 'react';
import { Box, Typography, ButtonGroup, Button, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useLoading } from '../../context/LoadingContext';

const ChartContainer = styled(Box)(({ theme }) => ({
  background: '#FFFFFF',
  borderRadius: '12px',
  padding: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  border: '1px solid #FFE082',
  width: '100%',
  maxWidth: '100%',
  height: '355px',
  display: 'flex',
}));

const TimeButton = styled(Button)(({ theme }) => ({
  color: '#424242',
  borderColor: '#FFE082',
  padding: '4px 12px',
  '&.active': {
    backgroundColor: '#FFB300',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#FFA000',
    },
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 179, 0, 0.08)',
    borderColor: '#FFB300',
  },
}));

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          background: '#FFFFFF',
          border: '1px solid #FFE082',
          p: 1.5,
          borderRadius: 1,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="subtitle2" sx={{ color: '#424242' }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ color: '#FFB300', fontWeight: 600 }}>
          {payload[0].value.toFixed(2)} Credits/kWh
        </Typography>
      </Box>
    );
  }
  return null;
};

const TradingChart = ({ data, timeRange, onTimeRangeChange = () => {} }) => {
  const { setLoading, setProgress } = useLoading();

  useEffect(() => {
    setLoading(true);
    setProgress(0);
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => {
      clearInterval(interval);
      setLoading(false);
    };
  }, [timeRange]);

  return (
    <Box sx={{ width: '100%', maxWidth: '100%',height:'200px' }}>
      <ChartContainer sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ color: '#424242', fontWeight: 600 }}>
              Energy Price Chart
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>
              Last updated: {new Date().toLocaleTimeString()}
            </Typography>
          </Box>
          <ButtonGroup variant="outlined" size="small">
            {['1H', '24H', '7D', '1M', 'ALL'].map((range) => (
              <TimeButton
                key={range}
                className={timeRange === range ? 'active' : ''}
                onClick={() => onTimeRangeChange(range)}
              >
                {range}
              </TimeButton>
            ))}
          </ButtonGroup>
        </Box>
        
        <ResponsiveContainer width="100%" height={270}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="energyPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFB300" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#FFB300" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              stroke="#757575"
              tick={{ fill: '#757575' }}
            />
            <YAxis 
              stroke="#757575"
              tick={{ fill: '#757575' }}
              domain={['dataMin - 1', 'dataMax + 1']}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#FFE082" />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="price"
              stroke="#FFB300"
              fillOpacity={1}
              fill="url(#energyPrice)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
        <LinearProgress variant="determinate" value={useLoading().progress} />
      </ChartContainer>
    </Box>
  );
};

export default TradingChart;
