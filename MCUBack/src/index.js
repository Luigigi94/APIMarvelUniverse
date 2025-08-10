import express from "express";

import movieRoutes from "./routes/movie.routes.js";
import dotenv from 'dotenv'
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const readDate = () => {
    try{
        return fs.readFileSync("date.txt", "utf8").trim();
    } catch (error){
        console.error(error);
        return 'unknown date';
    }
}

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Movie API',
        date: readDate(),
        endpoints: ['/movies', '/movies/:title'],
    })
});

app.use('/movies', movieRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})