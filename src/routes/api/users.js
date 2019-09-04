import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { SendVerificationEmail, handleInvalidEmail, handleEmptyEmailBody } from '../../middlewares/mail';
import emailverification from '../../controllers/emailController';
import Users from '../../controllers/userController';
import { validateSetRole, permit } from '../../middlewares/users';
import isLoggedIn from '../../middlewares/login';
import { roleIds } from '../../helpers/default';

import { findByEmail } from '../../utils/searchDb';

const router = Router();

router.post('/users/email/test', handleEmptyEmailBody, handleInvalidEmail,

  SendVerificationEmail, emailverification.signUp);

router.get('/users/email/verify', emailverification.confirmEmailVerificaionToken);
router.patch('/users/edit/role', [isLoggedIn, validateSetRole, permit([roleIds['Super Administrator']])], Users.changeRole);
router.post('/auth/login', async (req, res, next) => {
  try {
    const user = await findByEmail(req.body.email);

    const { id, roleId } = user;
    let token = await jwt.sign({ id, roleId }, process.env.JWT_SECRET);
    token = `Bearer ${token}`;
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

export default router;
