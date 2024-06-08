import express from 'express';
import cookieParser from 'cookie-parser';
import env from '@/env';
import authRoutes from '@/routes/auth.routes';
import logger from '@/shared/logger';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);

app.listen(env.PORT, () => {
  logger.info(`Skinly server is running on port ${env.PORT}...`);
});

export default app;
