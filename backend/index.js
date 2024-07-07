import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateCompletion } from './util/ai.js';

dotenv.config();

const app = express();
const path_prefix = '/api';

app.use(express.json());

const allowedOrigins = [
  'https://0xhttps.dev',
  'https://www.0xhttps.dev',
  'https://0xhttps-personal.vercel.app',
  'https://www.0xhttps-personal.vercel.app',
  process.env.LOCAL_PORT
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.get(`${path_prefix}`, (req, res) => {
  res.json({
    message: '✅',
  });
});

app.post(`${path_prefix}/ai`, async (req, res) => {
  const { conversation } = req.body;

  try {
    const response = await generateCompletion(conversation);

    res.json({ message: response });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate completion' });
  }
});

const port = process.env.PORT || 5555;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
