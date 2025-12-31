import { useState, useEffect } from 'react'
import { http } from "../lib/http.ts";
import type { Movie } from "../types/movie.ts";

function Movies() {
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [errorAPI, setError] = useState<string | null>(null);

    useEffect(() => {
        http<Movie[]>('/movies')
            .then(setMovies)
            .catch((e) => setError(e instanceof Error ? e.message : String(e)));
    }, [])

    return (
        <div className="min-h-[100dvh] w-[100dvw] bg-neutral-50 p-6">
            <h1 className="text-2xl font-bold mb-4">MCUFront</h1>

            {errorAPI && <div className="text-red-600">Error: {errorAPI}</div>}
            {!errorAPI && !movies && <div>Cargando…</div>}

            {movies && (
                <ul className="grid gap-3">
                    {movies.map(m => (
                        <li key={m.slug} className="bg-white border rounded-lg p-4">
                            <div className="font-semibold">{m.title}</div>
                            <div className="text-sm text-gray-600">
                                {m.releaseDate ? new Date(m.releaseDate).toLocaleDateString() : 'Sin fecha'}
                                {m.chronologicalOrder != null && ` · Orden: ${m.chronologicalOrder}`}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Movies;