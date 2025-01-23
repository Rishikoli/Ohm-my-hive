import React, { useState } from 'react';
import { Box, Paper, IconButton, TextField, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      // Add user message
      setMessages([...messages, { text: input, isBot: false }]);
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "Thanks for your message! Our team will get back to you soon.",
          isBot: true
        }]);
      }, 1000);
      
      setInput('');
    }
  };

  return (
    <Box className="chatbot-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="chatbot-window"
          >
            <Paper 
              elevation={3}
              sx={{
                width: '300px',
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                background: 'rgba(26, 26, 26, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 183, 77, 0.3)',
              }}
            >
              {/* Chat Header */}
              <Box sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 183, 77, 0.3)',
                background: 'linear-gradient(180deg, rgba(26, 26, 26, 0.98) 0%, rgba(26, 26, 26, 0.95) 100%)',
              }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#FFB74D',
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '1.1rem',
                  }}
                >
                  Smart Grid Assistant
                </Typography>
                <IconButton 
                  onClick={toggleChat}
                  sx={{ color: '#FFB74D' }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Chat Messages */}
              <Box sx={{
                flex: 1,
                overflowY: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}>
                {messages.map((message, index) => (
                  <Box
                    key={index}
                    sx={{
                      alignSelf: message.isBot ? 'flex-start' : 'flex-end',
                      maxWidth: '80%',
                    }}
                  >
                    <Paper
                      sx={{
                        p: 1,
                        background: message.isBot 
                          ? 'rgba(255, 183, 77, 0.1)'
                          : 'rgba(255, 183, 77, 0.2)',
                        border: '1px solid rgba(255, 183, 77, 0.3)',
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#FFB74D',
                          fontFamily: "'Rajdhani', sans-serif",
                        }}
                      >
                        {message.text}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>

              {/* Chat Input */}
              <Box
                component="form"
                onSubmit={handleSend}
                sx={{
                  p: 2,
                  borderTop: '1px solid rgba(255, 183, 77, 0.3)',
                  background: 'rgba(26, 26, 26, 0.98)',
                  display: 'flex',
                  gap: 1,
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#FFB74D',
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
                  }}
                />
                <IconButton 
                  type="submit"
                  sx={{ color: '#FFB74D' }}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Toggle Button */}
      <motion.div
        className="chatbot-toggle"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
      >
        <img
          src="/assets/chatbot-icon.png"
          alt="Chat with us"
          style={{
            width: '80px',
            height: '80px',
            cursor: 'pointer',
            filter: 'drop-shadow(0 0 10px rgba(255, 183, 77, 0.3))',
          }}
        />
      </motion.div>
    </Box>
  );
};

export default Chatbot;
