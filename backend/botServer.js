// server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3801;

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI("API_KEY");
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Middleware for CORS and JSON parsing
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

// Function to convert image buffer to a format required by the generative AI
function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString('base64'),
      mimeType,
    },
  };
}

// Define the API endpoint to handle image uploads and generate descriptions
app.post('/describe-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded.' });
    }

    // Access the image buffer
    const imageBuffer = req.file.buffer;

    // Construct the prompt and image part
    const prompt = 'Describe the image in the form of a complaint.';
    const imagePart = fileToGenerativePart(imageBuffer, req.file.mimetype);

    // Use the generative model to generate a description for the image
    const result = await model.generateContent([prompt, imagePart]);

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
