import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client using the required apiKey named parameter from process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a response from Gemini using the provided prompt and conversation history.
 */
export const generateGeminiResponse = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    // We use ai.models.generateContent for text responses as per guidelines.
    // History is included in the contents array to maintain the context of the conversation.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: "You are a helpful Windows 11 Desktop Assistant. You help users navigate their virtual desktop and answer general questions concisely and friendly. You are integrated into a React Win11 simulator.",
      }
    });

    // Access the generated text directly from the .text property of the response object.
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my brain right now. Please check your internet connection and try again.";
  }
};