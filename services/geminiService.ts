import { GoogleGenAI, Type } from "@google/genai";
import type { CompatibilityReport, NatalChart } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const compatibilitySchema = {
  type: Type.OBJECT,
  properties: {
    score: {
      type: Type.NUMBER,
      description: "A compatibility score between 0 and 100.",
    },
    summary: {
      type: Type.STRING,
      description: "A short, engaging summary of the relationship compatibility.",
    },
    communication: {
      type: Type.STRING,
      description: "An analysis of their communication styles and compatibility.",
    },
    emotional: {
      type: Type.STRING,
      description: "An analysis of their emotional connection and harmony.",
    },
    romance: {
      type: Type.STRING,
      description: "An analysis of their romantic and passionate connection.",
    },
    challenges: {
      type: Type.STRING,
      description: "A brief on potential challenges or friction points they might face."
    }
  },
  required: ["score", "summary", "communication", "emotional", "romance", "challenges"],
};

const natalChartSchema = {
  type: Type.OBJECT,
  properties: {
    sunSign: { type: Type.STRING, description: "The user's Sun sign (e.g., 'Aries')." },
    moonSign: { type: Type.STRING, description: "The user's Moon sign." },
    risingSign: { type: Type.STRING, description: "The user's Ascendant or Rising sign." },
    planetaryPlacements: {
      type: Type.ARRAY,
      description: "An array of objects representing major planetary placements.",
      items: {
        type: Type.OBJECT,
        properties: {
          planet: { type: Type.STRING, description: "The name of the planet (e.g., 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn')." },
          sign: { type: Type.STRING, description: "The zodiac sign the planet is in." },
          interpretation: { type: Type.STRING, description: "A brief, positive, one-sentence interpretation of this placement's meaning in the person's character." }
        },
        required: ["planet", "sign", "interpretation"]
      }
    }
  },
  required: ["sunSign", "moonSign", "risingSign", "planetaryPlacements"]
};


export const getCompatibilityReport = async (sign1: string, sign2: string): Promise<CompatibilityReport> => {
  const prompt = `
    Analyze the astrological compatibility between two zodiac signs: ${sign1} and ${sign2}.
    Provide a detailed and insightful compatibility report. The tone should be positive, modern, and engaging, like a friendly astrologer.
    Generate a compatibility score between 0 and 100, where 100 is a perfect match.
    The analysis should cover communication styles, emotional connection, romantic chemistry, and potential challenges.
    Do not include any introductory or concluding phrases like "Here is the report" or "I hope this helps".
    Just return the JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: compatibilitySchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const parsedReport = JSON.parse(jsonText);
    
    if (
      typeof parsedReport.score === 'number' &&
      typeof parsedReport.summary === 'string' &&
      typeof parsedReport.communication === 'string'
    ) {
      return { ...parsedReport, sign1, sign2 };
    } else {
      throw new Error("Invalid report structure received from AI.");
    }

  } catch (error) {
    console.error("Error generating compatibility report:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
};

export const getNatalChartReport = async (birthDate: string, birthTime: string, birthPlace: string): Promise<NatalChart> => {
    const prompt = `
      Act as an expert astrologer. Based on the following birth data, calculate the complete natal chart.
      Birth Date: ${birthDate}
      Birth Time: ${birthTime}
      Birth Location: ${birthPlace}
  
      Provide the Sun sign, Moon sign, and Rising sign (Ascendant).
      Also, provide the zodiac sign placements for the following planets: Mercury, Venus, Mars, Jupiter, and Saturn.
      For each planetary placement, include a brief, positive, one-sentence interpretation of its meaning in the person's character.
      Return the data ONLY as a JSON object matching the provided schema. Do not include any extra text, introductions, or explanations.
    `;
  
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: natalChartSchema,
          temperature: 0.5,
        },
      });
  
      const jsonText = response.text.trim();
      const parsedChart = JSON.parse(jsonText);

      // Basic validation
      if (parsedChart.sunSign && parsedChart.moonSign && parsedChart.risingSign && Array.isArray(parsedChart.planetaryPlacements)) {
          return parsedChart;
      } else {
          throw new Error("Invalid natal chart structure received from AI.");
      }
    } catch (error) {
      console.error("Error generating natal chart:", error);
      throw new Error("Failed to communicate with the Gemini API for natal chart generation.");
    }
  };
