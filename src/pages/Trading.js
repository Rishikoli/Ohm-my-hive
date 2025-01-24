import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TradingChart from '../components/trading/TradingChart';
import OrderBook from '../components/trading/OrderBook';
import TradingForm from '../components/trading/TradingForm';
import TransactionHistory from '../components/trading/TransactionHistory';
import { useTradingContext } from '../context/TradingContext';

const Trading = () => {
  const { marketData, executeTransaction } = useTradingContext();
  const [timeRange, setTimeRange] = useState('24H');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const generateChartData = () => {
      const data = [];
      const now = new Date();
      for (let i = 24; i >= 0; i--) {
        const time = new Date(now - i * 3600000);
        data.push({
          time: time.toLocaleTimeString(),
          price: 10 + Math.random() * 5,
        });
      }
      setChartData(data);
    };

    generateChartData();
    const interval = setInterval(generateChartData, 60000);
    return () => clearInterval(interval);
  }, [timeRange]);

  const handleOrderSubmit = async (order) => {
    const result = await executeTransaction(order);
    if (result.success) {
      console.log('Transaction completed:', result.contractTerms);
    } else {
      console.error('Transaction failed:', result.error);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Background Pattern */}
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 183, 77, 0.1) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
            pointerEvents: 'none',
          }} />

          {/* Page Title */}
          <Box sx={{
            p: 3,
            background: 'linear-gradient(180deg, rgba(26, 26, 26, 0.98) 0%, rgba(26, 26, 26, 0.95) 100%)',
            borderBottom: '1px solid rgba(255, 183, 77, 0.3)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            flexShrink: 0,
          }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#FFB74D' }}>
              Swarm-Intelligent Market Analysis
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#FFF' }}>
              Harness the power of bee-inspired algorithms to analyze energy market trends and predict stock movements.
            </Typography>
          </Box>

          <Container maxWidth="xl" sx={{ 
            py: 3,
            flex: 1,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Grid container spacing={3}>
              {/* Left Column: Chart and Transaction History */}
              <Grid item xs={12} lg={8} sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '0 !important',
              }}>
                {/* Trading Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ flex: '0 0 auto', marginBottom: 24 }}
                >
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 3,
                      mb: 3,
                      height: '400px',
                      background: 'rgba(26, 26, 26, 0.98)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 183, 77, 0.3)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
                      flexShrink: 0,
                    }}
                  >
                    <TradingChart data={chartData} />
                  </Paper>
                </motion.div>

                {/* Transaction History */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{ flex: 1, minHeight: 0 }}
                >
                  <Paper
                    elevation={0}
                    sx={{ 
                      flex: 1,
                      minHeight: 0,
                      overflow: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(26, 26, 26, 0.98)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 183, 77, 0.3)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    <TransactionHistory />
                  </Paper>
                </motion.div>
              </Grid>

              {/* Right Column: Trading Form and Order Book */}
              <Grid item xs={12} lg={4} sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '0 !important',
              }}>
                {/* Trading Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  style={{ flex: '0 0 auto', marginBottom: 24 }}
                >
                  <Paper
                    elevation={0}
                    sx={{ 
                      p: 3,
                      mb: 3,
                      background: 'rgba(26, 26, 26, 0.98)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 183, 77, 0.3)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
                      flexShrink: 0,
                    }}
                  >
                    <TradingForm onSubmit={handleOrderSubmit} />
                  </Paper>
                </motion.div>

                {/* Order Book */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{ flex: 1, minHeight: 0 }}
                >
                  <Paper
                    elevation={0}
                    sx={{ 
                      flex: 1,
                      minHeight: 0,
                      overflow: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(26, 26, 26, 0.98)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 183, 77, 0.3)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    <OrderBook />
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper sx={{
                  p: 3,
                  background: 'rgba(26, 26, 26, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 183, 77, 0.2)',
                }}>
                  <Typography variant="h6" sx={{ color: '#FFB74D', mb: 2 }}>
                    Waggle Dance Analytics
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#FFF' }}>
                    Like bees performing waggle dances to communicate resource locations,
                    our AI identifies and communicates profitable market patterns through
                    advanced pattern recognition algorithms.
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper sx={{
                  p: 3,
                  background: 'rgba(26, 26, 26, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 183, 77, 0.2)',
                }}>
                  <Typography variant="h6" sx={{ color: '#FFB74D', mb: 2 }}>
                    Hive Mind Predictions
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#FFF' }}>
                    Utilizing collective intelligence inspired by bee colonies to aggregate
                    market signals and generate high-probability trading opportunities in
                    energy sector stocks.
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper sx={{
                  p: 3,
                  background: 'rgba(26, 26, 26, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 183, 77, 0.2)',
                }}>
                  <Typography variant="h6" sx={{ color: '#FFB74D', mb: 2 }}>
                    Foraging Strategy Optimization
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#FFF' }}>
                    Just as bees optimize their nectar collection routes, our system
                    continuously refines trading strategies based on historical performance
                    and market conditions.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#FFB74D' }}>
                Market Intelligence Features
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingUpIcon sx={{ color: '#FFB74D' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Pattern Recognition" 
                        secondary="Identify recurring market patterns using bee-inspired algorithms"
                        sx={{ 
                          '& .MuiListItemText-primary': { color: '#FFD180' },
                          '& .MuiListItemText-secondary': { color: '#FFF' }
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <TimelineIcon sx={{ color: '#FFB74D' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Trend Analysis" 
                        secondary="Track and analyze energy sector trends using swarm intelligence"
                        sx={{ 
                          '& .MuiListItemText-primary': { color: '#FFD180' },
                          '& .MuiListItemText-secondary': { color: '#FFF' }
                        }}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <ShowChartIcon sx={{ color: '#FFB74D' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Market Sentiment" 
                        secondary="Analyze market sentiment using collective intelligence"
                        sx={{ 
                          '& .MuiListItemText-primary': { color: '#FFD180' },
                          '& .MuiListItemText-secondary': { color: '#FFF' }
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AssessmentIcon sx={{ color: '#FFB74D' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Risk Assessment" 
                        secondary="Evaluate trading risks using bee-inspired decision models"
                        sx={{ 
                          '& .MuiListItemText-primary': { color: '#FFD180' },
                          '& .MuiListItemText-secondary': { color: '#FFF' }
                        }}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default Trading;
