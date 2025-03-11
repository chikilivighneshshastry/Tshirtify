import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch'; // Add this import for the fetch API

dotenv.config();

const router = express.Router();

/**
 * @swagger
 * /api/v1/dalle:
 *   get:
 *     summary: Test route for image generation
 *     description: Returns a welcome message to verify the image generation routes are working
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.route('/').get((req, res) => {
    res.status(200).json({ message: "Hello from Image Generation Routes" })
})

/**
 * @swagger
 * /api/v1/dalle:
 *   post:
 *     summary: Generate an image based on text prompt
 *     description: Uses pollinations.ai to generate an image based on the provided text prompt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: Text description of the image to generate
 *     responses:
 *       200:
 *         description: Successfully generated image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 photo:
 *                   type: string
 *                   description: Base64 encoded image data
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        
        // Generate image URL using pollinations.ai
        const image_generator_url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
        
        // Fetch the image from the URL
        const response = await fetch(image_generator_url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        
        // Get the image data as base64
        const imageBuffer = await response.arrayBuffer();
        const image = `data:${response.headers.get('content-type')};base64,${imageBuffer.toString('base64')}`;
        
        res.status(200).json({ photo: image });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" })
    }
})

export default router;