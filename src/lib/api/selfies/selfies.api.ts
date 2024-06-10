// @todo: fix error handling here

import { supabase, type Database } from '$lib/api';
import { getUser } from '$lib/api/auth';
import { generateUUID } from '$lib/utils/uuid';

export async function uploadSelfie(file: File, date: Date | number | string) {
  // Step 1: Make sure that the user is authenticated
  const user = await getUser();

  if (!user) {
    throw new Error('User is not authenticated');
  }

  // Step 2: Upload selfie to storage
  const fileExt = file.name.split('.').pop();
  const fileName = `${generateUUID()}-${Date.now()}`;

  const { data, error } = await supabase.storage
    .from('selfies')
    .upload(`${user.id}/${fileName}.${fileExt}`, file);

  if (error) {
    throw new Error(`Failed to upload selfie: ${error.message}`);
  }

  // Step 3: Store selfie metadata in a table
  const _date = new Date(date);
  _date.setHours(0, 0, 0, 0);
  const timestampz = new Date(_date).toISOString();

  const { error: metadataError } = await supabase.from('selfie_uploads').insert([
    {
      user_id: user.id,
      url: data.path,
      date: timestampz
    }
  ]);

  if (metadataError) {
    throw new Error(`Failed to store selfie metadata: ${metadataError.message}`);
  }

  return true;
}

export async function getSelfiesByDate(date: Date | number | string) {
  const user = await getUser();

  if (!user) {
    throw new Error('User is not authenticated');
  }

  const _date = new Date(date);
  _date.setHours(0, 0, 0, 0);
  const timestampz = new Date(_date).toISOString();

  const { data, error } = await supabase
    .from('selfie_uploads')
    .select('*')
    .eq('user_id', user.id)
    .eq('date', timestampz);

  if (error) {
    throw new Error(`Failed to fetch selfies: ${error.message}`);
  }

  return data;
}

export async function getSelfiesURLsByDate(date: Date | number | string) {
  let selfies: Database['public']['Tables']['selfie_uploads']['Row'][] | undefined;

  try {
    selfies = await getSelfiesByDate(date);
  } catch (e) {
    return [];
  }

  if (!selfies) {
    return [];
  }

  const { data: urls, error } = await supabase.storage.from('selfies').createSignedUrls(
    selfies.map((selfie) => selfie.url || ''),
    60
  );

  if (error) {
    return [];
  }

  console.log('urls: ', urls);
  return urls;
}
