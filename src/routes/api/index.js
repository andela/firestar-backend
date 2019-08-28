import { Router } from 'express';
import users from './users';

const router = Router();

router.use('/v1', users);

export default router;
