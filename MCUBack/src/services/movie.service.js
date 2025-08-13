import {EXCEL_MOVIES_PATH} from "../constants/paths.js";
import { mapRowToMovie } from "../models/movie.model.js";
import { slugify } from "../utils/slugify.js";
import XlsxPopulate from "xlsx-populate";


export async function getAllMovieList() {
    try {
        const workbook = await XlsxPopulate.fromFileAsync(EXCEL_MOVIES_PATH);
        const sheet = workbook.sheet(0);
        const lastRow = sheet.usedRange().endCell().rowNumber();
        const rows = sheet.range(`A1:C${lastRow}`).value();

        const [headers, ...data] = rows;

        const idx = Object.fromEntries(
            headers.map((h,i) => [String(h).trim().toLowerCase(), i])
        )

        return data
            .map(r => ({
                title: r[idx.title],
                releaseDate: r[idx['release date (sort)']],
                chronologicalOrder: r[idx['original chron. order']],
            }))
            .map(mapRowToMovie)
            .filter(Boolean);
    }catch (e) {
        console.error(e)
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
