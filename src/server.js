import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
