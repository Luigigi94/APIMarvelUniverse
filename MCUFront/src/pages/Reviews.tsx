import { useState, useEffect } from 'react'
import { http } from "../lib/http.ts";
import type { Review } from "../types/review.ts";

function Reviews() {
    const [reviews, setReviews] = useState<Review[] | null >(null);
    const [errorApi, setError] = useState<String | null>(null);

    useEffect(() => {
        http<Review[]>('/review')
            .then(setReviews)
            .catch((e) => setError(e instanceof Error ? e.message : String(e)));
    }, [])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Reviews</h1>
            <p>Página de reviews</p>

            {errorApi && <div className="text-red-600">Error: {errorApi}</div>}
            {!errorApi && !reviews && <div>Cargando...</div>}

            { reviews && (
                <ul className="grid gap-3">
                    {reviews.map((review) => (
                        <li key={review._id} className="bg-white border rounded-lg p-4">
                            <div className="font-semibold">{ review.username} </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Reviews;