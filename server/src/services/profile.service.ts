import { supabase } from '@/integrations/supabase';

export async function createProfile(profileData: {
  email: string;
  username: string;
  bio: string;
  user_id: string;
}) {
  const { data, error } = await supabase.from('profiles').insert([profileData]);
  if (error) throw new Error(error.message);
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

  if (error) throw new Error(error.message);
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
