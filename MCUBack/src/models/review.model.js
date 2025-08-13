import DBlocal from "db-local";
import { DB_PATH } from "../constants/paths.js";

const { Schema } = new DBlocal({path: DB_PATH});

export const Review = Schema('Review', {
    _id: { type: String, required: true },
    movieId: { type: String, required: true },
    username: { type: String, required: true },
    rating: { type: Number, required: true },
    text: { type: String, required: false, default: null },
    createdAt: { type: String, required: true },
})