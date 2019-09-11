import { Router } from 'express';
import requestController from '../../controllers/requestController';
import ValidateTrip from '../../middlewares/trips'

const router = Router();


router.post('/requests', [ValidateTrip], requestController.createTrip);
router.get('/requests', requestController.getRequest)

export default router;
