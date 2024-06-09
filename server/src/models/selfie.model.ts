import { supabase } from '@/integrations/supabase';
import { generateUUID } from '@/shared/uuid';
import logger from '@/shared/logger';

export async function uploadSelfieToStorage(userId: string, file: Express.Multer.File) {
  const fileExt = file.originalname.split('.').pop();
  const fileName = `${generateUUID()}-${Date.now()}.${fileExt}`;
  const filePath = `abc/${fileName}`;

  const result = await supabase.auth.getSession();
  console.log('session: ', result);

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('selfies')
    .upload(`${userId}/avatar1.jpg`, file.buffer, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    logger.error('[selfie.model] error uploading selfie: ', JSON.stringify(uploadError));
    throw new Error(uploadError.message);
  }

  const {
    data: { publicUrl }
  } = supabase.storage.from('selfies').getPublicUrl(filePath);

  logger.success('[selfie.model] successfully uploaded image: ', uploadData);
  return publicUrl;
}

export async function storeSelfieMetadata(userId: string, url: string, date: Date) {
  const { data, error } = await supabase.from('selfie_uploads').insert([
    {
      user_id: userId,
      url,
      date
    }
  ]);

  if (error) {
    logger.error('[selfie.model] error storing selfie metadata: ', error);
    throw new Error(error.message);
  }

  logger.success('[selfie.model] successfully stored selfie metadata: ', data);
  return data;
}

export async function getSelfiesByDate(userId: number, date: string) {
  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);

  const { data, error } = await supabase
    .from('selfie_uploads')
    .select('*')
    .eq('user_id', userId)
    .gte('date', startDate.toISOString())
    .lte('date', endDate.toISOString());

  return { data, error };
}
