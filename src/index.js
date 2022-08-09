import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();

app.use(cors);
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen (port, () => {
    console.log (`Mode: ${process.env.MODE || "DEV"}`);
    console.log(`Server on port ${port}`)
})