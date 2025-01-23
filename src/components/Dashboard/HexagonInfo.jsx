import React from 'react';
import { Box, Typography } from '@mui/material';
import './HexagonInfo.css';

const HexagonInfo = () => {
  const infoItems = [
    {
      title: "Real-Time Monitoring",
      description: "Monitor energy consumption and production in real-time with advanced analytics",
      icon: "📊"
    },
    {
      title: "Smart Contracts",
      description: "Automated energy trading with secure blockchain-based smart contracts",
      icon: "🔗"
    },
    {
      title: "Load Balancing",
      description: "AI-powered load balancing for optimal energy distribution",
      icon: "⚡"
    },
    {
      title: "Predictive Analytics",
      description: "Machine learning algorithms for accurate demand forecasting",
      icon: "🔮"
    },
    {
      title: "P2P Trading",
      description: "Direct peer-to-peer energy trading with dynamic pricing",
      icon: "💱"
    },
    {
      title: "Grid Stability",
      description: "Advanced grid stability monitoring and management",
      icon: "🔋"
    }
  ];

  return (
    <Box className="hexagon-container">
      <Typography variant="h5" sx={{
        textAlign: 'center',
        mb: 4,
        color: '#FFB74D',
        fontFamily: "'Orbitron', sans-serif",
        fontWeight: 600,
      }}>
        Dashboard Features
      </Typography>
      <div className="hexagon-grid">
        {infoItems.map((item, index) => (
          <div className="hexagon-item" key={index}>
            <div className="hexagon-content">
              <div className="icon">{item.icon}</div>
              <Typography variant="h6" className="title">
                {item.title}
              </Typography>
              <Typography variant="body2" className="description">
                {item.description}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default HexagonInfo;
