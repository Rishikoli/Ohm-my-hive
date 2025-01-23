import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx
    return response.data;
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', error.response.data);
      throw new Error(error.response.data.message || 'Server error');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      throw new Error('Request configuration error');
    }
  }
);

// API endpoints
export const endpoints = {
  nodes: '/api/nodes',
  node: (id) => `/api/nodes/${id}`,
  nodeStats: (id) => `/api/nodes/${id}/stats`,
  forecast: (state) => `/api/forecast/${state}`
};

// API methods
export const apiService = {
  // Nodes
  getNodes: () => api.get(endpoints.nodes),
  getNode: (id) => api.get(endpoints.node(id)),
  updateNode: (id, data) => api.put(endpoints.node(id), data),
  getNodeStats: (id) => api.get(endpoints.nodeStats(id)),
  
  // Forecasting
  getForecast: (state) => api.get(endpoints.forecast(state))
};

export default api;
