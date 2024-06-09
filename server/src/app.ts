import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import env from '@/env';
import logger from '@/shared/logger';

import selfieRoutes from '@/routes/selfie.routes';

import { type User } from '@supabase/supabase-js';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

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

app.use('/selfies', selfieRoutes);

app.listen(env.PORT, () => {
  logger.info(`Skinly server is running on port ${env.PORT}...`);
});

export default app;
