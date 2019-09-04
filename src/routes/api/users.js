import { Router } from 'express';
import { SendVerificationEmail, handleInvalidEmail, handleEmptyEmailBody } from '../../middlewares/mail';
import emailverification from '../../controllers/emailController';
import UserController from '../../controllers/userController';
import Helper from '../../middlewares/index'
import { validateProfileData } from '../../validation/userValidation'

const router = Router();

router.get('/users/:id', UserController.getUserProfile);
router.patch('/users/:id', validateProfileData, Helper.verifyToken, UserController.updateUserProfile);

router.post('/users/email/test', handleEmptyEmailBody, handleInvalidEmail,
    SendVerificationEmail, emailverification.signUp);

router.get('/users/email/verify', emailverification.confirmEmailVerificaionToken);

export default router;
