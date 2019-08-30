import { Router } from 'express';
import { SendVerificationEmail, handleInvalidEmail, handleEmptyEmailBody } from '../../middlewares/mail';
import emailverification from '../../controllers/emailController';
import userController from '../../controllers/userController';
import validate from '../../middlewares/validate';

const { forgetPasswordCheck, resetPasswordCheck } = validate;
const { forgotPassword, resetPassword } = userController;

const router = Router();

router.post('/users/email/test', handleEmptyEmailBody, handleInvalidEmail, SendVerificationEmail, emailverification.signUp);

router.get('/users/email/verify', emailverification.confirmEmailVerificaionToken);

// @route POST /api/v1/users/forgotpassword
// @desc Generate User Password Reset / Returning JWT Token
// @access Public
router.post('/users/passwords/forgot', forgetPasswordCheck, forgotPassword);

// @route POST /api/v1/users/resetpassword/:id/
// @desc Resets a User Password / Returns a new Password
// @access Public
router.post('/users/passwords/reset/:id', resetPasswordCheck, resetPassword);

export default router;
