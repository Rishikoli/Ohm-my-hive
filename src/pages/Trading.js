import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
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
            <Typography variant="h4" sx={{
              color: '#FFB74D',
              fontWeight: 700,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              fontFamily: "'Orbitron', sans-serif",
            }}>
              P2P Energy Trading
            </Typography>
            <Typography variant="subtitle1" sx={{
              color: 'rgba(255, 183, 77, 0.8)',
              mt: 1,
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '1.1rem',
              fontWeight: 500,
            }}>
              Trade energy directly with other users in real-time
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
          </Container>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default Trading;
