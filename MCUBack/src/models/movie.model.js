import { slugify } from "../utils/slugify.js";

export function makeMovie({ title, releaseDate, chronologicalOrder/*, phase, type*/ }) {
    const t = typeof title === 'string' ? title.trim() : '';
    const slug = slugify(t);

    const orderNum = chronologicalOrder === 'number' ? chronologicalOrder : Number(String(chronologicalOrder ?? '').trim());

    return {
        id: slug,
        slug,
        title: t,
        releaseDate: releaseDate ?? null,
        chronologicalOrder: Number.isFinite(orderNum) ? orderNum : null
    }
}

export function mapRowToMovie(rowValues) {
    return makeMovie(rowValues);
}