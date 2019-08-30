import { Router } from 'express';
import userController from '../../controllers/userController';

const router = Router();

const { forgotPassword, resetPassword } = userController;

router.get('/user');

router.put('/user');

router.post('/users');

// @route POST /api/v1/users/forgotpassword
// @desc Generate User Password Reset / Returning JWT Token
// @access Public
router.post('/users/passwords/forgot', forgotPassword);

// @route POST /api/v1/users/resetpassword/:id/
// @desc Resets a User Password / Returns a new Password
// @access Public
router.post('users/passwords/reset/:id', resetPassword);

export default router;
