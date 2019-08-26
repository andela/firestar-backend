import { Router } from 'express';
import setPermission from '../../controllers/permissions';
import { validateSetPermission, permit } from '../../middlewares/permissions';
import isLoggedIn from '../../middlewares/req.user';

const router = Router();

router.patch('/roles/:roleId/permissions', [isLoggedIn, validateSetPermission, permit], setPermission);

export default router;
