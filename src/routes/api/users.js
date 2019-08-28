import { Router } from 'express';
import { SendVerificationEmail } from '../../middlewares/mail';
import emailverification from '../../controllers/emailController';

const router = Router();

router.post('/users/email/test', SendVerificationEmail, emailverification.signUp);

router.get('/users/email/verify', emailverification.confirmEmailVerificaionToken);

export default router;
