import { Router } from 'express';
import Auth from '../../controllers/Auth';


const router = Router();

router.post('/auth/users/signup', Auth.signup);

export default router;
