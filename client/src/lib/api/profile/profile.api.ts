import server from '$lib/api';
import { z } from 'zod';
import {
  CreateProfileSchema,
  UpdateProfileSchema,
  ProfileResponseSchema
} from './profile.validator';

export async function createProfile(profileData: z.infer<typeof CreateProfileSchema>) {
  const parsedData = CreateProfileSchema.parse(profileData);
  const response = await server.post('/profile', parsedData);
  return ProfileResponseSchema.parse(response.data);
}

export async function getProfile(userId: string) {
  const response = await server.get(`/profile/${userId}`);
  console.log('response data: ', response.data);
  return ProfileResponseSchema.parse(response?.data);
}

export async function updateProfile(
  userId: string,
  profileData: z.infer<typeof UpdateProfileSchema>
) {
  const parsedData = UpdateProfileSchema.parse(profileData);
  const response = await server.put(`/profile/${userId}`, parsedData);
  return ProfileResponseSchema.parse(response.data);
}
