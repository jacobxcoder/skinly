import { Request, Response } from 'express';
import * as authService from '@/services/auth.service';
import logger from '@/shared/logger';

export async function register(req: Request, res: Response) {
  logger.info('[auth.controller] Registering user for email:', req.body.email);

  const { email, password } = req.body;

  try {
    const user = await authService.register(email, password);
    logger.success('[auth.controller] User registered successfully:', user);
    res.json(user);
  } catch (error) {
    logger.error('[auth.controller] Could not register user:', error);
    res.status(400).json(error);
  }
}

export async function login(req: Request, res: Response) {
  logger.info('[auth.controller] Logging in user for email:', req.body.email);
  const { email, password } = req.body;

  try {
    const session = await authService.login(email, password);

    logger.success('[auth.controller] User logged in successfully:', session);

    res.cookie('token', session?.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });

    res.json(session);
  } catch (error) {
    logger.warn('[auth.controller] Could not log in user:', error);
    res.status(400).json(error);
  }
}

export async function logout(req: Request, res: Response) {
  logger.info('[auth.controller] Logging out user...');

  try {
    await authService.logout();
    logger.success('[auth.controller] User logged out successfully.');
    res.clearCookie('token');
    res.status(204).end();
  } catch (error) {
    logger.error('[auth.controller] Could not log out user:', error);
    res.status(400).json(error);
  }
}

export async function getUser(req: Request, res: Response) {
  logger.info('[auth.controller] Getting user...');
  const token = req.cookies.token;

  if (!token) {
    logger.warn('[auth.controller] Unauthorized user tried to getUser.');
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  try {
    const user = await authService.getUser(token);
    logger.success('[auth.controller] User fetched successfully:', user);
    res.json(user);
  } catch (error) {
    logger.error('[auth.controller] Could not get user:', error);
    res.status(400).json(error);
  }
}
