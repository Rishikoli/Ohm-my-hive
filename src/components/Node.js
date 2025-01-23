import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Box, Chip, Alert, CircularProgress } from '@mui/material';
import PowerIcon from '@mui/icons-material/Power';
import { styled } from '@mui/material/styles';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: 'rgba(26, 26, 26, 0.95)',
  borderRadius: '8px',
  margin: '8px 0',
  border: '1px solid rgba(255, 183, 77, 0.2)',
  '&:hover': {
    backgroundColor: 'rgba(26, 26, 26, 0.98)',
    border: '1px solid rgba(255, 183, 77, 0.3)',
  }
}));

const StyledChip = styled(Chip)(({ status }) => ({
  backgroundColor: status === 'active' 
    ? 'rgba(76, 175, 80, 0.1)' 
    : 'rgba(244, 67, 54, 0.1)',
  color: status === 'active' ? '#4CAF50' : '#F44336',
  border: `1px solid ${status === 'active' ? '#4CAF50' : '#F44336'}`,
  '& .MuiChip-label': {
    fontWeight: 500,
  }
}));

// Mock data for demonstration
const mockNodes = [
  {
    id: 'node-1',
    name: 'Solar Node Alpha',
    status: 'active',
    energyOutput: '2.5 kW',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'node-2',
    name: 'Wind Node Beta',
    status: 'active',
    energyOutput: '1.8 kW',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'node-3',
    name: 'Storage Node Gamma',
    status: 'inactive',
    energyOutput: '0 kW',
    lastUpdated: new Date().toISOString()
  }
];

function Node() {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNodes(mockNodes);
      } catch (error) {
        console.error('Error fetching node data:', error);
        setError(error.message || 'Failed to fetch node data');
      } finally {
        setLoading(false);
      }
    };

    fetchNodes();
    const interval = setInterval(fetchNodes, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%" sx={{ color: '#FFD180' }}>
        <CircularProgress sx={{ color: 'inherit' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        color: '#FF5252',
        border: '1px solid #FF5252',
        '& .MuiAlert-icon': {
          color: '#FF5252'
        }
      }}>
        {error}
      </Alert>
    );
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'transparent' }}>
      {nodes.map((node) => (
        <StyledListItem key={node.id}>
          <ListItemIcon sx={{ color: '#FFD180' }}>
            <PowerIcon />
          </ListItemIcon>
          <ListItemText
            primary={node.name}
            secondary={`Output: ${node.energyOutput}`}
            sx={{
              '& .MuiListItemText-primary': {
                color: '#FFD180',
                fontWeight: 600,
              },
              '& .MuiListItemText-secondary': {
                color: 'rgba(255, 209, 128, 0.7)',
              }
            }}
          />
          <StyledChip
            label={node.status}
            status={node.status}
            size="small"
          />
        </StyledListItem>
      ))}
    </List>
  );
}

export default Node;
