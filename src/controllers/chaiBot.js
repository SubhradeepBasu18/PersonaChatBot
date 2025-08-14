import {configDotenv} from "dotenv";
configDotenv({quiet: true});
import OpenAI from "openai";

import {systemPromptHitesh, systemPromptPiyush} from "../prompt.js";

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

async function generateResponse(persona, userMessage = "Hello sir!") {
    // console.log("Generating response for user message:", userMessage);
    console.log(`Persona: ${persona}`);
    
    // const systemPrompt = persona === "hitesh" || "Hitesh Choudhary" ? systemPromptHitesh : systemPromptPiyush;
    let systemPrompt = ""
    if(persona === "hitesh" || persona === "Hitesh Choudhary"){
        systemPrompt = systemPromptHitesh
    }else{
        systemPrompt = systemPromptPiyush
    }
    
    const response = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        { role: "system", content: systemPrompt },
        {
            role: "user",
            content: userMessage,
        },
        
    ],
});

console.log(response.choices[0].message);
    const content = response.choices[0].message.content;
    const cleanedContent = content.replace(/```json\n|\n```/g, '');
    // console.log("Response from Gemini: ", content);
    
    const jsonResponse = JSON.parse(cleanedContent);
    return jsonResponse;
}

// generateResponse(systemPrompt).catch(console.error);
export { generateResponse }