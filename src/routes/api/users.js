import { Router } from 'express';
import UserController from '../../controllers/userController';
import Helper from '../../middlewares/index'
import { validateProfileData } from '../../validation/userValidation'
const router = Router();

router.get('/users/:id', UserController.getUserProfile);
router.patch('/users/:id', validateProfileData, Helper.verifyToken, UserController.updateUserProfile);

export default router;
