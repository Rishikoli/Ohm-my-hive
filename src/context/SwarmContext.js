import React, { createContext, useContext, useReducer } from 'react';

const SwarmContext = createContext();

const initialState = {
  nodes: [],
  loading: false,
  error: null,
  lastUpdate: null,
};

const swarmReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        nodes: action.payload,
        lastUpdate: new Date().toISOString(),
        error: null,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
        lastUpdate: new Date().toISOString(),
      };
    default:
      return state;
  }
};

export function SwarmProvider({ children }) {
  const [state, dispatch] = useReducer(swarmReducer, initialState);

  return (
    <SwarmContext.Provider value={{ state, dispatch }}>
      {children}
    </SwarmContext.Provider>
  );
}

export function useSwarm() {
  const context = useContext(SwarmContext);
  if (!context) {
    throw new Error('useSwarm must be used within a SwarmProvider');
  }
  return context;
}

export default SwarmContext;
