require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Set up multer for in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const API_KEY = process.env.GEMINI_API_KEY;

// Initialize the Google AI client
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Function to convert buffer to base64
function bufferToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString('base64'),
      mimeType,
    },
  };
}

app.post('/api/analyze', upload.single('image'), async (req, res) => {
  console.log('Received image for analysis.');

  if (!API_KEY) {
    return res.status(500).json({ error: 'API Key not configured. Please create a .env file in the /server directory with your GEMINI_API_KEY.' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided.' });
  }

  try {
    const imagePart = bufferToGenerativePart(req.file.buffer, req.file.mimetype);
    
    const prompt = `
      Você é um assistente de correção de provas de múltipla escolha.
      Analise a imagem da folha de respostas fornecida.
      Extraia as alternativas marcadas para cada questão.
      Responda APENAS com um objeto JSON contendo uma única chave "answers", que é um array de strings.
      Cada string no array deve ser a letra da alternativa marcada (A, B, C, D, ou E).
      Se uma questão não foi marcada, use uma string vazia "".
      Se uma questão estiver marcada de forma ambígua, marque como "X".
      
      Exemplo de resposta para uma prova de 5 questões:
      { "answers": ["A", "C", "X", "E", ""] }
    `;

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    
    console.log(text)
    // Clean up the text to ensure it is valid JSON
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(jsonString);

    console.log('Analysis complete. Sending answers:', data.answers);
    res.json(data);

  } catch (error) {
    console.error('Error analyzing image with Gemini API:', error);
    res.status(500).json({ error: 'Failed to analyze image.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});