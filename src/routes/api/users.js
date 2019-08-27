import { Router } from 'express';
import ProfileController from '../../controllers/profileController';

const router = Router();

router.patch('/user/:id', ProfileController.updateProfile);

export default router;
