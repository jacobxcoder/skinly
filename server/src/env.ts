import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3000'),
  SUPABASE_URL: z.string(), // URL for the project
  SUPABASE_KEY: z.string(), // anonymous API key

  AUTH_REGISTER_REDIRECT_URL: z.string(), // URL to redirect to after successful registration
  AUTH_RESET_PASSWORD_URL: z.string() // URL to redirect to in order to reset password
});

export const env = envSchema.parse(process.env);
export default env;
