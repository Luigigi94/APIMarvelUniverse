import express from 'express';
import fs from 'fs';
import XlsxPopulate from 'xlsx-populate';

async function peliculas (){
    try {
    const workbook = await XlsxPopulate.fromFileAsync('./marvel.xlsx')
    const value = workbook.sheet('Hoja1').range('A1:C531').value()
    //console.log(value).
    return JSON.stringify (value);
    }catch (error){
        console.error(error);
    }
}

//main();

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
app.get('/', async (req, res) => {
    console.log(peliculas());
    const todo = await peliculas();
    res.json(todo);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
