import { Router } from 'express';
import { getAllMovies, getMovieByTitle } from '../controllers/movie.controller.js';

const router = Router();

router.get('/', getAllMovies);
router.get('/:title', getMovieByTitle);

export default router;
