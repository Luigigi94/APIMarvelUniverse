import { Router } from 'express';
import movieRoutes from './movie.routes.js';
import userRoutes from './user.routes.js';

const router = Router();

router.use('/movies', movieRoutes);
router.use('/user', userRoutes);

export default router;
