import { Router } from 'express';
import Requests from '../../controllers/Requests';

const router = Router();

router.get('/:userId', Requests.getAUserRequest);

export default router;
