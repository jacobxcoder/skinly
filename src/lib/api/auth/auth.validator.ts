import { z } from 'zod';

export const RegisterUserSchema = z
  .object({
    email: z.string().email('Please give a valid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
    confirmPassword: z.string().min(6)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export type RegisterUserSchema = z.infer<typeof RegisterUserSchema>;

export const LoginUserSchema = z.object({
  email: z.string().email('Please give a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.')
});

export type LoginUserSchema = z.infer<typeof LoginUserSchema>;
