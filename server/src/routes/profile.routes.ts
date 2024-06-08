import { Router } from 'express';
import { authenticate } from '@/middleware/authenticate';
import { authorize } from '@/middleware/authorize';
import * as profileController from '@/controllers/profile.controller';

const router = Router();

router.post('/', authenticate, profileController.createProfile);
// @todo: for now, can only get own profile, in the future will have to change that
router.get('/:user_id', authenticate, authorize, profileController.getProfile);
router.put('/:user_id', authenticate, authorize, profileController.updateProfile);

export default router;
