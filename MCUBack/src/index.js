import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import routes from '../src/routes/index.js'; // <- un solo punto de entrada de rutas

dotenv.config();

const app = express();


/*const readDate = () => {
    try {
        return fs.readFileSync('date.txt', 'utf8').trim();
    } catch (error) {
        console.error(error);
        return 'unknown date';
    }
};
*/
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'x-role', 'x-user'],
    })
);
// raíz informativa
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Movie API',
        date: new Date(),
        endpoints: [
            '/movies',
            '/movies/:title',
            '/user/register',
            '/user/login',
            '/review',
            '/reviews/:idOrTitle',
        ],
    });
});

// monta todas las rutas de la app
app.use(routes);

export default app;
