import { Router } from 'express';
import permissions from './api/permissions';
import userRole from './api/users';

const router = Router();

router.use(userRole);
router.use(permissions);

export default router;
