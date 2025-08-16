
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    if (!GEMINI_API_KEY) {
        return res.status(500).json({ error: "Server configuration error: GEMINI_API_KEY is not set." });
    }

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    const { prompt, tone, length, imageBase64 } = req.body;

    if (!prompt || !tone || !length || !imageBase64) {
        return res.status(400).json({ error: 'Missing required parameters in request body.' });
    }
    
    try {
        const systemInstruction = `You are an expert Instagram content creator. Your goal is to analyze the provided image and user prompt to generate 3 variations of an engaging caption, each with a call-to-action (CTA), and a single set of relevant hashtags.
- The response MUST be a valid JSON object.
- The root object must have two keys: "captionVariations" and "hashtags".
- "captionVariations" must be an array of exactly 3 objects.
- Each object in "captionVariations" must have two string keys: "caption" and "cta".
- "hashtags" must be a single string of 10-20 relevant, popular hashtags, separated by spaces (e.g., "#coffee #morningvibe #booklover").
- The generated text must be contextual to the image provided.
- Tone: ${tone}.
- Length: ${length}.`;
        
        const imagePart = {
            inlineData: {
                mimeType: 'image/jpeg',
                data: imageBase64,
            },
        };

        const textPart = {
            text: `Generate content for this prompt: "${prompt}"`,
        };

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [imagePart, textPart] },
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        captionVariations: {
                            type: Type.ARRAY,
                            description: "An array of 3 caption variations.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    caption: { type: Type.STRING, description: "The main caption text." },
                                    cta: { type: Type.STRING, description: "A call-to-action, e.g., 'Click the link in bio!'." }
                                },
                                required: ['caption', 'cta']
                            }
                        },
                        hashtags: {
                            type: Type.STRING,
                            description: "A single string of space-separated hashtags."
                        }
                    },
                    required: ['captionVariations', 'hashtags']
                }
            },
        });
        
        // Sometimes the model returns a string that needs parsing, other times it's an object.
        const responseText = response.text;
        const parsedResponse = typeof responseText === 'string' ? JSON.parse(responseText) : responseText;

        return res.status(200).json(parsedResponse);

    } catch (error) {
        console.error("Error in /api/generate-text:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return res.status(500).json({ error: `Text generation failed: ${errorMessage}` });
    }
}
