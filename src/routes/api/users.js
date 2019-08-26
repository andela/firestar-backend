import { Router } from 'express';
import { SendVerificationEmail } from '../../middlewares/mail';
import { signUp, confirmVerificaionToken } from '../../controllers/user';

const router = Router();

router.post('/email-test', SendVerificationEmail, signUp);

router.get('email/verify', confirmVerificaionToken);

export default router;
