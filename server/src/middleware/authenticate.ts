import { Request, Response, NextFunction } from 'express';
import { supabase } from '@/integrations/supabase';

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const {
      data: { user },
      error
    } = await supabase.auth.getUser(token);

    if (error) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user || undefined;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
