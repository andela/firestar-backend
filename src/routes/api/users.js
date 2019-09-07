import { Router } from 'express';
import UsersController from '../../controllers/userController';
import { validationForSignIn } from '../../middlewares/validation/validation';
import { SendVerificationEmail, handleInvalidEmail, handleEmptyEmailBody } from '../../middlewares/mail';
import emailverification from '../../controllers/emailController';


const router = Router();


router.post('/users/auth/login', validationForSignIn, UsersController.loginAUser);

router.post('/users/email/test', handleEmptyEmailBody, handleInvalidEmail,

  SendVerificationEmail, emailverification.signUp);

router.get('/users/email/verify', emailverification.confirmEmailVerificaionToken);


export default router;
