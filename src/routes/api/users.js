import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { SendVerificationEmail, handleInvalidEmail, handleEmptyEmailBody } from '../../middlewares/mail';
import emailverification from '../../controllers/emailController';
import { validateSetRole, permit, checkRoleConflict } from '../../middlewares/users';
import isLoggedIn from '../../middlewares/login';
import { roleIds } from '../../helpers/default';
import userController from '../../controllers/userController';
import validate from '../../middlewares/validate';
import { findByEmail } from '../../utils/searchDb';


const { forgotPasswordCheck, resetPasswordCheck } = validate;
const { forgotPassword, resetPassword } = userController;

const router = Router();

router.post('/users/email/test', handleEmptyEmailBody, handleInvalidEmail, SendVerificationEmail, emailverification.signUp);

router.get('/users/email/verify', emailverification.confirmEmailVerificaionToken);
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
