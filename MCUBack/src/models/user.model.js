import DBlocal from 'db-local';
import { DB_PATH } from '../constants/paths.js';

const { Schema } = new DBlocal({ path: DB_PATH });

export const User = Schema('User', {
    _id:        { type: String, required: true },
    username:   { type: String, required: true },
    password:   { type: String, required: true }, // hash
    salt:       { type: String, required: true },
    createdAt:  { type: String,   required: true },
});
