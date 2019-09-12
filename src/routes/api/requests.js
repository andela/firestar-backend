import { Router } from 'express';
import requestController from '../../controllers/requestController';
import { validateInput, setManager, validateLogic } from '../../middlewares/trips'

const router = Router();


router.post('/requests', [validateInput, validateLogic, setManager], requestController.createTrip);
router.get('/requests', requestController.getRequest)

export default router;
