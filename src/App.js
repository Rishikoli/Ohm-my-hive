import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { SwarmProvider } from './context/SwarmContext';
import { TradingProvider } from './context/TradingContext';
import { CarbonProvider } from './context/CarbonContext';
import './styles/App.css';
import './styles/cursor.css';
import Trading from './pages/Trading';
import WeatherImpact from './pages/WeatherImpact';
import CarbonFootprint from './pages/CarbonFootprint';
import ClimateImpact from './pages/ClimateImpact';
import theme from './theme';
import Chatbot from './components/Chatbot/Chatbot';

function App() {
  return (
    <CarbonProvider>
      <div className="App">
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SwarmProvider>
              <TradingProvider>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  minHeight: '100vh',
                  bgcolor: 'background.default'
                }}>
                  <Navbar 
                    sx={{ 
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      zIndex: (theme) => theme.zIndex.drawer + 1
                    }} 
                  />
                  <Box
                    component="main"
                    sx={{
                      flexGrow: 1,
                      position: 'relative',
                      zIndex: 1,
                      paddingTop: '64px',
                      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
                      minHeight: '100vh',
                    }}
                  >
                    <Routes>
                      <Route path="/" element={<Navigate to="/home" />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/trading" element={<Trading />} />
                      <Route path="/climate-impact" element={<ClimateImpact />} />
                    </Routes>
                  </Box>
                  <Chatbot />
                </Box>
              </TradingProvider>
            </SwarmProvider>
          </ThemeProvider>
        </Router>
      </div>
    </CarbonProvider>
  );
}

export default App;
