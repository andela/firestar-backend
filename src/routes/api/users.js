import { Router } from 'express';
import { SendVerificationEmail, handleInvalidEmail, handleEmptyEmailBody } from '../../middlewares/mail';
import { authorization, jwtVerify } from '../../middlewares/auth/auth';
import { validationForSignUp } from '../../middlewares/validation/validation';
import emailverification from '../../controllers/emailController';
import userController from '../../controllers/userController';

const router = Router();

router.post('/users/email/test', handleEmptyEmailBody, handleInvalidEmail,

  SendVerificationEmail, emailverification.signUp);

router.post('/users/auth/register', validationForSignUp, SendVerificationEmail, userController.addUser);

router.get('/users/email/verify', emailverification.confirmEmailVerificaionToken);

/**
 * Example of how to make use of a protected route middleware
 */
router.post('/users/myaccount', authorization, jwtVerify);

export default router;
