import { Router } from 'express';
import users from './users';
import requests from './requests';
import auth from './auth';

const router = Router();

router.use(users);
router.use(requests);
router.use(auth);

export default router;
