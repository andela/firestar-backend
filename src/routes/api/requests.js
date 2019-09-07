import { Router } from 'express';
import Requests from '../../controllers/Requests';

const router = Router();

router.get('/users/:userId/requests', Requests.getAUserRequest);

export default router;
