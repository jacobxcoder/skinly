import { supabase, SupabaseError } from '@/integrations/supabase';
import logger from '@/shared/logger';

export async function createProfile(profileData: {
  email: string;
  username: string;
  bio: string;
  user_id: string;
}) {
  const { data, error } = await supabase.from('profiles').insert([profileData]);

  if (error?.code === SupabaseError.DUPLICATE_USERNAME) {
    logger.info(
      '[profile.service] could not create a profile because the username is taken: ',
      error
    );
    throw new Error('Username already taken');
  } else if (error) {
    logger.error('[profile.service] error creating a profile: ', error);
    throw new Error('Could not create a profile');
  }

  logger.success('[profile.service] successfully created a profile: ', data);
  return data;
}

export async function updateProfile(
  user_id: string,
  updates: { email?: string; username?: string; bio?: string }
) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .match({ user_id });

  if (error?.code === SupabaseError.DUPLICATE_USERNAME) {
    logger.info(
      '[profile.service] could not update a profile because the username is taken: ',
      error
    );
    throw new Error('Username already taken');
  } else if (error) {
    logger.error('[profile.service] error updating a profile: ', error);
    throw new Error('Could not update a profile');
  }

  return data;
}

export async function getProfile(user_id: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user_id)
    .single();

  // this is an error code for "no results found"
  // if no results found, we want to return null instead of throwing an error
  if (error && error.code !== 'PGRST116') throw new Error(error.message);

  return data;
}
