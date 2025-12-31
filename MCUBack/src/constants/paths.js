import path from "path";

export const EXCEL_MOVIES_PATH = path.join(process.cwd(), 'src/data/marvel.xlsx') || process.env.EXCEL_MOVIES_PATH;
export const DB_PATH =  path.join(process.cwd(), './db') || process.env.DB_PATH;