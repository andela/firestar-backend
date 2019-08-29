import { Router } from 'express';
import UserController from '../../controllers/userController';

const router = Router();

router.get('/users/:id', UserController.getUserProfile);
router.patch('/users/:id', UserController.updateUserProfile);

export default router;
