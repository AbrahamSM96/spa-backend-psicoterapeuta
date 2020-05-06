import { Router } from 'express';
import mail from './mail/index';

const router = new Router();

router.use('/mail', mail);

export default router;
