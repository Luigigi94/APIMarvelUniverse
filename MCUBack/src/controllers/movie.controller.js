import { getAllMovies, getMovie } from "../services/movie.service.js";

export async function getAllMovieList(req, res) {
    try {
        const movies = await getAllMovies();
        res.json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error getting movies'});
    }
}

export async function getMovieByTitle(req, res) {
    try {
        const { title } = req.params;
        const movie = await getMovie(title);

        if (!movie) {
            return res.status(404).json({error: 'No movie found with this id'});
        }
        res.json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error getting this movie title'});
    }
}
