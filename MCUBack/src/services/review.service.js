import crypto from "crypto";
import { ReviewRepository } from "../repositories/review.repository.js";
import { getMovieBySlugOrTitleService } from "./movie.service.js";
import { RATING_VALUES, ERR_MESSAGES } from "../constants/consts.js";

const MIN_RATING = RATING_VALUES.MIN_VALUE;
const MAX_RATING = RATING_VALUES.MAX_VALUE;

function assertPayload({ titleOrId, username, rating }) {
    console.log("Assert payload", titleOrId, username, rating);
    if (!titleOrId || typeof titleOrId !== "string") throw new Error(ERR_MESSAGES.titleOrIdTypeOfString);
    if (!username || typeof username !== "string") throw new Error(ERR_MESSAGES.userNameRequired)
    const n = Number(rating)

    if(!Number.isFinite(n) || n < MIN_RATING || n > MAX_RATING) throw new Error(ERR_MESSAGES.ratingValidRange(MIN_RATING, MAX_RATING))
}

export class ReviewService {
    static async addReview({ titleOrId, username, rating, text }) {
        console.log("userName", username)
        assertPayload({ titleOrId, username, rating });

        const movie = await getMovieBySlugOrTitleService(titleOrId);
        if (!movie) throw new Error(ERR_MESSAGES.movieNotFound);

        const movieId = movie.slug;
        console.log(movieId);
        const exists = await ReviewRepository.findByUserAndMovieId({ username, movieId });
        if (exists) throw new Error(ERR_MESSAGES.duplicateReview);

        const doc = {
            _id: crypto.randomUUID(),
            movieId,
            username: username.trim(),
            rating: Number(rating),
            text: text ? String(text).trim() : undefined,
            createdAt: new Date().toISOString(),
        }

        await ReviewRepository.create(doc);
        return doc;
    }

    static async getMoviesReviews(titleOrId) {
        const movie = await getMovieBySlugOrTitleService(titleOrId);
        if (!movie) throw new Error(ERR_MESSAGES.movieNotFound);

        const reviews = await ReviewRepository.findByMovieId(movie.slug);
        return { movieId: movie.slug, reviews };
    }
}