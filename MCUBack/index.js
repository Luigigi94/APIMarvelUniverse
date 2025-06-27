import express from 'express';
import fs from 'fs';

const PORT = 3000;
const app = express();

const readDate = () => {
    try {
        const data = fs.readFileSync('date.txt', 'utf8');
        return data.trim();
    } catch (err) {
        console.error('Error reading date file:', err);
        return 'Unknown Date';
    }
};
app.get('/', (req, res) => {
    res.send('Hello, Marvel Universe!');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
