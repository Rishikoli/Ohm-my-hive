// Mock data for development
export const mockData = {
  nodes: [
    {
      id: 1,
      name: 'Maharashtra Node',
      status: 'active',
      location: 'Maharashtra',
      currentDemand: 750,
      forecastedDemand: 850,
      energy: {
        current: 80,
        capacity: 100,
        history: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100))
      }
    },
    {
      id: 2,
      name: 'Gujarat Node',
      status: 'active',
      location: 'Gujarat',
      currentDemand: 650,
      forecastedDemand: 700,
      energy: {
        current: 75,
        capacity: 100,
        history: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100))
      }
    }
  ],
  
  forecasts: {
    Maharashtra: {
      currentDemand: 750,
      forecastedDemand: 850,
      timestamp: new Date().toISOString(),
      hourly: Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        demand: Math.floor(Math.random() * 1000)
      }))
    },
    Gujarat: {
      currentDemand: 650,
      forecastedDemand: 700,
      timestamp: new Date().toISOString(),
      hourly: Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        demand: Math.floor(Math.random() * 900)
      }))
    }
  }
};

// Helper function to simulate API delay
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
