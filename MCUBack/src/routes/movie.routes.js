import { Router } from 'express';
import { getAllMovies, getMovieByTitle, updateMovie } from '../controllers/movie.controller.js';
import { requireModeratorRoleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();

router.get('/', getAllMovies);
router.get('/:title', getMovieByTitle);

router.put('/:id', requireModeratorRoleMiddleware, updateMovie);
export default router;
