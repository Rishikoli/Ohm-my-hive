import React, { createContext, useContext, useState, useEffect } from 'react';
import geminiService from '../services/geminiService';

const TradingContext = createContext();

export const useTradingContext = () => {
  const context = useContext(TradingContext);
  if (!context) {
    throw new Error('useTradingContext must be used within a TradingProvider');
  }
  return context;
};

export const TradingProvider = ({ children }) => {
  const [marketData, setMarketData] = useState({
    demand: 0,
    supply: 0,
    timeOfDay: '',
    weather: '',
    historicalPrice: 0,
  });

  const [userProfile, setUserProfile] = useState({
    id: 'USER123',
    credits: 10000,
    availableEnergy: 500,
    productionType: 'Solar',
    tradingHistory: [
      {
        timestamp: '2025-01-15T12:30:00',
        type: 'buy',
        amount: 100,
        price: 12.75,
        status: 'completed',
        contractTerms: {
          deliveryPeriod: '24h',
          energyType: 'Solar',
          seller: 'MARKET',
        },
      },
      {
        timestamp: '2025-01-15T11:45:00',
        type: 'sell',
        amount: 75,
        price: 13.25,
        status: 'completed',
        contractTerms: {
          deliveryPeriod: '12h',
          energyType: 'Solar',
          buyer: 'MARKET',
        },
      },
      {
        timestamp: '2025-01-15T10:15:00',
        type: 'buy',
        amount: 150,
        price: 12.50,
        status: 'completed',
        contractTerms: {
          deliveryPeriod: '24h',
          energyType: 'Solar',
          seller: 'MARKET',
        },
      },
      {
        timestamp: '2025-01-15T09:30:00',
        type: 'sell',
        amount: 200,
        price: 13.45,
        status: 'completed',
        contractTerms: {
          deliveryPeriod: '48h',
          energyType: 'Solar',
          buyer: 'MARKET',
        },
      },
      {
        timestamp: '2025-01-15T08:45:00',
        type: 'buy',
        amount: 125,
        price: 12.90,
        status: 'pending',
        contractTerms: {
          deliveryPeriod: '24h',
          energyType: 'Solar',
          seller: 'MARKET',
        },
      },
    ],
  });

  const [orderBook, setOrderBook] = useState({
    bids: [],
    asks: []
  });

  const [recommendations, setRecommendations] = useState(null);
  const [predictedPrice, setPredictedPrice] = useState(null);

  // Generate mock order book data
  const generateOrderBook = async () => {
    try {
      // Generate random order book data
      const generateOrders = (count) => {
        return Array.from({ length: count }, () => ({
          price: Number((Math.random() * (15 - 5) + 5).toFixed(2)),
          amount: Math.floor(Math.random() * (500 - 50) + 50)
        })).sort((a, b) => b.price - a.price);
      };

      const data = {
        bids: generateOrders(5),
        asks: generateOrders(5)
      };

      setOrderBook(data);
    } catch (error) {
      console.error('Error generating order book:', error);
      setOrderBook({ bids: [], asks: [] });
    }
  };

  // Generate mock market conditions locally instead of using Gemini
  const generateMarketConditions = async () => {
    try {
      // Generate random market data locally
      const weatherOptions = ["Sunny", "Cloudy", "Rainy", "Windy"];
      const trendOptions = ["Bullish", "Bearish", "Stable"];
      
      const conditions = {
        demand: Math.floor(Math.random() * (2000 - 500) + 500),
        supply: Math.floor(Math.random() * (2000 - 500) + 500),
        weather: weatherOptions[Math.floor(Math.random() * weatherOptions.length)],
        historicalPrice: Math.floor(Math.random() * (15 - 8) + 8),
        marketTrend: trendOptions[Math.floor(Math.random() * trendOptions.length)],
        tradingVolume: Math.floor(Math.random() * (5000 - 1000) + 1000),
        peakHourDemand: Math.random() > 0.5
      };

      setMarketData(conditions);
      
      // Calculate predicted price locally
      const basePrice = conditions.historicalPrice;
      const demandFactor = conditions.demand / conditions.supply;
      const weatherFactor = conditions.weather === "Sunny" ? 1.1 : 0.9;
      const trendFactor = conditions.marketTrend === "Bullish" ? 1.15 : 
                         conditions.marketTrend === "Bearish" ? 0.85 : 1;
      
      const predictedPrice = basePrice * demandFactor * weatherFactor * trendFactor;
      setPredictedPrice(Number(predictedPrice.toFixed(2)));

    } catch (error) {
      console.error('Error generating market conditions:', error);
      // Set fallback market data
      setMarketData({
        demand: 1000,
        supply: 1200,
        weather: "Sunny",
        historicalPrice: 10,
        marketTrend: "Stable",
        tradingVolume: 2000,
        peakHourDemand: false
      });
    }
  };

  // Generate trading recommendations using Gemini
  const generateRecommendations = async () => {
    try {
      const marketConditions = {
        averagePrice: predictedPrice || marketData.historicalPrice,
        trend: marketData.marketTrend,
        isPeakHour: marketData.peakHourDemand,
        demandForecast: marketData.demand > marketData.supply ? 'High' : 'Low',
      };

      const recommendations = await geminiService.getTradingRecommendations(
        userProfile,
        marketConditions
      );
      setRecommendations(recommendations);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    }
  };

  // Update market data periodically
  useEffect(() => {
    const updateMarketData = async () => {
      await generateMarketConditions();
      await generateOrderBook();
    };

    updateMarketData();
    const interval = setInterval(updateMarketData, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  // Update recommendations when market data changes
  useEffect(() => {
    if (marketData.demand > 0) {
      generateRecommendations();
    }
  }, [marketData, userProfile]);

  const executeTransaction = async (transaction) => {
    try {
      // Analyze transaction risk
      const riskAnalysis = await geminiService.analyzeTransactionRisk(
        transaction,
        {
          totalTransactions: userProfile.tradingHistory.length,
          successfulTransactions: userProfile.tradingHistory.filter(t => t.status === 'completed').length,
          averageSize: userProfile.tradingHistory.reduce((acc, t) => acc + t.amount, 0) / 
                      (userProfile.tradingHistory.length || 1),
          riskTolerance: 3,
        }
      );

      if (!riskAnalysis || !riskAnalysis.proceedRecommended) {
        throw new Error('Transaction deemed too risky: ' + riskAnalysis.concerns.join(', '));
      }

      // Generate smart contract terms
      const contractTerms = await geminiService.generateSmartContractTerms({
        ...transaction,
        seller: transaction.type === 'sell' ? userProfile.id : 'MARKET',
        buyer: transaction.type === 'buy' ? userProfile.id : 'MARKET',
        deliveryPeriod: '24h',
        energyType: userProfile.productionType,
      });

      if (!contractTerms) {
        throw new Error('Failed to generate smart contract terms');
      }

      // Update user profile after successful transaction
      const updatedProfile = { ...userProfile };
      if (transaction.type === 'buy') {
        updatedProfile.credits -= transaction.amount * transaction.price;
        updatedProfile.availableEnergy += transaction.amount;
      } else {
        updatedProfile.credits += transaction.amount * transaction.price;
        updatedProfile.availableEnergy -= transaction.amount;
      }

      updatedProfile.tradingHistory.push({
        ...transaction,
        status: 'completed',
        timestamp: new Date().toISOString(),
        contractTerms,
      });

      setUserProfile(updatedProfile);
      
      // Update market data after transaction
      generateMarketConditions();
      generateOrderBook();

      return { success: true, contractTerms };
    } catch (error) {
      console.error('Transaction failed:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    marketData,
    userProfile,
    orderBook,
    recommendations,
    predictedPrice,
    executeTransaction,
    setUserProfile,
  };

  return (
    <TradingContext.Provider value={value}>
      {children}
    </TradingContext.Provider>
  );
};

export default TradingContext;
