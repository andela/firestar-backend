import { Router } from 'express';
import { SendVerificationEmail } from '../../middlewares/mail';
import { signUp } from '../../controllers/user';

const router = Router();

router.post('/email-test', SendVerificationEmail, signUp);

export default router;
