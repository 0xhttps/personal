import Express from 'express';
import cors from 'cors';

const app = Express()
const PORT = process.env.PORT || 4442;

app.use(Express.json());
app.use(cors());

app.listen(
    PORT,
    () => console.log(`listening`)
);

app.get('/api/', (req, res) => {
    res.json({
      message: '✅',
    });
  });