import { Router } from 'express';
import {SendEmail} from '../../controllers/user';

const router = Router();

router.post('/email-test', SendEmail);

export default router;
