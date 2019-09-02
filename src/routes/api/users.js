import { Router } from 'express';
import UsersController from '../../controllers/authController';
import UsersValidation from '../../validation/userValidation';

const router = Router();


router.post('/users/login', UsersValidation.ValidateUserSignIn, UsersController.loginAUser);


export default router;
