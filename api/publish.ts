
import type { VercelRequest, VercelResponse } from '@vercel/node';

// IMPORTANT: Set these environment variables in your Vercel project settings
const {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    INSTAGRAM_USER_ID,
    INSTAGRAM_ACCESS_TOKEN
} = process.env;


export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(204).send('');
    }

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { imageBase64, caption } = req.body;

    if (!imageBase64 || !caption) {
        return res.status(400).json({ error: 'Missing required parameters: imageBase64 and caption.' });
    }

    try {
        const imageUrl = await uploadImage(imageBase64);
        const igPostId = await publishPost(imageUrl, caption);

        return res.status(200).json({ postId: igPostId, optimizedImageUrl: imageUrl });

    } catch (error) {
        console.error("Error in /api/publish:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return res.status(500).json({ error: `Publishing failed: ${errorMessage}` });
    }
}

// MOCK FUNCTION: Simulates uploading to Cloudinary
async function uploadImage(imageBase64: string): Promise<string> {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY) {
        throw new Error("Server configuration error: Cloudinary environment variables are not set.");
    }
    console.log("Simulating upload to Cloudinary for cloud:", CLOUDINARY_CLOUD_NAME);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const randomId = Math.random().toString(36).substring(2, 10);
    const placeholderUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/v1672531200/simulated/${randomId}.jpg`;
    console.log("Simulated upload complete. URL:", placeholderUrl);
    return placeholderUrl;
}

// MOCK FUNCTION: Simulates publishing to Instagram
async function publishPost(imageUrl: string, caption: string): Promise<string> {
    if (!INSTAGRAM_USER_ID || !INSTAGRAM_ACCESS_TOKEN) {
        throw new Error("Server configuration error: Instagram environment variables are not set.");
    }
    console.log(`Simulating Instagram post publication for user: ${INSTAGRAM_USER_ID}`);
    
    // Simulate API calls
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const postId = `1234567890_${Date.now()}`;
    console.log("Post published successfully. Post ID:", postId);
    return postId;
}