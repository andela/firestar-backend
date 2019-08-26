import { Router } from 'express';
import changeRole from '../../controllers/roles';
import validateSetRole from '../../middlewares/userRole';
import { permit } from '../../middlewares/permissions';
import isLoggedIn from '../../middlewares/req.user';

const router = Router();

router.patch('/users/user/role', [isLoggedIn, validateSetRole, permit], changeRole);


export default router;
