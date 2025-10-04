
import { GoogleGenAI, Type } from "@google/genai";
import type { CompatibilityReport } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
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
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const parsedReport = JSON.parse(jsonText);
    
    // Validate the parsed report structure
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
