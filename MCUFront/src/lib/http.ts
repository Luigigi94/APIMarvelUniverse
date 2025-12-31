// src/lib/http.ts
const BASE = import.meta.env.VITE_API_URL as string;

if (!BASE) {
    console.warn('VITE_API_URL no está definida. Crea .env.local con VITE_API_URL=http://localhost:3000');
}

export async function http<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE}${path}`, {
        headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
        ...init,
    });
    if (!res.ok) {
        let message = `HTTP ${res.status}`;
        try {
            const data = await res.json();
            message = (data as any)?.error || message;
        } catch {
            message = (await res.text()) || message;
        }
        throw new Error(message);
    }
    return await res.json() as Promise<T>;
}
