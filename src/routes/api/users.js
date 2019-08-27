import { Router } from 'express';
import { SendVerificationEmail } from '../../middlewares/mail';
import emailverification from '../../controllers/emailController';

const router = Router();

router.post('/email/test', SendVerificationEmail, emailverification.signUp);

router.get('/email/verify', emailverification.confirmEmailVerificaionToken);

export default router;
