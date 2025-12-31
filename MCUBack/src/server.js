import "dotenv/config";
import app from './index.js'
const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});