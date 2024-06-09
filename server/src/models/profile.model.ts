import { supabase } from '@/integrations/supabase';
import { z } from 'zod';
import {
  Profile,
  CreateProfileSchema,
  UpdateProfileSchema
} from '@/validators/profile.validator';

// Retrieve a user's profile by their user ID
export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from<Profile>('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }

  return data;
}

// Create a new user profile
export async function createProfile(
  profileData: z.infer<typeof CreateProfileSchema>
): Promise<Profile> {
  // Validate input data
  const validData = CreateProfileSchema.parse(profileData);

  const { data, error } = await supabase.from<Profile>('profiles').insert([validData]);

  if (error) {
    throw new Error(`Failed to create profile: ${error.message}`);
  }

  return data[0];
}

// Update a user profile
export async function updateProfile(
  userId: string,
  profileData: z.infer<typeof UpdateProfileSchema>
): Promise<Profile> {
  const validData = UpdateProfileSchema.parse(profileData);

  const { data, error } = await supabase
    .from<Profile>('profiles')
    .update(validData)
    .eq('user_id', userId);

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`);
  }

  return data[0];
}
