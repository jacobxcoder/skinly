import { Request, Response, NextFunction } from 'express';

export function authorize(req: Request, res: Response, next: NextFunction) {
  const userId = req.params.user_id;
  const loggedInUserId = req?.user?.id;

  if (!loggedInUserId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (userId !== loggedInUserId) {
    return res.status(403).json({ error: 'Unauthorized to access this resource' });
  }

  next();
}
