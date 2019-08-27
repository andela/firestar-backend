import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { findByEmail } from '../utils/searchDb';
import permissions from './api/permissions';
import userRole from './api/roles';

const router = Router();

router.use(userRole);
router.use(permissions);
router.post('/auth/login', async (req, res) => {
  try {
    const user = await findByEmail(req.body.email);
    const { id, roleId } = user;
    const token = await jwt.sign({ id, roleId }, process.env.secret);
    res
      .status(200)
      .header('x-access-auth', token)
      .json({
        token,
        data: user
      });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
