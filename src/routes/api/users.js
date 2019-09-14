import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { SendVerificationToken, handleInvalidEmail, handleEmptyEmailBody } from '../../middlewares/mail';
import { authorization } from '../../middlewares/auth';
import {
  validationForSignUp, ValidationForEmptySignUpBody, ValidateEmptySignUpBodyProperty,
  EmptySignUpBodyPropertyValue
} from '../../middlewares/validation';
import emailController from '../../controllers/emailController';
import { validateSetRole, permit, checkRoleConflict } from '../../middlewares/users';
import isLoggedIn from '../../middlewares/login';
import { roleIds } from '../../helpers/default';
import userController from '../../controllers/userController';
import indexController from '../../controllers/indexController';
import validate from '../../middlewares/validate';
import { findByEmail } from '../../utils/searchDb';


const { forgotPasswordCheck, resetPasswordCheck } = validate;
const { forgotPassword, resetPassword } = userController;

const router = Router();

router.post('/users/email/test', handleEmptyEmailBody, handleInvalidEmail, SendVerificationToken,
  emailController.signUp);

router.post('/users/auth/register', ValidationForEmptySignUpBody, ValidateEmptySignUpBodyProperty,

  EmptySignUpBodyPropertyValue, validationForSignUp, SendVerificationToken, userController.addUser);

router.get('/users/email/verify', emailController.confirmEmailVerificaionToken);

/**
 * Example of how to make use of a protected route
 * Simply call the authorization and jwtVerify middleware in the route you want
 * to protect
 */
router.get('/users/myaccount', authorization, indexController.Welcome);

router.patch('/users/roles', [isLoggedIn, validateSetRole, permit([roleIds.superAdmin]), checkRoleConflict], userController.changeRole);

router.get('/users/email/verify', emailController.confirmEmailVerificaionToken);
router.patch('/users/roles', [isLoggedIn, validateSetRole, permit([roleIds.superAdmin]), checkRoleConflict], userController.changeRole);
router.post('/auth/login', async (req, res, next) => {
  try {
    const user = await findByEmail(req.body.email);

    const { id, roleId, email } = user;
    const token = await jwt.sign({ id, roleId, email }, process.env.JWT_SECRET);
    res
      .status(200)
      .header('authorization', token)
      .json({
        token,
        data: user
      });
  } catch (error) {
    error.status = 404;
    next(error);
  }
});

// @route POST /api/v1/users/forgotpassword
// @desc Generate User Password Reset / Returning JWT Token
// @access Public
router.post('/users/passwords/forgot', forgotPasswordCheck, forgotPassword);

// @route POST /api/v1/users/resetpassword/:id/
// @desc Resets a User Password / Returns a new Password
// @access Public
router.post('/users/passwords/reset/:userId', resetPasswordCheck, resetPassword);

export default router;
