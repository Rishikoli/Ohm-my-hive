import React, { createContext, useContext, useState, useEffect } from 'react';

const CarbonContext = createContext();

export const useCarbonContext = () => useContext(CarbonContext);

export const CarbonProvider = ({ children }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [goals, setGoals] = useState({
    target: 0,
    deadline: null,
    progress: 0
  });
  const [averages, setAverages] = useState({
    regional: 0,
    national: 0,
    global: 0
  });

  // Mock data for demonstration
  useEffect(() => {
    // Generate 12 months of historical data
    const generateHistoricalData = () => {
      const months = [];
      const now = new Date();
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        months.push({
          date: date.toISOString(),
          total: Math.round(2000 + Math.random() * 1000),
          breakdown: {
            electricity: Math.round(800 + Math.random() * 400),
            car: Math.round(600 + Math.random() * 300),
            transport: Math.round(300 + Math.random() * 200),
            home: Math.round(300 + Math.random() * 200),
          }
        });
      }
      return months;
    };

    // Set mock data
    setHistoricalData(generateHistoricalData());
    setAverages({
      regional: 2800,
      national: 3200,
      global: 4000
    });
  }, []);

  const addFootprintData = (data) => {
    const newEntry = {
      date: new Date().toISOString(),
      total: data.total,
      breakdown: data.breakdown
    };

    setHistoricalData(prev => [...prev, newEntry]);
    updateGoalProgress(data.total);
  };

  const setGoal = (target, deadline) => {
    setGoals(prev => ({
      ...prev,
      target,
      deadline,
      progress: calculateProgress(target, historicalData[historicalData.length - 1]?.total || 0)
    }));
  };

  const updateGoalProgress = (currentFootprint) => {
    if (goals.target) {
      const progress = calculateProgress(goals.target, currentFootprint);
      setGoals(prev => ({ ...prev, progress }));
    }
  };

  const calculateProgress = (target, current) => {
    // If current is less than or equal to target, we've achieved 100% or more
    if (current <= target) return 100;
    // Calculate how close we are to the target (inverse because lower is better)
    const baselineEmission = historicalData[0]?.total || current;
    const reduction = baselineEmission - current;
    const targetReduction = baselineEmission - target;
    return Math.min(100, Math.max(0, (reduction / targetReduction) * 100));
  };

  const value = {
    historicalData,
    goals,
    averages,
    addFootprintData,
    setGoal,
    updateGoalProgress
  };

  return (
    <CarbonContext.Provider value={value}>
      {children}
    </CarbonContext.Provider>
  );
};
