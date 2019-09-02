import { Router } from 'express';
import UserController from '../../controllers/userController';
import Helper from '../../middlewares/index'

const router = Router();

router.get('/users/:id', UserController.getUserProfile);
router.patch('/users/:id', Helper.verifyToken, UserController.updateUserProfile);

export default router;
