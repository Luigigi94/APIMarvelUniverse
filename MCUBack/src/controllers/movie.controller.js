import { getAllMovieList, getMovieBySlugOrTitleService, updateMovieService} from "../services/movie.service.js";

export async function getAllMovies(req, res) {
    try {
        const movies = await getAllMovieList();
        res.json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error getting movies'});
    }
}

export async function getMovieByTitle(req, res) {
    try {
        const { title } = req.params;
        const movie = await getMovieBySlugOrTitleService(title);

        if (!movie) {
            return res.status(404).json({error: 'No movie found with this id'});
        }
        res.json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error getting this movie title'});
    }
}

export async function updateMovie(req, res, next) {
    try {
        const { id } = req.params;
        const { title, releaseDate, chronologicalOrder } = req.body;
        const updatedBy = req.headers['x-user'] || 'unknown';
        const updated = await updateMovieService(id, { title, releaseDate, chronologicalOrder, updatedBy });
        res.status(200).json({ok: true, movie: updated});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error updating movie title'});
    }
}