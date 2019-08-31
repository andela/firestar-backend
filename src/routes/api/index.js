import { Router } from 'express';
import permissions from './permissions';
import userRole from './roles';
import users from './users';

const router = Router();

router.use(userRole);
router.use(permissions);
router.use(users);

export default router;
