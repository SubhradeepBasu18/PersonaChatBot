import { configDotenv } from "dotenv";
configDotenv({ quiet: true });
import OpenAI from "openai";

import { systemPromptHitesh, systemPromptPiyush } from "../prompt.js";

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

// Storing conversation history locally
let conversationHistory = [];

async function generateResponse(persona, userMessage = "Hello sir!") {
    console.log(`Persona: ${persona}`);

    let systemPrompt = "";
    if (persona === "hitesh" || persona === "Hitesh Choudhary") {
        systemPrompt = systemPromptHitesh;
    } else {
        systemPrompt = systemPromptPiyush;
    }

    // Adding the system prompt to the conversation history
    conversationHistory.push({ role: "system", content: systemPrompt });

    // Adding the current user message to the conversation history
    conversationHistory.push({
        role: "user",
        content: userMessage
    });

    const response = await openai.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: conversationHistory,
    });

    const assistantMessage = response.choices[0].message.content;

    conversationHistory.push({
        role: "assistant",
        content: assistantMessage
    });

    const cleanedContent = assistantMessage.replace(/```json\n|\n```/g, '');
    
    try {
        const jsonResponse = JSON.parse(cleanedContent);
        return jsonResponse;
    } catch (error) {
        console.error("Error parsing response:", error);
        return cleanedContent;
    }
}

export { generateResponse };
