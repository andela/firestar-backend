import { Router } from 'express';
import Requests from '../../controllers/Requests';
import ProtectRoutes from '../../middlewares/ProtectRoutes';

const router = Router();

router.get('/users/:userId/requests', ProtectRoutes.authenticate, Requests.getAUserRequest);

export default router;
