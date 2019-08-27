import { Router } from 'express';
import Users from '../../controllers/users';
import validateSetRole from '../../middlewares/userRole';
import { permit } from '../../middlewares/permissions';
import isLoggedIn from '../../middlewares/req.user';

const router = Router();

router.patch('/roles/user/role', [isLoggedIn, validateSetRole, permit], Users.changeRole);


export default router;
