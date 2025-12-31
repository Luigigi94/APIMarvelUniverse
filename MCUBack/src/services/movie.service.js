import {EXCEL_MOVIES_PATH} from "../constants/paths.js";
import {mapRowToMovie} from "../models/movie.model.js";
import {slugify} from "../utils/slugify.js";
import XlsxPopulate from "xlsx-populate";
import {MovieRepository} from "../repositories/movie.repository.js";
import {ERR_MESSAGES} from "../constants/consts.js";
import {supabase} from "../config/supaBaseClient.js";


export async function getAllMovieList() {
    // try {
    //     const workbook = await XlsxPopulate.fromFileAsync(EXCEL_MOVIES_PATH);
    //     const sheet = workbook.sheet(0);
    //     const lastRow = sheet.usedRange().endCell().rowNumber();
    //     const rows = sheet.range(`A1:C${lastRow}`).value();
    //
    //     const [headers, ...data] = rows;
    //
    //     const idx = Object.fromEntries(
    //         headers.map((h,i) => [String(h).trim().toLowerCase(), i])
    //     )
    //
    //     const baseList = data.map(r => ({
    //         title: r[idx.title],
    //         releaseDate: r[idx["release date (sort)"]],
    //         chronologicalOrder: r[idx["original chron. order"]],
    //     })).map(mapRowToMovie).filter(Boolean);
    //
    //     const overrides = await MovieRepository.getOverridesMap()
    //     /*return data
    //         .map(r => ({
    //             title: r[idx.title],
    //             releaseDate: r[idx['release date (sort)']],
    //             chronologicalOrder: r[idx['original chron. order']],
    //         }))
    //         .map(mapRowToMovie)
    //         .filter(Boolean);*/
    //
    //     return baseList.map(m => {
    //         const overRidedMovie = overrides.get(m.slug)
    //         if (!overRidedMovie) return m;
    //         return {
    //             ...m,
    //             title: overRidedMovie.title ?? m.title,
    //             releaseDate: overRidedMovie.releaseDate ?? m.releaseDate,
    //             chronologicalOrder: typeof overRidedMovie.chronologicalOrder === 'number' ? overRidedMovie.chronologicalOrder : m.chronologicalOrder,
    //         }
    //     });
    // }catch (e) {
    //     console.error(e)
    //     return [];
    // }
    try {
        const supaMovies = await MovieRepository.getAllMovies();

        const supaSlugs = new Set(supaMovies.map(m => m.slug));

        const workbook = await XlsxPopulate.fromFileAsync(EXCEL_MOVIES_PATH);
        const sheet = workbook.sheet(0);
        const lastRow = sheet.usedRange().endCell().rowNumber();
        const rows = sheet.range(`A1:C${lastRow}`).value();

        const [headers, ...data] = rows;

        const idx = Object.fromEntries(
            headers.map((h, i) => [String(h).trim().toLowerCase(), i])
        )

        const baseList = data.map(r => ({
            title: r[idx.title],
            releaseDate: r[idx["release date (sort)"]],
            chronologicalOrder: r[idx["original chron. order"]],
        })).map(mapRowToMovie).filter(Boolean);

        const missingFromExcel = baseList.filter(m => !supaSlugs.has(m.slug));

        const overrides = await MovieRepository.getOverridesMap()
        const missingWithOverrides = missingFromExcel.map(m => {
            const over = overrides.get(m.slug);

            if (!over) return m;

            return {
                ...m,
                title: over.title ?? m.title,
                releaseDate: over.releaseDate ?? m.releaseDate,
                chronologicalOrder: typeof over.chronologicalOrder === "number" ? over.chronologicalOrder : over.chronologicalOrder,
            };
        });

        return [...supaMovies, ...missingWithOverrides]
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getMovieBySlugOrTitleService(title) {
    try {
        const wantedSlug = slugify(title || '');
        const list = await getAllMovieList();
        return list.find(m => m.slug === wantedSlug || null);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateMovieService(idOrTitle, { title, releaseDate, chronologicalOrder, updatedBy }) {
    const actual = await getMovieBySlugOrTitleService(idOrTitle);

    if(!actual) throw new Error (ERR_MESSAGES.movieNotFound);

    const newTitle = typeof title === 'string' && title.trim().length ? title.trim() : actual.title;

    const newReleaseDate = typeof releaseDate === 'string' && releaseDate.trim().length ? releaseDate.trim() : actual.releaseDate;

    const newOrder = typeof chronologicalOrder === 'number' ? chronologicalOrder : chronologicalOrder != null ? Number(chronologicalOrder) : actual.chronologicalOrder;

    const newSlug = slugify(newTitle);

    if (newSlug !== actual.slug) {
        const existe = await MovieRepository.findMovieToOverride(newSlug);
        if (existe) throw new Error(ERR_MESSAGES.existingMovie);
    }

    const saved = await MovieRepository.upsertOverride({
        slug: newSlug,
        title: newTitle,
        releaseDate: newReleaseDate,
        chronologicalOrder: Number.isFinite(newOrder) ? newOrder : undefined,
        updatedBy
    })

    return {
        ...actual,
        slug: saved.slug,
        title: saved.title,
        releaseDate: saved.releaseDate,
        chronologicalOrder: typeof saved.chronologicalOrder === 'number' ? saved.chronologicalOrder : actual.chronologicalOrder,
    }
}