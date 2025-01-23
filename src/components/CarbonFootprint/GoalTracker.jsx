import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useCarbonContext } from '../../context/CarbonContext';

const GoalTracker = () => {
  const { goals, setGoal } = useCarbonContext();
  const [open, setOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    target: '',
    deadline: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    setGoal(Number(newGoal.target), newGoal.deadline);
    handleClose();
  };

  return (
    <Paper
      sx={{
        p: 3,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
        border: '1px solid rgba(255, 183, 77, 0.2)',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(255, 183, 77, 0.2)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#FFB74D' }}>
          Carbon Reduction Goal
        </Typography>
        <Button 
          variant="outlined" 
          onClick={handleOpen}
          sx={{
            color: '#FFB74D',
            borderColor: '#FFB74D',
            '&:hover': {
              borderColor: '#FFA726',
              backgroundColor: 'rgba(255, 183, 77, 0.1)'
            }
          }}
        >
          Set New Goal
        </Button>
      </Box>

      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={goals.progress}
          size={120}
          thickness={4}
          sx={{
            color: '#FFB74D',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" sx={{ color: '#FFB74D' }}>
            {Math.round(goals.progress)}%
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" sx={{ color: '#FFB74D' }}>
          Target: {goals.target} kg CO₂
        </Typography>
        {goals.deadline && (
          <Typography variant="body1" sx={{ color: '#FFB74D' }}>
            Deadline: {new Date(goals.deadline).toLocaleDateString()}
          </Typography>
        )}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: '#FFB74D', backgroundColor: 'rgba(26, 26, 26, 0.95)' }}>
          Set Carbon Reduction Goal
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: 'rgba(26, 26, 26, 0.95)' }}>
          <TextField
            autoFocus
            margin="dense"
            label="Target CO₂ Emissions (kg)"
            type="number"
            fullWidth
            value={newGoal.target}
            onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
            sx={{
              '& label': { color: '#FFB74D' },
              '& input': { color: '#FFB74D' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'rgba(255, 183, 77, 0.3)' },
                '&:hover fieldset': { borderColor: '#FFB74D' },
                '&.Mui-focused fieldset': { borderColor: '#FFB74D' },
              },
            }}
          />
          <TextField
            margin="dense"
            label="Target Date"
            type="date"
            fullWidth
            value={newGoal.deadline}
            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{
              '& label': { color: '#FFB74D' },
              '& input': { color: '#FFB74D' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'rgba(255, 183, 77, 0.3)' },
                '&:hover fieldset': { borderColor: '#FFB74D' },
                '&.Mui-focused fieldset': { borderColor: '#FFB74D' },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: 'rgba(26, 26, 26, 0.95)' }}>
          <Button onClick={handleClose} sx={{ color: '#FFB74D' }}>Cancel</Button>
          <Button onClick={handleSubmit} sx={{ color: '#FFB74D' }}>Set Goal</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default GoalTracker;
