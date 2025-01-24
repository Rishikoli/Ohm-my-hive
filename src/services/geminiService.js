import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_CONFIG } from '../config/apiConfig';

const genAI = new GoogleGenerativeAI(API_CONFIG.GEMINI_API_KEY);

// Helper function to extract and parse JSON from Gemini response
const extractJsonFromResponse = (responseText) => {
  try {
    // First try direct JSON parse
    return JSON.parse(responseText);
  } catch (e) {
    try {
      // Remove markdown code block indicators if present
      const jsonString = responseText.replace(/```(json|JSON)?/g, '').trim();
      return JSON.parse(jsonString);
    } catch (e2) {
      // If still fails, try to find JSON object within the text
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No valid JSON found in response');
    }
  }
};

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
        
        Return a JSON object with the following structure ONLY (no markdown, no explanation):
        {
          "predictedPrice": number,
          "confidence": number
        }`;

      const result = await model.generateContent(prompt);
      return extractJsonFromResponse(result.response.text());
    } catch (error) {
      console.error('Error predicting energy price:', error);
      return {
        predictedPrice: marketData.historicalPrice,
        confidence: 0
      };
    }
  },

  // Generate personalized trading recommendations
  async getTradingRecommendations(userProfile, marketConditions) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Based on the following market conditions and user profile, generate a trading recommendation.
Return ONLY a JSON object with this exact structure (no markdown, no explanation):
{
  "action": "buy" or "sell" or "wait",
  "amount": number,
  "price": number,
  "reasoning": "string",
  "timing": "immediate" or "wait",
  "confidence": number
}

Market Conditions:
- Average Price: ${marketConditions.averagePrice} Credits/kWh
- Market Trend: ${marketConditions.trend}
- Peak Hour: ${marketConditions.isPeakHour ? 'Yes' : 'No'}
- Demand Forecast: ${marketConditions.demandForecast}

User Profile:
- Available Energy: ${userProfile.availableEnergy} kWh
- Trading Power: ${userProfile.tradingPower} Credits
- Risk Tolerance: ${userProfile.riskTolerance || 'Moderate'}`;

      const result = await model.generateContent(prompt);
      return extractJsonFromResponse(result.response.text());
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
      return extractJsonFromResponse(result.response.text());
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
      return extractJsonFromResponse(result.response.text());
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
      return extractJsonFromResponse(result.response.text());
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
      return extractJsonFromResponse(result.response.text());
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
      return extractJsonFromResponse(result.response.text());
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
      return extractJsonFromResponse(result.response.text());
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
      return extractJsonFromResponse(result.response.text());
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

  // Chat with the AI assistant
  async chat(message, chatHistory = []) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const systemPrompt = `You are an AI assistant for a smart energy grid platform called BioGrid. Your role is to help users understand and optimize their energy usage, trading, and environmental impact.

Key features you can assist with:
1. Energy Trading: Explain market conditions, trading strategies, and provide basic guidance
2. Load Management: Help users understand their energy consumption patterns
3. Climate Impact: Explain carbon footprint calculations and provide sustainability tips
4. Smart Grid: Explain how the smart grid works and its benefits
5. Energy Optimization: Provide tips for reducing energy usage and costs

Guidelines:
- Be concise but informative
- Use a professional yet friendly tone
- Focus on energy-related topics
- Provide specific, actionable advice when possible
- Express numerical data clearly
- If unsure, acknowledge limitations and suggest consulting official documentation

Current chat history:
${chatHistory.map(msg => `${msg.isBot ? 'Assistant' : 'User'}: ${msg.text}`).join('\n')}

User's latest message: ${message}

Respond in a helpful and informative way while staying within your role as a smart grid assistant.`;

      const result = await model.generateContent(systemPrompt);
      return result.response.text();
    } catch (error) {
      console.error('Error in chat:', error);
      return "I apologize, but I'm having trouble processing your request at the moment. Please try again later.";
    }
  },

  // Predict load balancing recommendations
  async predictLoadBalancing(gridData) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Analyze the following power grid data and provide load balancing recommendations.
        Return ONLY a JSON array with this exact structure for each region (no markdown, no explanation):
        [{
          "region": string,
          "currentLoad": number (percentage),
          "predictedLoad": number (percentage),
          "recommendation": string ("Redistribute" or "Maintain"),
          "carbonImpact": number (CO2 reduction in tons),
          "renewableUtilization": number (percentage),
          "gridStability": number (percentage)
        }]

        Grid Data:
        ${JSON.stringify(gridData, null, 2)}
        
        Consider:
        1. Current load distribution
        2. Regional renewable energy capacity
        3. Grid stability metrics
        4. Carbon footprint impact
        5. Peak demand patterns`;

      const result = await model.generateContent(prompt);
      return extractJsonFromResponse(result.response.text());
    } catch (error) {
      console.error('Error predicting load balancing:', error);
      return [];
    }
  },

  // Predict EV charging patterns and optimization
  async predictEVChargingPatterns(regionData) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Analyze EV charging patterns and provide optimization recommendations.
        Return ONLY a JSON array with this exact structure for each time slot (no markdown, no explanation):
        [{
          "timeSlot": string,
          "predictedDemand": number (percentage),
          "optimalCapacity": number (percentage),
          "hotspots": string[],
          "carbonReduction": number (tons),
          "gridImpact": number (percentage),
          "renewableIntegration": number (percentage),
          "recommendations": string[]
        }]

        Region Data:
        ${JSON.stringify(regionData, null, 2)}
        
        Consider:
        1. Historical charging patterns
        2. Grid capacity by region
        3. Renewable energy availability
        4. Carbon footprint reduction
        5. Peak load management`;

      const result = await model.generateContent(prompt);
      return extractJsonFromResponse(result.response.text());
    } catch (error) {
      console.error('Error predicting EV charging patterns:', error);
      return [];
    }
  },

  // Get climate impact analysis for load balancing and EV charging
  async getClimateImpactAnalysis(gridData, evData) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Analyze the climate impact of current grid operations and EV charging patterns.
        Return ONLY a JSON object with this exact structure (no markdown, no explanation):
        {
          "totalCarbonReduction": number (tons),
          "renewableUtilization": number (percentage),
          "gridEfficiency": number (percentage),
          "sustainabilityScore": number (0-100),
          "recommendations": string[],
          "impactByRegion": [{
            "region": string,
            "carbonReduction": number,
            "renewableShare": number,
            "evImpact": number
          }]
        }

        Grid Data:
        ${JSON.stringify(gridData, null, 2)}

        EV Data:
        ${JSON.stringify(evData, null, 2)}
        
        Consider:
        1. Carbon emissions reduction
        2. Renewable energy integration
        3. Grid efficiency improvements
        4. Regional variations
        5. EV charging optimization impact`;

      const result = await model.generateContent(prompt);
      return extractJsonFromResponse(result.response.text());
    } catch (error) {
      console.error('Error analyzing climate impact:', error);
      return {
        totalCarbonReduction: 0,
        renewableUtilization: 0,
        gridEfficiency: 0,
        sustainabilityScore: 0,
        recommendations: [],
        impactByRegion: []
      };
    }
  },
};

export default geminiService;
