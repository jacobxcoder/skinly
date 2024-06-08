import { Request, Response } from 'express';
import * as authService from '@/services/auth.service';

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await authService.register(email, password);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const session = await authService.login(email, password);

    res.cookie('token', session?.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });
    res.json(session);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function logout(req: Request, res: Response) {
  try {
    await authService.logout();
    res.status(204).end();
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function getUser(req: Request, res: Response) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  try {
    const user = await authService.getUser(token);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
}
