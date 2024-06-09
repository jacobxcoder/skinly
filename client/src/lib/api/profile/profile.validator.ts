import { z } from 'zod';

export const profileSchema = z.object({
  id: z.string().or(z.number()),
  email: z.string().email(),
  username: z.string(),
  bio: z.string().optional().nullable(),
  user_id: z.string()
});

export type Profile = z.infer<typeof profileSchema>;

export const CreateProfileSchema = profileSchema.omit({ id: true }).extend({
  user_id: z.string()
});

export const UpdateProfileSchema = profileSchema
  .partial()
  .omit({ id: true, user_id: true });

export const ProfileResponseSchema = profileSchema.nullable();
