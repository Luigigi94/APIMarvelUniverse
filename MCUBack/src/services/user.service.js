import crypto from 'crypto';
import { MIN_LENGTHS, ERR_MESSAGES} from '../constants/consts.js';
import { UserRepository } from '../repositories/user.repository.js';

const MIN_USER = MIN_LENGTHS.MIN_LENGTH_USER;
const MIN_PASS = MIN_LENGTHS.MIN_LENGTH_PASSWORD;

function assertCredentials({ username, password }) {
    if (typeof username !== 'string') throw new Error(ERR_MESSAGES.userTypeOfString);
    if (username.trim().length <= MIN_USER) throw new Error(ERR_MESSAGES.userLengthMin(MIN_USER));
    if (typeof password !== 'string') throw new Error(ERR_MESSAGES.passwordTypeOfString);
    if (password.length < MIN_PASS) throw new Error(ERR_MESSAGES.passwordLengthMin(MIN_PASS));
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
    // scrypt es nativo y suficiente para esta POC
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return { salt, hash };
}

/*function verifyPassword(password, salt, storedHash) {
    const check = crypto.scryptSync(password, salt, 64).toString('hex');
    // timingSafeEqual para evitar ataques de tiempo
    return crypto.timingSafeEqual(Buffer.from(check, 'hex'), Buffer.from(storedHash, 'hex'));
}*/

export class UserService {
    static async register({ username, password }) {
        assertCredentials({ username, password });

        const exists = await UserRepository.findByUsername(username);
        if (exists) throw new Error('User already exists');

        const _id = crypto.randomUUID();
        const { salt, hash } = hashPassword(password);

        await UserRepository.create({
            _id,
            username: username.trim(),
            password: hash,
            salt,
            createdAt: new Date(),
        });

        return { id: _id, username };
    }

    static async login({ username, password }) {
        if (!username || !password) throw new Error('Missing credentials');

        const user = await UserRepository.findByUsername(username);
        if (!user) throw new Error('Invalid username or password');

        const ok = verifyPassword(password, user.salt, user.password);
        if (!ok) throw new Error('Invalid username or password');

        // Aquí podrías emitir un JWT; por ahora devolvemos un payload básico
        return { id: user._id, username: user.username };
    }
}
