import { Router } from 'express';
import { SendVerificationEmail, handleInvalidEmail, handleEmptyEmailBody } from '../../middlewares/mail';
import emailverification from '../../controllers/emailController';
import Users from '../../controllers/userController';
import validateSetRole from '../../middlewares/users';
import { permit } from '../../middlewares/permissions';
import isLoggedIn from '../../middlewares/login';

const router = Router();

router.post('/users/email/test', handleEmptyEmailBody, handleInvalidEmail,

  SendVerificationEmail, emailverification.signUp);

router.get('/users/email/verify', emailverification.confirmEmailVerificaionToken);
router.patch('/users/edit/role', [isLoggedIn, validateSetRole, permit], Users.changeRole);

export default router;
