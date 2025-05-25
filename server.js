import express from 'express'
import {Client}from "pg";
import dotenv from 'dotenv';
const app = express();
dotenv.config();
app.use(express.json());
const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

app.listen(8000, () => {
    console.log('Running on port 8000');
})


client 
  .connect()
  .then(() => {
    console.log("Connected to PostgresSQL database");
  })
  
  .catch((err)=> {
    console.error("Error connecting to PostgresSQL database ", err)
  })
