import { Router } from 'express';
// import passport from 'passport';
import UsersController from '../../controllers/userController';
import UsersValidation from '../../validation/userValidation';

const router = Router();


router.post('/users/login', UsersValidation.ValidateUserSignIn, UsersController.loginAUser);


export default router;
