import { Router } from 'express';
import { SendVerificationEmail, handleInvalidEmail, handleEmptyEmailBody } from '../../middlewares/mail';
import { authorization, jwtVerify } from '../../middlewares/auth/auth';
import { validationForSignUp } from '../../middlewares/validation/validation';
import emailController from '../../controllers/emailController';
import userController from '../../controllers/userController';
import index from '../../controllers/indexController';

const router = Router();

router.post('/users/email/test', handleEmptyEmailBody, handleInvalidEmail,

  SendVerificationEmail, emailController.signUp);

router.post('/users/auth/register', validationForSignUp, SendVerificationEmail, userController.addUser);

router.get('/users/email/verify', emailController.confirmEmailVerificaionToken);

/**
 * Example of how to make use of a protected route
 * Simply call the authorization and jwtVerify middleware in the route in want
 * to protect
 */
router.get('/users/myaccount', authorization, jwtVerify, index.Welcome);

export default router;
