import { MovieOverride } from "../models/movie.db.model.js";
import {supabase} from "../config/supaBaseClient.js";

export class MovieRepository {
    static async findMovieToOverride(slug) {
        return MovieOverride.findOne({ slug });
    }

    static async upsertOverride({slug, title, release_date, chronological_order, updatedBy}) {
        const existingMovie = await MovieOverride.findOne({ slug });
        const payload = {
            slug,
            title,
            release_date,
            chronological_order,
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

    static async getAllMovies(){
        let { data, error } = await supabase
            .from("movies")
            .select("id, slug, title, release_date, chronological_order, created_at");

        if (error && /release_date|chronological_order/i.test(error.message)) {
            const retry = await supabase
                .from("movies")
                .select("id, slug, title, release_date, chronological_order, created_at");

            data = retry.data;
            error = retry.error;
        }

        if (error) throw new Error(error.message);

        return (data ?? []).map((row) => ({
            id: row.id,
            slug: row.slug,
            title: row.title,
            release_date: row.release_date ?? null,
            chronological_order: row.chronological_order ?? null,
            createdAt: row.created_at ?? null,
        }))
    }
}