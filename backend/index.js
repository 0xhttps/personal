import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
const allowedOrigins = [
  'https://0xhttps.dev',
  'https://0xhttps-personal.vercel.app',
  process.env.LOCAL_PORT // Add localhost for development
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

app.get('/api/', (req, res) => {
  res.json({
    message: '✅',
  });
});

const port = process.env.PORT || 5555;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
