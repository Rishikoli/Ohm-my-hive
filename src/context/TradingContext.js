import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import geminiService from '../services/geminiService';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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
    buyOrders: [
      { price: 12.85, amount: 150, depth: 95 },
      { price: 12.75, amount: 200, depth: 85 },
      { price: 12.65, amount: 180, depth: 75 },
      { price: 12.55, amount: 120, depth: 65 },
      { price: 12.45, amount: 250, depth: 55 },
      { price: 12.35, amount: 160, depth: 45 },
      { price: 12.25, amount: 140, depth: 35 },
    ],
    sellOrders: [
      { price: 13.15, amount: 130, depth: 90 },
      { price: 13.25, amount: 175, depth: 80 },
      { price: 13.35, amount: 145, depth: 70 },
      { price: 13.45, amount: 190, depth: 60 },
      { price: 13.55, amount: 165, depth: 50 },
      { price: 13.65, amount: 155, depth: 40 },
      { price: 13.75, amount: 185, depth: 30 },
    ],
  });

  const [recommendations, setRecommendations] = useState(null);
  const [predictedPrice, setPredictedPrice] = useState(null);

  // Generate mock order book data using Gemini
  const generateOrderBook = async () => {
    try {
      const prompt = `Generate realistic order book data for energy trading with the following format:
      {
        "buyOrders": [
          { "price": number, "amount": number, "depth": number }
        ],
        "sellOrders": [
          { "price": number, "amount": number, "depth": number }
        ]
      }
      Consider:
      - Current market price is around ${predictedPrice || 12} credits/kWh
      - Buy orders should be below market price
      - Sell orders should be above market price
      - Depth should be between 0-100
      - Amount should be between 50-500 kWh
      Return only the JSON data.`;

      const result = await model.generateContent(prompt);
      const data = JSON.parse(result.response.text());
      setOrderBook(data);
    } catch (error) {
      console.error('Error generating order book:', error);
    }
  };

  // Generate mock market conditions using Gemini
  const generateMarketConditions = async () => {
    try {
      const prompt = `Generate market conditions for energy trading. Respond with only a JSON object in this exact format, no other text or formatting:
{
  "demand": <number between 500-2000>,
  "supply": <number between 500-2000>,
  "weather": <one of: "Sunny", "Cloudy", "Rainy", "Windy">,
  "historicalPrice": <number between 8-15>,
  "marketTrend": <one of: "Bullish", "Bearish", "Stable">,
  "tradingVolume": <number between 1000-5000>,
  "peakHourDemand": <true or false>
}`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      // Clean up the response text to ensure it's valid JSON
      const cleanJson = responseText.replace(/```json\n?|\n?```/g, '').trim();
      const conditions = JSON.parse(cleanJson);
      
      // Validate the parsed data
      if (!conditions || typeof conditions !== 'object') {
        throw new Error('Invalid response format');
      }

      setMarketData(conditions);
      
      // Get price prediction based on new conditions
      const predictedPrice = await geminiService.predictEnergyPrice(conditions);
      setPredictedPrice(predictedPrice);
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
