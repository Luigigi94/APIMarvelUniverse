// src/api/movies.ts
import { http } from '../lib/http';
import type { Movie } from '../types/movie';

export const moviesApi = {
    list: () => http<Movie[]>('/movies'),
    get: (slugOrTitle: string) => http<Movie>(`/movies/${encodeURIComponent(slugOrTitle)}`),

    // ejemplo futuro (moderación):
    // update: (id: string, body: Partial<Pick<Movie,'title'|'releaseDate'|'chronologicalOrder'>>) =>
    //   http<{ ok: true; movie: Movie }>(`/movies/${encodeURIComponent(id)}`, {
    //     method: 'PUT',
    //     headers: { 'x-role': 'moderator', 'x-user': 'moderador1' },
    //     body: JSON.stringify(body),
    //   }),
};
