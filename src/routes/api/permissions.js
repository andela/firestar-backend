import { Router } from 'express';
import Permssions from '../../controllers/permissions';
import { validateSetPermission, permit } from '../../middlewares/permissions';
import isLoggedIn from '../../middlewares/login';

const router = Router();

router.patch('/roles/:roleId/permissions', [isLoggedIn, validateSetPermission, permit], Permssions.setPermissions);

export default router;
