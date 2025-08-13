import { Review } from '../models/review.model.js';

export class ReviewRepository {
    static async create(doc) {
        Review.create(doc).save();
        return doc;
    }

    static async findByMovieId(movieId) {
        return Review.find({ movieId }) || null;
    }

    static async findByUserAndMovieId({ username, movieId }) {
        return Review.findOne({ username: username, movieId: movieId }) || null;
    }
}