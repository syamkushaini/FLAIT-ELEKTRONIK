
import { GoogleGenAI } from "@google/genai";
import { EpsComponent, ComponentStatus } from "../types";

// Initialize with process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function getFleetInsights(components: EpsComponent[]) {
  const stats = {
    total: components.length,
    serviceable: components.filter(c => c.status === ComponentStatus.SERVICEABLE).length,
    unserviceable: components.filter(c => c.status === ComponentStatus.UNSERVICEABLE).length,
  };

  const prompt = `
    Act as a senior aircraft maintenance engineer.
    Analyze the current fleet status of Emergency Power Systems (EPS):
    Total Inventory: ${stats.total}
    Serviceable: ${stats.serviceable}
    Unserviceable: ${stats.unserviceable}
    Serviceability Rate: ${((stats.serviceable / stats.total) * 100).toFixed(1)}%

    Briefly provide:
    1. A critical assessment of the current state.
    2. Recommendations for logistics or maintenance priorities.
    3. Potential risks to flight operations based on this distribution.
    
    Keep the response concise and professional. Use bullet points.
  `;

  try {
    // Correct usage of generateContent for text responses
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    // response.text is a property, not a method
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Unable to generate insights at this moment. Please check connection.";
  }
}
