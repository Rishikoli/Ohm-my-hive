import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTradingContext } from '../../context/TradingContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(26, 26, 26, 0.98)',
  borderRadius: '16px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgba(255, 183, 77, 0.3)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 4px 30px rgba(255, 183, 77, 0.15)',
  },
}));

const StyledTableContainer = styled(TableContainer)({
  flex: 1,
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 183, 77, 0.3)',
    borderRadius: '4px',
    '&:hover': {
      background: 'rgba(255, 183, 77, 0.5)',
    },
  },
});

const StyledTableCell = styled(TableCell)(({ align }) => ({
  color: '#FFD180',
  borderBottom: '1px solid rgba(255, 183, 77, 0.2)',
  padding: '12px 16px',
  fontSize: '0.875rem',
  fontFamily: "'Rajdhani', sans-serif",
  fontWeight: 500,
  textAlign: align || 'left',
}));

const StyledTableHeaderCell = styled(StyledTableCell)({
  color: 'rgba(255, 183, 77, 0.9)',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  fontSize: '0.75rem',
  borderBottom: '2px solid rgba(255, 183, 77, 0.3)',
});

const DepthBar = styled(Box)(({ type, depth }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  [type === 'buy' ? 'right' : 'left']: 0,
  width: `${depth}%`,
  background: type === 'buy' 
    ? 'rgba(76, 175, 80, 0.15)' 
    : 'rgba(244, 67, 54, 0.15)',
  zIndex: 0,
}));

const OrderCell = styled(TableCell)({
  position: 'relative',
  overflow: 'hidden',
});

const OrderBook = () => {
  const { orderBook } = useTradingContext();
  const buyOrders = orderBook?.bids || [];
  const sellOrders = orderBook?.asks || [];

  const maxBuyVolume = buyOrders.length ? Math.max(...buyOrders.map(order => order.amount)) : 0;
  const maxSellVolume = sellOrders.length ? Math.max(...sellOrders.map(order => order.amount)) : 0;
  const maxVolume = Math.max(maxBuyVolume, maxSellVolume);

  return (
    <Paper 
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(26, 26, 26, 0.98)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 183, 77, 0.3)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(255, 183, 77, 0.2)' }}>
        <Typography variant="h6" sx={{ 
          color: '#FFB74D',
          fontWeight: 600,
          fontFamily: "'Orbitron', sans-serif",
        }}>
          Order Book
        </Typography>
      </Box>

      <TableContainer sx={{ 
        flex: 1,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255, 183, 77, 0.3)',
          borderRadius: '4px',
          '&:hover': {
            background: 'rgba(255, 183, 77, 0.5)',
          },
        },
      }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                color: 'rgba(255, 183, 77, 0.9)',
                borderBottom: '2px solid rgba(255, 183, 77, 0.3)',
                fontWeight: 600,
                fontFamily: "'Rajdhani', sans-serif",
              }}>Price</TableCell>
              <TableCell align="right" sx={{ 
                color: 'rgba(255, 183, 77, 0.9)',
                borderBottom: '2px solid rgba(255, 183, 77, 0.3)',
                fontWeight: 600,
                fontFamily: "'Rajdhani', sans-serif",
              }}>Amount</TableCell>
              <TableCell align="right" sx={{ 
                color: 'rgba(255, 183, 77, 0.9)',
                borderBottom: '2px solid rgba(255, 183, 77, 0.3)',
                fontWeight: 600,
                fontFamily: "'Rajdhani', sans-serif",
              }}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Sell Orders */}
            {sellOrders.map((order, index) => (
              <TableRow
                key={`sell-${index}`}
                sx={{ 
                  transition: 'background-color 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  },
                }}
              >
                <OrderCell sx={{ 
                  color: '#FF5252',
                  fontWeight: 600,
                  borderBottom: '1px solid rgba(255, 183, 77, 0.2)',
                  fontFamily: "'Rajdhani', sans-serif",
                }}>
                  <DepthBar 
                    type="sell" 
                    depth={(order.amount / maxVolume) * 100} 
                  />
                  {order.price.toFixed(2)}
                </OrderCell>
                <OrderCell align="right" sx={{ 
                  borderBottom: '1px solid rgba(255, 183, 77, 0.2)',
                  color: '#FFD180',
                  fontFamily: 'monospace',
                }}>
                  <DepthBar 
                    type="sell" 
                    depth={(order.amount / maxVolume) * 100} 
                  />
                  {order.amount.toFixed(2)}
                </OrderCell>
                <OrderCell align="right" sx={{ 
                  borderBottom: '1px solid rgba(255, 183, 77, 0.2)',
                  color: '#FFD180',
                  fontFamily: 'monospace',
                }}>
                  <DepthBar 
                    type="sell" 
                    depth={(order.amount / maxVolume) * 100} 
                  />
                  {(order.price * order.amount).toFixed(2)}
                </OrderCell>
              </TableRow>
            ))}

            {/* Spread */}
            <TableRow>
              <TableCell colSpan={3} align="center" sx={{ 
                py: 2,
                backgroundColor: 'rgba(26, 26, 26, 0.98)',
                borderTop: '1px solid rgba(255, 183, 77, 0.2)',
                borderBottom: '1px solid rgba(255, 183, 77, 0.2)',
              }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255, 183, 77, 0.9)',
                    fontWeight: 600,
                    fontFamily: "'Rajdhani', sans-serif",
                  }}
                >
                  Spread: {((sellOrders[0]?.price || 0) - (buyOrders[0]?.price || 0)).toFixed(2)} Credits
                </Typography>
              </TableCell>
            </TableRow>

            {/* Buy Orders */}
            {buyOrders.map((order, index) => (
              <TableRow
                key={`buy-${index}`}
                sx={{ 
                  transition: 'background-color 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  },
                }}
              >
                <OrderCell sx={{ 
                  color: '#4CAF50',
                  fontWeight: 600,
                  borderBottom: '1px solid rgba(255, 183, 77, 0.2)',
                  fontFamily: "'Rajdhani', sans-serif",
                }}>
                  <DepthBar 
                    type="buy" 
                    depth={(order.amount / maxVolume) * 100} 
                  />
                  {order.price.toFixed(2)}
                </OrderCell>
                <OrderCell align="right" sx={{ 
                  borderBottom: '1px solid rgba(255, 183, 77, 0.2)',
                  color: '#FFD180',
                  fontFamily: 'monospace',
                }}>
                  <DepthBar 
                    type="buy" 
                    depth={(order.amount / maxVolume) * 100} 
                  />
                  {order.amount.toFixed(2)}
                </OrderCell>
                <OrderCell align="right" sx={{ 
                  borderBottom: '1px solid rgba(255, 183, 77, 0.2)',
                  color: '#FFD180',
                  fontFamily: 'monospace',
                }}>
                  <DepthBar 
                    type="buy" 
                    depth={(order.amount / maxVolume) * 100} 
                  />
                  {(order.price * order.amount).toFixed(2)}
                </OrderCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default OrderBook;
