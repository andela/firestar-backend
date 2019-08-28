import { Router } from 'express';
import ProfileController from '../../controllers/profileController';

const router = Router();

router.get('/editprofile/:id', ProfileController.getUser);
router.patch('/editprofile/:id', ProfileController.updateProfile);

export default router;
