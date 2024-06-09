// @todo: fix error handling in this file
import { supabase } from '$lib/api';
import { z } from 'zod';
import { CreateProfileSchema, UpdateProfileSchema } from './profile.validator';

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  // @todo: handle this error message
  if (error) {
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }

  return data;
}

export async function createProfile(
  profileData: z.infer<typeof CreateProfileSchema> & { user_id: string }
) {
  const validatedData = CreateProfileSchema.parse(profileData);

  const { error } = await supabase.from('profiles').insert([validatedData]);

  if (error) {
    throw new Error(`Failed to create profile: ${error.message}`);
  }

  return validatedData;
}

export async function updateProfile(
  profileData: z.infer<typeof UpdateProfileSchema> & { user_id: string }
) {
  const validatedData = UpdateProfileSchema.parse(profileData);

  const { error } = await supabase
    .from('profiles')
    .update(validatedData)
    .eq('user_id', profileData.user_id);

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`);
  }

  return validatedData;
}
