import React, { createContext, useContext, useState } from 'react';
import BeeLoader from '../components/common/BeeLoader';

const LoadingContext = createContext({
  isLoading: false,
  progress: 0,
  setLoading: () => {},
  setProgress: () => {},
});

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <LoadingContext.Provider 
      value={{ 
        isLoading, 
        progress,
        setLoading: setIsLoading,
        setProgress: setProgress,
      }}
    >
      <BeeLoader loading={isLoading} progress={progress} />
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
