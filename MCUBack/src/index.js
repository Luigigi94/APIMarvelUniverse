import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';

import routes from '../src/routes/index.js'; // <- un solo punto de entrada de rutas

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const readDate = () => {
    try {
        return fs.readFileSync('date.txt', 'utf8').trim();
    } catch (error) {
        console.error(error);
        return 'unknown date';
    }
};

app.use(express.json());

// raíz informativa
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Movie API',
        date: readDate(),
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

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
