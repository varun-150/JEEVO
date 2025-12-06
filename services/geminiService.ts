
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import type { GroundingChunk } from '../types';

if (!import.meta.env.VITE_API_KEY) {
  throw new Error("VITE_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
let chat: Chat | null = null;

function fileToGenerativePart(file: File) {
  return new Promise<{ inlineData: { data: string; mimeType: string } }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error("Failed to read file as base64 string"));
      }
      const base64Data = reader.result.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export const startChat = () => {
  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: 'You are JeevoBot, a helpful assistant for Jeevo. Answer questions about healthcare and our services. Be friendly, professional, and concise.',
    },
  });
};

export const generateChatResponse = async (message: string): Promise<string> => {
  if (!chat) {
    startChat();
  }
  if (chat) {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text;
  }
  return "Chat not initialized.";
};

export const generateGroundedResponse = async (message: string): Promise<{ text: string, sources: GroundingChunk[] }> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return { text: response.text, sources: groundingChunks as GroundingChunk[] };
};

export const analyzeImageWithPrompt = async (prompt: string, image: File): Promise<string> => {
  const imagePart = await fileToGenerativePart(image);
  const textPart = { text: prompt };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [imagePart, textPart] },
  });

  return response.text;
};


export const getFastResponse = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt
  });
  return response.text;
};

export const getThinkingResponse = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 16000 }
    }
  });
  return response.text;
};

export const analyzeHealthData = async (data: any): Promise<string> => {
  const prompt = `
        You are a medical AI assistant for a patient portal. 
        Analyze the following patient health data (Lab results, Vitals). 
        Provide a summary in plain English that a patient can understand. 
        Highlight any values that are outside the normal range and suggest general lifestyle tips.
        
        Data: ${JSON.stringify(data)}
        
        Keep it reassuring but factual. Add a disclaimer that this is AI-generated and not a doctor's diagnosis.
    `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt
  });
  return response.text;
}
