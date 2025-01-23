import React, { useState } from 'react';
import { Box, Paper, IconButton, TextField, Typography, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import geminiService from '../../services/geminiService';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your Smart Grid Assistant. How can I help you optimize your energy usage today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { text: input.trim(), isBot: false };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);

      try {
        const response = await geminiService.chat(input.trim(), messages);
        setMessages(prev => [...prev, { text: response, isBot: true }]);
      } catch (error) {
        console.error('Error getting response:', error);
        setMessages(prev => [...prev, {
          text: "I apologize, but I'm having trouble processing your request. Please try again later.",
          isBot: true
        }]);
      } finally {
        setIsTyping(false);
      }
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
              <Box 
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
                className="messages-container"
              >
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
                        p: 1.5,
                        background: message.isBot 
                          ? 'rgba(255, 183, 77, 0.1)'
                          : 'rgba(255, 183, 77, 0.2)',
                        border: '1px solid rgba(255, 183, 77, 0.3)',
                        borderRadius: '10px',
                        borderTopLeftRadius: message.isBot ? '0px' : '10px',
                        borderTopRightRadius: message.isBot ? '10px' : '0px',
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#fff',
                          fontSize: '0.9rem',
                          lineHeight: '1.4',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {message.text}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
                {isTyping && (
                  <Box sx={{ alignSelf: 'flex-start', pl: 1 }}>
                    <CircularProgress size={20} sx={{ color: '#FFB74D' }} />
                  </Box>
                )}
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
                      color: '#fff',
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
                    '& .MuiInputBase-input::placeholder': {
                      color: 'rgba(255, 255, 255, 0.5)',
                    },
                  }}
                />
                <IconButton 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  sx={{
                    color: '#FFB74D',
                    '&.Mui-disabled': {
                      color: 'rgba(255, 183, 77, 0.3)',
                    },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.div
        className="chat-toggle"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
      >
        <img 
          src="/assets/chatbot-icon.png" 
          alt="Chat"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>
    </Box>
  );
};

export default Chatbot;
