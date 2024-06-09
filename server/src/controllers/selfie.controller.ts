import { Request, Response } from 'express';
import logger from '@/shared/logger';
import { storeSelfieMetadata, uploadSelfieToStorage } from '@/models/selfie.model';
import supabase from '@/integrations/supabase';

export async function uploadSelfie(req: Request, res: Response) {
  let url: string = '';

  const file = req?.file;
  const date = req.body?.date;

  if (!req.user?.id) {
    logger.error('[selfie.controller] missing user id in request.');
    return res
      .status(400)
      .json({ message: 'Missing user id (cookie). Try to log out and log in.' });
  }

  if (!file || !date) {
    logger.error('[selfie.controller] missing required fields in request.');
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    url = await uploadSelfieToStorage(req.user.id, file);
  } catch (e) {
    logger.error('[selfie.controller] error uploading selfie: ', e);
    return res.status(500).json({ message: 'Internal error: could not upload selfie.' });
  }

  try {
    const metadata = await storeSelfieMetadata(req.user.id, url, date);
    return res.status(201).json(metadata);
  } catch (e) {
    logger.error('[selfie.controller] error storing selfie metadata: ', e);
    return res.status(500).json({ message: 'Internal error: could not upload selfie.' });
  }
}
