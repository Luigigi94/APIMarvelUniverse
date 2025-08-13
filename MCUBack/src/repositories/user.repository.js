import { User } from '../models/user.model.js';

export class UserRepository {
    static async findByUsername(username) {
        // db-local es sync, pero dejar async ayuda si luego cambias de DB
        return User.findOne({ username });
    }

    static async create({ _id, username, password, salt, createdAt }) {
        return User.create({ _id, username, password, salt, createdAt }).save();
    }
}
