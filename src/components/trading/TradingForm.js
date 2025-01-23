import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Slider,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const FormContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(26, 26, 26, 0.95)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  border: '1px solid rgba(255, 183, 77, 0.2)',
  backdropFilter: 'blur(10px)',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 4px 25px rgba(255, 183, 77, 0.15)',
  },
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  flex: 1,
  color: '#FFD180',
  borderColor: 'rgba(255, 183, 77, 0.3)',
  '&.Mui-selected': {
    backgroundColor: props => props.value === 'buy' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
    color: '#FFB74D',
    '&:hover': {
      backgroundColor: props => props.value === 'buy' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
    },
  },
  '&:hover': {
    backgroundColor: props => props.value === 'buy' 
      ? 'rgba(76, 175, 80, 0.08)' 
      : 'rgba(244, 67, 54, 0.08)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    color: '#FFD180',
    '& fieldset': {
      borderColor: 'rgba(255, 183, 77, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 183, 77, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFB74D',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 183, 77, 0.7)',
    '&.Mui-focused': {
      color: '#FFB74D',
    },
  },
  '& .MuiInputAdornment-root': {
    color: 'rgba(255, 183, 77, 0.7)',
  },
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: '#FFB74D',
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0 0 0 8px rgba(255, 183, 77, 0.16)',
    },
  },
  '& .MuiSlider-rail': {
    opacity: 0.3,
  },
}));

const ActionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'orderType'
})(({ orderType }) => ({
  marginTop: 16,
  backgroundColor: orderType === 'buy' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
  color: orderType === 'buy' ? '#4CAF50' : '#FF5252',
  border: `1px solid ${orderType === 'buy' ? '#4CAF50' : '#FF5252'}`,
  padding: '12px',
  '&:hover': {
    backgroundColor: orderType === 'buy' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
  },
}));

const TradingForm = ({ onSubmit }) => {
  const [orderType, setOrderType] = useState('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState(0);

  const handleOrderTypeChange = (event, newType) => {
    if (newType !== null) {
      setOrderType(newType);
    }
  };

  const handleAmountChange = (event) => {
    const newAmount = event.target.value;
    setAmount(newAmount);
    setTotal(Number(newAmount) * Number(price));
  };

  const handlePriceChange = (event) => {
    const newPrice = event.target.value;
    setPrice(newPrice);
    setTotal(Number(amount) * Number(newPrice));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      type: orderType,
      amount: Number(amount),
      price: Number(price),
      total,
    });
  };

  return (
    <FormContainer>
      <Typography variant="h6" sx={{ 
        color: '#FFB74D',
        fontWeight: 600,
        mb: 3,
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      }}>
        Place Order
      </Typography>

      <ToggleButtonGroup
        value={orderType}
        exclusive
        onChange={handleOrderTypeChange}
        fullWidth
        sx={{ mb: 3 }}
      >
        <StyledToggleButton value="buy">Buy Energy</StyledToggleButton>
        <StyledToggleButton value="sell">Sell Energy</StyledToggleButton>
      </ToggleButtonGroup>

      <Box component="form" onSubmit={handleSubmit}>
        <StyledTextField
          fullWidth
          label="Amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">kWh</InputAdornment>,
          }}
          sx={{ mb: 2 }}
        />

        <StyledTextField
          fullWidth
          label="Price per kWh"
          type="number"
          value={price}
          onChange={handlePriceChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">Credits</InputAdornment>,
          }}
          sx={{ mb: 2 }}
        />

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 183, 77, 0.7)', mb: 1 }}>
            Price Range
          </Typography>
          <StyledSlider
            value={Number(price)}
            onChange={(e, value) => setPrice(value.toString())}
            min={0}
            max={20}
            step={0.1}
            valueLabelDisplay="auto"
          />
        </Box>

        <Typography variant="h6" sx={{ color: '#FFB74D', mb: 2 }}>
          Total: {total.toFixed(2)} Credits
        </Typography>

        <ActionButton
          fullWidth
          variant="contained"
          type="submit"
          orderType={orderType}
        >
          {orderType === 'buy' ? 'Buy Energy' : 'Sell Energy'}
        </ActionButton>
      </Box>
    </FormContainer>
  );
};

export default TradingForm;
