import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_CONFIG } from '../config/apiConfig';

const genAI = new GoogleGenerativeAI(API_CONFIG.GEMINI_API_KEY);

export const geminiService = {
  // Predict energy price based on market conditions
  async predictEnergyPrice(marketData) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Given the following energy market conditions:
        - Current demand: ${marketData.demand}kW
        - Supply availability: ${marketData.supply}kW
        - Time of day: ${marketData.timeOfDay}
        - Weather conditions: ${marketData.weather}
        - Historical average price: ${marketData.historicalPrice} credits/kWh
        
        Predict the optimal energy price per kWh for the next hour. Consider:
        1. Supply-demand ratio
        2. Peak/off-peak hours
        3. Weather impact on renewable energy
        4. Market trends
        
        Return only the numerical value in credits/kWh.
      `;

      const result = await model.generateContent(prompt);
      const price = parseFloat(result.response.text());
      return isNaN(price) ? marketData.historicalPrice : price;
    } catch (error) {
      console.error('Error predicting energy price:', error);
      return marketData.historicalPrice;
    }
  },

  // Generate personalized trading recommendations
  async getTradingRecommendations(userProfile, marketConditions) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Based on the following market conditions and user profile, generate a trading recommendation:

Market Conditions:
- Average Price: ${marketConditions.averagePrice} Credits/kWh
- Market Trend: ${marketConditions.trend}
- Peak Hour: ${marketConditions.isPeakHour ? 'Yes' : 'No'}
- Demand Forecast: ${marketConditions.demandForecast}

User Profile:
- Available Energy: ${userProfile.availableEnergy} kWh
- Trading Power: ${userProfile.tradingPower} Credits
- Risk Tolerance: ${userProfile.riskTolerance || 'Moderate'}

Provide a trading recommendation in the following JSON format:
{
  "action": "buy or sell",
  "amount": "recommended amount in kWh",
  "price": "recommended price per kWh",
  "reasoning": "brief explanation",
  "timing": "immediate or wait",
  "confidence": "percentage between 0-100"
}`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      // Find the JSON object in the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error generating trading recommendations:', error);
      return {
        action: "wait",
        amount: 0,
        price: 0,
        reasoning: "Unable to generate recommendation at this time",
        timing: "wait",
        confidence: 0
      };
    }
  },

  // Analyze transaction risk
  async analyzeTransactionRisk(transaction, userHistory) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Analyze the risk level of the following energy trading transaction:
        
        Transaction Details:
        - Type: ${transaction.type}
        - Amount: ${transaction.amount}kWh
        - Price per kWh: ${transaction.price} credits
        - Counterparty rating: ${transaction.counterpartyRating}/5
        
        User Trading History:
        - Total transactions: ${userHistory.totalTransactions}
        - Successful transactions: ${userHistory.successfulTransactions}
        - Average transaction size: ${userHistory.averageSize}kWh
        - Risk tolerance: ${userHistory.riskTolerance}/5
        
        Provide a risk assessment in the following JSON format:
        {
          "riskLevel": "low|medium|high",
          "riskScore": "0-100",
          "concerns": ["list of specific risk factors"],
          "recommendations": ["list of risk mitigation steps"],
          "proceedRecommended": boolean
        }
      `;

      const result = await model.generateContent(prompt);
      return JSON.parse(result.response.text());
    } catch (error) {
      console.error('Error analyzing transaction risk:', error);
      return null;
    }
  },

  // Generate smart contract terms
  async generateSmartContractTerms(transaction) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Generate smart contract terms for the following P2P energy trading transaction:
        
        Transaction Details:
        - Seller: ${transaction.seller}
        - Buyer: ${transaction.buyer}
        - Energy amount: ${transaction.amount}kWh
        - Price per kWh: ${transaction.price} credits
        - Delivery period: ${transaction.deliveryPeriod}
        - Energy type: ${transaction.energyType}
        
        Generate contract terms in the following JSON format:
        {
          "contractId": "unique identifier",
          "terms": ["list of specific contract terms"],
          "conditions": ["list of conditions"],
          "penalties": ["list of penalty clauses"],
          "validityPeriod": "duration in hours",
          "qualityRequirements": ["list of energy quality requirements"],
          "disputeResolution": "dispute resolution process"
        }
      `;

      const result = await model.generateContent(prompt);
      return JSON.parse(result.response.text());
    } catch (error) {
      console.error('Error generating smart contract terms:', error);
      return null;
    }
  },

  // Generate order book data
  async generateOrderBook(marketData) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Generate a realistic order book for energy trading based on these market conditions:
Current Price: ${marketData.currentPrice} Credits/kWh
Market Trend: ${marketData.marketTrend}
Peak Hour: ${marketData.peakHourDemand ? 'Yes' : 'No'}
Supply: ${marketData.supply} kWh
Demand: ${marketData.demand} kWh

Generate 10 buy orders and 10 sell orders around the current price.
Return the data as a valid JSON object with this exact structure:
{
  "buyOrders": [
    {"price": number, "amount": number}
  ],
  "sellOrders": [
    {"price": number, "amount": number}
  ]
}

The response should be ONLY the JSON object, nothing else.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      
      // Remove any markdown code block indicators if present
      const jsonStr = text.replace(/^```json\n|\n```$/g, '').trim();
      
      try {
        return JSON.parse(jsonStr);
      } catch (parseError) {
        console.error('Failed to parse order book JSON:', parseError);
        // Return default order book
        return {
          buyOrders: [
            { price: marketData.currentPrice * 0.95, amount: 100 },
            { price: marketData.currentPrice * 0.97, amount: 150 },
            { price: marketData.currentPrice * 0.98, amount: 200 },
            { price: marketData.currentPrice * 0.99, amount: 250 },
            { price: marketData.currentPrice * 0.995, amount: 300 }
          ],
          sellOrders: [
            { price: marketData.currentPrice * 1.005, amount: 300 },
            { price: marketData.currentPrice * 1.01, amount: 250 },
            { price: marketData.currentPrice * 1.02, amount: 200 },
            { price: marketData.currentPrice * 1.03, amount: 150 },
            { price: marketData.currentPrice * 1.05, amount: 100 }
          ]
        };
      }
    } catch (error) {
      console.error('Error generating order book:', error);
      return {
        buyOrders: [],
        sellOrders: []
      };
    }
  },

  // Predict load management for states
  async predictLoadManagement(stateData) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Analyze the following state energy data and predict load management metrics:
        State: ${stateData.name}
        Current Load: ${stateData.currentLoad} MW
        Peak Capacity: ${stateData.peakCapacity} MW
        Time: ${stateData.timestamp}
        Weather: ${stateData.weather}
        Historical Usage Pattern: ${stateData.historicalPattern}

        Provide a detailed analysis of:
        1. Expected load for next 24 hours
        2. Load distribution across sectors
        3. Peak load times
        4. Load shedding requirements if any
        5. Efficiency recommendations

        Format the response as a structured JSON object.
      `;

      const result = await model.generateContent(prompt);
      return JSON.parse(result.response.text());
    } catch (error) {
      console.error('Error predicting load management:', error);
      return null;
    }
  },

  // Get active nodes analysis
  async getActiveNodesAnalysis(stateData) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Analyze the active energy nodes for the state:
        State: ${stateData.name}
        Total Nodes: ${stateData.totalNodes}
        Active Nodes: ${stateData.activeNodes}
        Node Types: ${JSON.stringify(stateData.nodeTypes)}
        Network Health: ${stateData.networkHealth}

        Provide analysis of:
        1. Node activity patterns
        2. Network stability
        3. Node distribution efficiency
        4. Performance metrics
        5. Optimization recommendations

        Return as a structured JSON object.
      `;

      const result = await model.generateContent(prompt);
      return JSON.parse(result.response.text());
    } catch (error) {
      console.error('Error analyzing active nodes:', error);
      return null;
    }
  },

  // Generate state energy overview
  async getStateEnergyOverview(stateData) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Generate a comprehensive energy overview for the state:
        State: ${stateData.name}
        Total Generation: ${stateData.totalGeneration} MW
        Renewable Percentage: ${stateData.renewablePercentage}%
        Grid Stability: ${stateData.gridStability}
        Energy Storage: ${stateData.energyStorage} MWh
        Carbon Footprint: ${stateData.carbonFootprint}

        Analyze and provide:
        1. Energy mix distribution
        2. Grid performance metrics
        3. Sustainability indicators
        4. Storage utilization
        5. Future energy projections

        Format as a structured JSON object.
      `;

      const result = await model.generateContent(prompt);
      return JSON.parse(result.response.text());
    } catch (error) {
      console.error('Error generating state energy overview:', error);
      return null;
    }
  },

  // Predict electricity usage for states and regions
  async predictElectricityUsage(stateData, historicalData) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Given the following state/region energy data:
        - Current consumption: ${stateData.currentConsumption} MW
        - Historical average: ${historicalData.averageConsumption} MW
        - Peak load: ${stateData.peakLoad} MW
        - Time of day: ${new Date().getHours()}:00
        - Season: ${historicalData.season}
        - Industrial activity index: ${historicalData.industrialIndex}
        
        Predict:
        1. Expected consumption for next 24 hours
        2. Peak usage time
        3. Potential savings through optimization
        4. Regional impact on grid stability
        
        Return in JSON format:
        {
          "hourlyPredictions": [24 hourly values],
          "peakUsageTime": "HH:MM",
          "potentialSavings": "percentage",
          "gridStabilityImpact": "high/medium/low",
          "confidenceScore": 0-100
        }`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      // Parse JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error predicting electricity usage:', error);
      return {
        hourlyPredictions: Array(24).fill(stateData.currentConsumption),
        peakUsageTime: "N/A",
        potentialSavings: "0",
        gridStabilityImpact: "medium",
        confidenceScore: 0
      };
    }
  },
};

export default geminiService;
