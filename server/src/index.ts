import express from 'express';
import cookieParser from 'cookie-parser';
import env from '@/config';
import authRoutes from '@/routes/auth.routes';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});

export default app;
