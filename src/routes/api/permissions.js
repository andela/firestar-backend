import { Router } from 'express';
import Permssions from '../../controllers/permissions';
import { validateSetPermission, permit } from '../../middlewares/permissions';
import isLoggedIn from '../../middlewares/req.user';

const router = Router();

router.patch('/roles/:roleId/permissions', [isLoggedIn, validateSetPermission, permit], Permssions.setPermissions);

export default router;
