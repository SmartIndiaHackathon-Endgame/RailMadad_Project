// server.js

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3800;

// Initialize the Google Generative AI with your API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY);

// Middleware to handle CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Configure multer for image uploads
const storage = multer.memoryStorage(); // Store files in memory buffer
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    },
    fileFilter: (req, file, cb) => {
        // Accept image files only
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
});

// Define the API endpoint to handle image uploads and generate descriptions
app.post('/describe-image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file uploaded.' });
        }

        // Access the image buffer
        const imageBuffer = req.file.buffer;

        // Convert image buffer to a format compatible with the Generative AI model
        // This step depends on the API's requirements. It might require base64 encoding or other processing.
        const imageBase64 = imageBuffer.toString('base64');

        // Use the generative model to generate a description for the image
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Construct the prompt with the image data
        const prompt = `Describe the following image in detail: data:image/jpeg;base64,${imageBase64}`;

        const result = await model.generateContent(prompt);

        // Clean the response text by removing unwanted symbols
        let responseText = result.response.text();
        responseText = responseText.replace(/\*/g, ''); // Removes all asterisks

        // Send the cleaned response back to the frontend
        res.json({ description: responseText });
    } catch (error) {
        console.error('Error generating image description:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
