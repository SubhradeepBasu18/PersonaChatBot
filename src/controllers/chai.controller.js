import { generateResponse } from '../controllers/chaiBot.js';

const initiateGenerateReponse = async(req, res) => {
    try {
        const { message, persona } = req.body;
        // Add persona context to the message
        // const prompt = `You are ${persona}. ${message}`;
        const response = await generateResponse(persona, message);
        
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error generating response:", error);
        return res.status(500).json({ error: "Failed to generate response" });
    }
}

export { initiateGenerateReponse };