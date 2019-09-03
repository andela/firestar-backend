import { Router } from 'express';
import permissions from './roles';
import users from './users';

const router = Router();

router.use(permissions);
router.use(users);

export default router;
