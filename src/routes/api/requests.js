import { Router } from 'express';
import requestController from '../../controllers/requestController';
import { validateTripRequest, checkPreviousRequest, validateTripData } from '../../middlewares/trips';
import isLoggedIn from '../../middlewares/login';
import { permit } from '../../middlewares/users';
import { roleIds } from '../../helpers/default';

const router = Router();


router.post('/requests', [isLoggedIn, permit([roleIds.requster]), validateTripRequest, validateTripData, checkPreviousRequest], requestController.createTrip);

export default router;
