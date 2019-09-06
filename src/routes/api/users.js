import { Router } from 'express';
import { SendVerificationEmail, handleInvalidEmail, handleEmptyEmailBody } from '../../middlewares/mail';
import { authorization, jwtVerify } from '../../middlewares/auth/auth';
import { validationForSignUp } from '../../middlewares/validation/validation';
import emailController from '../../controllers/emailController';
import userController from '../../controllers/userController';
import index from '../../controllers/indexController';
import validate from '../../middlewares/validate';

const { forgotPasswordCheck, resetPasswordCheck } = validate;
const { forgotPassword, resetPassword } = userController;

const router = Router();

router.post('/users/email/test', handleEmptyEmailBody, handleInvalidEmail, SendVerificationEmail, emailController.signUp);

router.post('/users/auth/register', validationForSignUp, SendVerificationEmail, userController.addUser);

router.get('/users/email/verify', emailController.confirmEmailVerificaionToken);

/**
 * Example of how to make use of a protected route
 * Simply call the authorization and jwtVerify middleware in the route you want
 * to protect
 */
router.get('/users/myaccount', authorization, jwtVerify, index.Welcome);

// @route POST /api/v1/users/forgotpassword
// @desc Generate User Password Reset / Returning JWT Token
// @access Public
router.post('/users/passwords/forgot', forgotPasswordCheck, forgotPassword);

// @route POST /api/v1/users/resetpassword/:id/
// @desc Resets a User Password / Returns a new Password
// @access Public
router.post('/users/passwords/reset/:userId', resetPasswordCheck, resetPassword);

export default router;
