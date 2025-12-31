import fs from 'node:fs';
import path from 'node:path';
import XlsxPopulate from 'xlsx-populate';

export const TMP_DIR = path.join(process.cwd(), 'tmp_test');
export const TMP_DB_DIR = path.join(TMP_DIR, 'db');
export const TMP_XLSX_PATH = path.join(TMP_DIR, 'movies.xlsx');

export async function ensureTmp() {
    fs.mkdirSync(TMP_DIR, { recursive: true });
    fs.mkdirSync(TMP_DB_DIR, { recursive: true });
}

export function cleanTmp() {
    if (fs.existsSync(TMP_DIR)) {
        fs.rmSync(TMP_DIR, { recursive: true, force: true });
    }
}

/** Crea un Excel mínimo con tus 3 columnas:
 * TITLE | RELEASE DATE (Sort) | Original Chron. Order
 */
export async function createSampleExcel() {
    const wb = await XlsxPopulate.fromBlankAsync();
    const sheet = wb.sheet(0);

    sheet.cell('A1').value('TITLE');
    sheet.cell('B1').value('RELEASE DATE (Sort)');
    sheet.cell('C1').value('Original Chron. Order');

    // 2 pelis de ejemplo
    sheet.cell('A2').value('Iron Man');
    sheet.cell('B2').value('2008-05-02T00:00:00.000Z');
    sheet.cell('C2').value(3);

    sheet.cell('A3').value('Thor');
    sheet.cell('B3').value('2011-05-06T00:00:00.000Z');
    sheet.cell('C3').value(4);

    await wb.toFileAsync(TMP_XLSX_PATH);
}
