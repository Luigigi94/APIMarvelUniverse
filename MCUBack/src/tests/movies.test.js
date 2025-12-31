import request from 'supertest';

import {
    ensureTmp,
    cleanTmp,
    createSampleExcel,
    TMP_DB_DIR,
    TMP_XLSX_PATH
} from "./test.utils.js";

describe('Movies API (Básico)', () => {
    let app;

    beforeAll(async () =>{
        await ensureTmp();
        await createSampleExcel();

        process.env.EXCEL_MOVIES_TEMP = TMP_XLSX_PATH;
        process.env.DB_PATH = TMP_DB_DIR;

        const mod = await import('../index.js');

        app = mod.default;
    })

    afterAll(() => {
        cleanTmp()
    })

    it('GET / responde metadata', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Welcome to the Movie API');
    });

    it('GET /movies regresa lista con slugs', async () => {
        const res = await request(app).get('/movies');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        const iron = res.body.find(m => m.slug === 'iron-man');
        expect(iron).toBeTruthy();
    });

    it('GET /movies/:title resuelve por slug o título', async () => {
        const r1 = await request(app).get('/movies/iron-man');
        expect(r1.status).toBe(200);
        expect(r1.body).toHaveProperty('slug', 'iron-man');

        const r2 = await request(app).get('/movies/Iron%20Man');
        expect(r2.status).toBe(200);
        expect(r2.body).toHaveProperty('slug', 'iron-man');
    });
})