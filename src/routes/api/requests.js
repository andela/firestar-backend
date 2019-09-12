import { Router } from 'express';
import requestController from '../../controllers/requestController';
import { validateRequestInput, validateTripInput, validateTripData } from '../../middlewares/trips';

const router = Router();


router.post('/requests', [validateRequestInput, validateTripData, validateTripInput], requestController.createTrip);

export default router;
