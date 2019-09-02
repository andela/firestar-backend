import { Router } from 'express';
import UserController from '../../controllers/userController';
import Helper from '../../middlewares/index'
import CheckValidInput from '../../validation/index'

const router = Router();

router.get('/users/:id', UserController.getUserProfile);
router.patch('/users/:id', Helper.verifyToken, UserController.updateUserProfile);

export default router;
