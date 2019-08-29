import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { findByEmail } from '../utils/searchDb';
import permissions from './api/permissions';
import userRole from './api/roles';

const router = Router();

router.use(userRole);
router.use(permissions);
router.post('/auth/login', async (req, res, next) => {
  try {
    const user = await findByEmail(req.body.email);
    const { id, roleId } = user;
    let token = await jwt.sign({ id, roleId }, process.env.SECRET);
    token = `Bearer ${token}`;
    res
      .status(200)
      .header('x-auth-access', token)
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
