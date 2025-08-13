import DBlocal from "db-local";
import { DB_PATH } from "../constants/paths.js";

const { Schema } = new DBlocal({path: DB_PATH})

export const MovieOverride = Schema('MovieOverride', {
    slug: { type: String, required: true },
    title: { type: String, required: true },
    releaseDate: { type: String, required: false },
    chronologicalOrder: { type: Number, required: false },
    updatedAt: { type: String, required: true },
    updatedBy: { type: String, required: true },
})