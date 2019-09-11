import { Router } from 'express';
import { SendVerificationEmail, handleInvalidEmail, handleEmptyEmailBody } from '../../middlewares/mail';
import emailverification from '../../controllers/emailController';
import { validateSetRole, permit, checkRoleConflict } from '../../middlewares/users';
import isLoggedIn from '../../middlewares/login';
import { roleIds } from '../../helpers/default';
import userController from '../../controllers/userController';
import validate from '../../middlewares/validate';

const { forgotPasswordCheck, resetPasswordCheck, loginCheck } = validate;
const { forgotPassword, resetPassword, loginAUser } = userController;

const router = Router();

// @route POST /api/v1/users/auth/login
// @desc Logins a verified User / Set JWT Token in cookies
// @access Public
router.post('/users/auth/login', loginCheck, loginAUser);

router.post('/users/email/test', handleEmptyEmailBody, handleInvalidEmail, SendVerificationEmail, emailverification.signUp);

router.get('/users/email/verify', emailverification.confirmEmailVerificaionToken);
router.patch('/users/roles', [isLoggedIn, validateSetRole, permit([roleIds.superAdmin]), checkRoleConflict], userController.changeRole);

// @route POST /api/v1/users/passwords/forgot
// @desc Generate User Password Reset / Returning JWT Token
// @access Public
router.post('/users/passwords/forgot', forgotPasswordCheck, forgotPassword);

// @route POST /api/v1/users/passwords/reset/:userId/
// @desc Resets a User Password / Returns a new Password
// @access Public
router.post('/users/passwords/reset/:userId', resetPasswordCheck, resetPassword);


export default router;
