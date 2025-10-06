
import { GoogleGenAI, Type } from "@google/genai";
import type { GameFullDetails } from "../types";

// Ensure the API key is available. If not, throw an error.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGameFullDetails = async (gameTitle: string): Promise<GameFullDetails> => {
  const prompt = `
    Generate a detailed, fictional but realistic profile for the video game "${gameTitle}".
    Provide the output as a single JSON object. Do not include any text outside of the JSON object itself.
    The profile should include:
    1.  "about": A detailed paragraph about the game's story, gameplay, and unique features.
    2.  "platforms": An array of strings listing typical platforms (e.g., "PC", "PS5", "Xbox Series X/S", "Nintendo Switch").
    3.  "reviews": An array of exactly 2 fictional user reviews. Each review object should have "author" (a plausible name), "date" (a recent date in YYYY-MM-DD format), "rating" (an integer from 1 to 5), "text" (a review of 2-3 sentences), and "avatarSeed" (a unique, simple English word for generating a placeholder avatar).
    4.  "userRatings": An object containing "average" (a number between 3.5 and 5.0 with one decimal place), "totalReviews" (a random-like integer between 500 and 5000), and "distribution" (an object with keys '5', '4', '3', '2', '1' where values are percentages that sum up to 100).
  `;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            about: { type: Type.STRING, description: "A detailed paragraph about the game's story, gameplay, and unique features." },
            platforms: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of strings listing typical platforms." },
            reviews: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        author: { type: Type.STRING },
                        date: { type: Type.STRING },
                        rating: { type: Type.INTEGER },
                        text: { type: Type.STRING },
                        avatarSeed: { type: Type.STRING },
                    },
                    required: ["author", "date", "rating", "text", "avatarSeed"],
                },
            },
            userRatings: {
                type: Type.OBJECT,
                properties: {
                    average: { type: Type.NUMBER },
                    totalReviews: { type: Type.INTEGER },
                    distribution: {
                        type: Type.OBJECT,
                        properties: {
                            '5': { type: Type.INTEGER },
                            '4': { type: Type.INTEGER },
                            '3': { type: Type.INTEGER },
                            '2': { type: Type.INTEGER },
                            '1': { type: Type.INTEGER },
                        },
                        required: ['5', '4', '3', '2', '1'],
                    },
                },
                required: ["average", "totalReviews", "distribution"],
            },
        },
        required: ["about", "platforms", "reviews", "userRatings"],
    };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as GameFullDetails;
    } catch (error) {
        console.error("Error calling Gemini API or parsing JSON:", error);
        throw new Error("Failed to communicate with the AI model. Please check your connection and API key.");
    }
};
