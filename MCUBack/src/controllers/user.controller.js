import { UserService } from '../services/user.service.js';

export const registerUser = async (req, res, next) => {
    try {
        const result = await UserService.register(req.body);
        res.status(201).json({ ok: true, user: result });
    } catch (err) {
        next(err);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const result = await UserService.login(req.body);
        res.status(200).json({ ok: true, user: result });
    } catch (err) {
        next(err);
    }
};
