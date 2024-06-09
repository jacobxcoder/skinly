import { Router } from 'express';
import { upload } from '@/middleware/multer';
import { uploadSelfie } from '@/controllers/selfie.controller';
import { authenticate } from '@/middleware/authenticate';

const router = Router();

router.post('/upload', upload.single('file'), authenticate, uploadSelfie);

export default router;
