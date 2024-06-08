import { Request, Response } from 'express';
import * as profileService from '@/services/profile.service';
import logger from '@/shared/logger';

export async function createProfile(req: Request, res: Response) {
  logger.info('[profile.controller] creating a profile: ', req.body);

  try {
    const profile = await profileService.createProfile(req.body);
    logger.info('[profile.controller] successfully created the profile: ', profile);
    res.status(201).json(profile);
  } catch (error) {
    logger.warn('[profile.controller] error creating the profile: ', error);
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Could not create a profile.'
    });
  }
}

export async function updateProfile(req: Request, res: Response) {
  const { user_id } = req.params;

  try {
    const profile = await profileService.updateProfile(user_id, req.body);
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Could not update the profile.'
    });
  }
}

export async function getProfile(req: Request, res: Response) {
  const { user_id } = req.params;
  logger.info('[profile.controller] getting profile for user_id: ', user_id);

  try {
    const profile = await profileService.getProfile(user_id);
    logger.info('[profile.controller] successfully fetched the profile: ', profile);
    res.status(200).json(profile);
  } catch (error) {
    logger.warn('[profile.controller] error fetching the profile: ', error);
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Could not get the profile.'
    });
  }
}
