import { Router } from 'express';
import UsersController from '../../controllers/authController';
import UsersValidation from '../../validation/userValidation';
import { SendVerificationEmail, handleInvalidEmail, handleEmptyEmailBody } from '../../middlewares/mail';
import emailverification from '../../controllers/emailController';


const router = Router();


router.post('/users/login', UsersValidation.ValidateUserSignIn, UsersController.loginAUser);

router.post('/users/email/test', handleEmptyEmailBody, handleInvalidEmail,

  SendVerificationEmail, emailverification.signUp);

router.get('/users/email/verify', emailverification.confirmEmailVerificaionToken);

export default router;
