import { Router } from 'express';
import { SendVerificationEmail, handleInvalidEmail, handleEmptyEmailBody } from '../../middlewares/mail';
import { validationForSignUp } from '../../middlewares/validation/validation';
import emailverification from '../../controllers/emailController';
import userController from '../../controllers/userController';

const router = Router();

router.post('/users/email/test', handleEmptyEmailBody, handleInvalidEmail,

  SendVerificationEmail, emailverification.signUp);

router.post('/users/auth/register', validationForSignUp, SendVerificationEmail, userController.addUser);

router.get('/users/email/verify', emailverification.confirmEmailVerificaionToken);

export default router;
