import { Router } from 'express';
import permissions from './permissions';
import userRole from './roles';

const router = Router();

router.use(userRole);
router.use(permissions);

export default router;
