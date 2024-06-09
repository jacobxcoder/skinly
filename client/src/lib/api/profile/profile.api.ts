import server from '$lib/api';
import { z } from 'zod';
import {
  CreateProfileSchema,
  UpdateProfileSchema,
  ProfileResponseSchema
} from './profile.validator';

export async function createProfile(
  profileData: z.infer<typeof CreateProfileSchema> & { user_id: string }
) {
  const parsedData = CreateProfileSchema.parse(profileData);
  const response = await server.post('/profile', parsedData);
  return ProfileResponseSchema.parse(response.data);
}

export async function getProfile(userId: string) {
  const response = await server.get(`/profile/${userId}`);
  return ProfileResponseSchema.parse(response?.data);
}

export async function updateProfile(
  profileData: z.infer<typeof UpdateProfileSchema> & { user_id: string }
) {
  const parsedData = UpdateProfileSchema.parse(profileData);
  const response = await server.put(`/profile/${profileData.user_id}`, parsedData);
  return ProfileResponseSchema.parse(response.data);
}
