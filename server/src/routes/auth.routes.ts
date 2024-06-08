import { Router } from 'express';
import * as authController from '@/controllers/auth.controller';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/user', authController.getUser);

export default router;
