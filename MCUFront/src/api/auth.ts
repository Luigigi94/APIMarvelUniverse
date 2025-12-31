// src/api/auth.ts
import { http } from '../lib/http';
import type { AuthResponse } from '../types/user';

export const authApi = {
    register: (username: string, password: string) =>
        http<AuthResponse>('/user/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        }),
    login: (username: string, password: string) =>
        http<AuthResponse>('/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        }),
};
