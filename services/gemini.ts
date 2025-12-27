
import { GoogleGenAI, Type } from "@google/genai";
import { GymClass, FitnessGoal, ProgressPrediction, Car, UserPreferences } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPersonalizedWorkout = async (goal: FitnessGoal): Promise<string> => {
  const prompt = `Create a detailed 7-day fitness and nutrition plan for a user with these specs:
  - Goal: ${goal.goalType}
  - Weight: Current ${goal.currentWeight}kg, Target ${goal.targetWeight}kg
  - Activity Level: ${goal.activityLevel}
  - Equipment: ${goal.equipment.join(', ')}
  
  Provide structured daily workouts and a macro-based diet plan. Format in clean Markdown.`;

  // Always use ai.models.generateContent with model name and prompt as per guidelines
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt
  });

  return response.text || "Unable to generate plan.";
};

export const analyzeWorkoutForm = async (base64Image: string): Promise<any> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { text: "Analyze the workout form in this image. Identify the exercise, point out 2 potential form errors, and give 1 'Pro Tip' for improvement. Return as JSON." },
        { inlineData: { data: base64Image, mimeType: "image/jpeg" } }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          exercise: { type: Type.STRING },
          errors: { type: Type.ARRAY, items: { type: Type.STRING } },
          proTip: { type: Type.STRING },
          safetyScore: { type: Type.NUMBER, description: "0-100 score of how safe the form is" }
        },
        required: ["exercise", "errors", "proTip", "safetyScore"]
      }
    }
  });
  return JSON.parse(response.text.trim());
};

// Fixed missing identifyCarFromImage for pages/Inventory.tsx
export const identifyCarFromImage = async (base64Image: string): Promise<any> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { text: "Identify the car in this image. Return JSON with make, model, year, and a list of key features." },
        { inlineData: { data: base64Image, mimeType: "image/jpeg" } }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          make: { type: Type.STRING },
          model: { type: Type.STRING },
          year: { type: Type.NUMBER },
          features: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["make", "model", "year", "features"]
      }
    }
  });
  return JSON.parse(response.text.trim());
};

export const predictFitnessProgress = async (currentStats: any): Promise<ProgressPrediction> => {
  const prompt = `Based on these fitness stats: ${JSON.stringify(currentStats)}, 
  predict progress for the next 3 months.
  Return JSON with estimatedGoalDate, monthlyProgressRate (kg or % change), burnRate (avg cal/day), and confidenceScore (0-100).`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          estimatedGoalDate: { type: Type.STRING },
          monthlyProgressRate: { type: Type.NUMBER },
          burnRate: { type: Type.NUMBER },
          confidenceScore: { type: Type.NUMBER }
        },
        required: ["estimatedGoalDate", "monthlyProgressRate", "burnRate", "confidenceScore"]
      }
    }
  });
  return JSON.parse(response.text.trim());
};

// Fixed missing getCarRecommendation for pages/Recommendations.tsx
export const getCarRecommendation = async (prefs: UserPreferences, cars: Car[]): Promise<string[]> => {
  const prompt = `Recommend the best car IDs from the provided list based on user preferences. Return a JSON array of car IDs that best match.
  Preferences: ${JSON.stringify(prefs)}
  Available Cars: ${JSON.stringify(cars)}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });
  return JSON.parse(response.text.trim());
};

export const chatWithCoach = async (history: {role: string, text: string}[], message: string): Promise<string> => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are the FitAI Elite Coach. You are encouraging, scientifically accurate, and focused on safety. Help users with workout ideas, form tips, and nutrition advice.",
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text || "I'm sorry, let's try that again.";
};
