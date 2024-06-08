import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import env from '@/env';
import authRoutes from '@/routes/auth.routes';
import logger from '@/shared/logger';

const app = express();

app.use(
  cors({
    origin: [env.CLIENT_URL],
    methods: ['GET', 'POST', 'PUT', 'UPDATE', 'PATCH', 'DELETE'],
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);

app.listen(env.PORT, () => {
  logger.info(`Skinly server is running on port ${env.PORT}...`);
});

export default app;
