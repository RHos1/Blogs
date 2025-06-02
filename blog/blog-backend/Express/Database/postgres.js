import {Client} from "pg";
import dotenv from 'dotenv';
dotenv.config();
const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

await client.connect()
console.log("Postgres Connected");

export default async function addBlog(title,content,image){
    try{
        const row = await client.query("INSERT INTO blogs (title,blog_content,image) VALUES($1,$2,$3)", [title,content,image]);
        return row.rows;

    }catch(err){
        throw err;

    }


}