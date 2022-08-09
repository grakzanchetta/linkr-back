import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import router from './routes/index.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const port = process.env.PORT || 5000;

app.listen (port, () => {
    console.log (`Mode: ${process.env.MODE || "DEV"}`);
    console.log(`Server on port ${port}`)
})