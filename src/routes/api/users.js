import { Router } from 'express';
<<<<<<< HEAD
import UserController from '../../controllers/userController';
import Helper from '../../middlewares/index'
import { validateProfileData } from '../../validation/userValidation'
const router = Router();

router.get('/users/:id', UserController.getUserProfile);
router.patch('/users/:id', validateProfileData, Helper.verifyToken, UserController.updateUserProfile);
=======
import { SendVerificationEmail, handleInvalidEmail, handleEmptyEmailBody } from '../../middlewares/mail';
import emailverification from '../../controllers/emailController';

const router = Router();

router.post('/users/email/test', handleEmptyEmailBody, handleInvalidEmail,

  SendVerificationEmail, emailverification.signUp);

router.get('/users/email/verify', emailverification.confirmEmailVerificaionToken);
>>>>>>> 7424b29894313d16254e8558e4fbae426c4942d9

export default router;
