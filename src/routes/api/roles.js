import { Router } from 'express';
import Permssions from '../../controllers/roleController';
import { validateSetPermission, permit, checkResource } from '../../middlewares/permissions';
import isLoggedIn from '../../middlewares/login';

const router = Router();

router.patch('/roles/:roleId/permissions', [isLoggedIn, validateSetPermission, permit, checkResource], Permssions.setPermissions);

export default router;
