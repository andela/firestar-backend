import { Router } from 'express';
import Root from '../../controllers/index';

const router = Router();
router.get('/', Root.getRoot);

export default router;
