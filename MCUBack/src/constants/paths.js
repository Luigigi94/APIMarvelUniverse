import path from "path";

export const EXCEL_MOVIES_PATH = process.env.EXCEL_MOVIES_PATH || path.join(process.cwd(), 'src/data/marvel.xlsx');
export const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), './db');