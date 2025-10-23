import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import companyRouter from './routes/companyRoute.js';

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/companies', companyRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});