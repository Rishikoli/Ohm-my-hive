import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Chip,
  IconButton,
  Tooltip,
  TablePagination
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTradingContext } from '../../context/TradingContext';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const HistoryContainer = styled(Paper)(({ theme }) => ({
  elevation: 0,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(26, 26, 26, 0.98)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 183, 77, 0.3)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
  overflow: 'hidden',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
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
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: 'rgba(255, 183, 77, 0.9)',
  borderBottom: '2px solid rgba(255, 183, 77, 0.3)',
  fontWeight: 600,
  fontFamily: "'Rajdhani', sans-serif",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'rgba(255, 183, 77, 0.1)',
  },
}));

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'status'
})(({ status }) => ({
  backgroundColor: status === 'completed' 
    ? 'rgba(76, 175, 80, 0.1)' 
    : status === 'pending'
    ? 'rgba(255, 183, 77, 0.1)'
    : 'rgba(244, 67, 54, 0.1)',
  color: status === 'completed'
    ? '#4CAF50'
    : status === 'pending'
    ? '#FFB74D'
    : '#F44336',
  border: `1px solid ${
    status === 'completed'
      ? '#4CAF50'
      : status === 'pending'
      ? '#FFB74D'
      : '#F44336'
  }`,
  fontWeight: 500,
  fontSize: '0.75rem',
  '& .MuiChip-label': {
    padding: '0 8px',
  }
}));

const TransactionHistory = () => {
  const { userProfile } = useTradingContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatAmount = (amount) => `${amount.toFixed(2)} kWh`;
  const formatPrice = (amount, price) => `${(amount * price).toFixed(2)} Credits`;

  return (
    <HistoryContainer>
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(255, 183, 77, 0.2)' }}>
        <Typography variant="h6" sx={{ 
          color: '#FFB74D',
          fontWeight: 600,
          fontFamily: "'Orbitron', sans-serif",
        }}>
          Transaction History
        </Typography>
      </Box>

      <StyledTableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Transaction ID</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Total Price</StyledTableCell>
              <StyledTableCell align="right">Rate</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="center">Details</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(userProfile.tradingHistory || [])
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction) => (
                <StyledTableRow key={transaction.timestamp}>
                  <TableCell sx={{ 
                    borderBottom: '1px solid rgba(255, 183, 77, 0.2)',
                    color: '#FFD180',
                    fontFamily: "'Rajdhani', sans-serif",
                  }}>
                    {transaction.timestamp.substring(0, 8)}
                  </TableCell>
                  <TableCell sx={{ 
                    borderBottom: '1px solid rgba(255, 183, 77, 0.2)',
                    color: '#FFD180',
                    fontFamily: "'Rajdhani', sans-serif",
                  }}>
                    {formatDate(transaction.timestamp)}
                  </TableCell>
                  <TableCell sx={{ 
                    borderBottom: '1px solid rgba(255, 183, 77, 0.2)',
                    color: transaction.type === 'buy' ? '#4CAF50' : '#FF5252',
                    fontWeight: 600,
                    fontFamily: "'Rajdhani', sans-serif",
                  }}>
                    {transaction.type === 'buy' ? 'Buy' : 'Sell'}
                  </TableCell>
                  <TableCell align="right" sx={{ 
                    borderBottom: '1px solid rgba(255, 183, 77, 0.2)',
                    color: '#FFD180',
                    fontFamily: 'monospace',
                  }}>
                    {formatAmount(transaction.amount)}
                  </TableCell>
                  <TableCell align="right" sx={{ 
                    borderBottom: '1px solid rgba(255, 183, 77, 0.2)',
                    color: '#FFD180',
                    fontFamily: 'monospace',
                  }}>
                    {formatPrice(transaction.amount, transaction.price)}
                  </TableCell>
                  <TableCell align="right" sx={{ 
                    borderBottom: '1px solid rgba(255, 183, 77, 0.2)',
                    color: '#FFD180',
                    fontFamily: 'monospace',
                  }}>
                    {`${transaction.price.toFixed(2)} Credits/kWh`}
                  </TableCell>
                  <TableCell sx={{ 
                    borderBottom: '1px solid rgba(255, 183, 77, 0.2)',
                    color: '#FFD180',
                    fontFamily: "'Rajdhani', sans-serif",
                  }}>
                    <StatusChip 
                      label={transaction.status} 
                      status={transaction.status}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ 
                    borderBottom: '1px solid rgba(255, 183, 77, 0.2)',
                    color: '#FFD180',
                    fontFamily: "'Rajdhani', sans-serif",
                  }}>
                    <Tooltip 
                      title={
                        <Box sx={{ p: 1 }}>
                          <Typography variant="subtitle2" sx={{ color: '#FFD180', mb: 1 }}>
                            Contract Terms
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#FFD180', opacity: 0.7 }}>
                            Delivery: {transaction.contractTerms?.deliveryPeriod || '24h'}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#FFD180', opacity: 0.7 }}>
                            Energy Type: {transaction.contractTerms?.energyType || 'Solar'}
                          </Typography>
                        </Box>
                      }
                      arrow
                    >
                      <IconButton size="small" sx={{ 
                        color: '#FFD180',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 183, 77, 0.1)',
                        },
                      }}>
                        <InfoOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={userProfile.tradingHistory?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            color: '#FFD180',
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'rgba(26, 26, 26, 0.98)',
            borderTop: '1px solid rgba(255, 183, 77, 0.2)',
            '.MuiTablePagination-select': {
              color: '#FFD180',
            },
            '.MuiTablePagination-selectIcon': {
              color: '#FFD180',
            },
            '.MuiTablePagination-displayedRows': {
              color: '#FFD180',
            },
            '.MuiTablePagination-actions': {
              color: '#FFD180',
              button: {
                color: '#FFD180',
                '&.Mui-disabled': {
                  color: 'rgba(255, 209, 128, 0.3)',
                },
              },
            },
          }}
        />
      </StyledTableContainer>
    </HistoryContainer>
  );
};

export default TransactionHistory;
