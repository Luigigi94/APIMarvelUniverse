import express from 'express';

const app = express();
const PORT = 3000;
app.get('/', (req, res) => {
    res.send('Hello, Marvel Universe!');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
