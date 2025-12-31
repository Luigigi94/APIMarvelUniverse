// src/api/reviews.ts
import { http } from '../lib/http';
import type { ReviewCreated, ReviewsByMovie } from '../types/review';

export const Reviews = {
    create: (titleOrId: string, username: string, rating: number, text?: string) =>
        http<ReviewCreated>('/reviews', {
            method: 'POST',
            body: JSON.stringify({ titleOrId, username, rating, text }),
        }),
    byMovie: (titleOrId: string) =>
        http<ReviewsByMovie>(`/reviews/${encodeURIComponent(titleOrId)}`),
};
