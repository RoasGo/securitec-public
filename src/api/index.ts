import { Router } from 'express';

import publicRoute from './public/public.route';

const router: Router = Router();

router.use('/public', publicRoute);

export default router;
