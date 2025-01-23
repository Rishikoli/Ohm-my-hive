import axios from 'axios';
import { mockSwarmApi } from './mockApiService';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const USE_MOCK_API = process.env.REACT_APP_USE_MOCK_API === 'true' || process.env.NODE_ENV === 'development';

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Use mock API in development, real API in production
export const swarmApi = USE_MOCK_API ? mockSwarmApi : {
  getNodes: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/nodes`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch nodes:', error);
      throw error;
    }
  },
  
  updateNode: async (nodeId, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/nodes/${nodeId}`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update node:', error);
      throw error;
    }
  },

  getNodeStats: async (nodeId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/nodes/${nodeId}/stats`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch node stats:', error);
      throw error;
    }
  }
};
