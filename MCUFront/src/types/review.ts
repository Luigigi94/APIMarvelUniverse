export type Review = {
    _id: string;
    movieId: string;
    username: string;
    rating: number;
    text?: string;
    createdAt: string;
};
export type ReviewsByMovie = { ok: true; movieId: string; reviews: Review[] };
export type ReviewCreated = { ok: true; review: Review };
