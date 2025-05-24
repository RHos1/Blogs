import express from 'express'
import {Client}from "pg";
import dotenv from 'dotenv';
const app = express();
dotenv.config();
app.use(express.json());
const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

app.listen(8000, () => {
    console.log('Running on port 8080');
})

