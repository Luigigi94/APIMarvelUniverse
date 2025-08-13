import { MovieOverride } from "../models/movie.db.model.js";

export class MovieRepository {
    static async findMovieToOverride(slug) {
        return MovieOverride.findOne({ slug });
    }

    static async upsertOverride({slug, title, releaseDate, chronologicalOrder, updatedBy}) {
        const existingMovie = await MovieOverride.findOne({ slug });
        const payload = {
            slug,
            title,
            releaseDate,
            chronologicalOrder,
            updatedAt: new Date().toISOString(),
            updatedBy
        };

        if (existingMovie) {
            Object.assign(existingMovie, payload);
            existingMovie.save();
            return existingMovie;
        }

        return MovieOverride.create(payload).save();
    }

    static async getOverridesMap() {
        const list = MovieOverride.find() || [];

        return new Map(list.map(o => [o.slug, o]));
    }
}