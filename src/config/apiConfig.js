// API Configuration
export const API_CONFIG = {
  GEMINI_API_KEY: process.env.REACT_APP_GEMINI_API_KEY || '',
};

// Validate API key presence
if (!API_CONFIG.GEMINI_API_KEY) {
  console.warn('Warning: REACT_APP_GEMINI_API_KEY is not set in environment variables');
}
