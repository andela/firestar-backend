import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { findByEmail } from '../utils/searchDb';
import routes from './api';

const router = Router();

router.use('/api/v1', routes);
router.post('/api/v1/auth/login', async (req, res, next) => {
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
