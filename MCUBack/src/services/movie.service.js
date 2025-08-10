import {EXCEL_MOVIES_PATH} from "../constants/paths.js";
import XlsxPopulate from "xlsx-populate";


export async function getAllMovies() {
    try {
        const workbook = await XlsxPopulate.fromFileAsync(EXCEL_MOVIES_PATH);
        const data = workbook.sheet("Hoja1").range("A1:C531").value();

        const rows = data.slice(1);

        return rows.map((row) => ({
            title: row[0],
            releaseDate: row[1],
            chronoOrder: row[2],
        }));
    }catch (e) {
        console.error(e)
        return [];
    }
}

export async function getMovie(title) {
    try {
        const allMovies = await getAllMovies();

        const movie = allMovies.find(movieFind => movieFind.title && movieFind.title.toLowerCase().trim() === title.toLowerCase().trim().toLowerCase());

        return movie || null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
