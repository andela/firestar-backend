import { Router } from 'express';
import UserController from '../../controllers/index';

const router = Router();

router.patch('/user/:id', UserController.updateProfile);

export default router;
