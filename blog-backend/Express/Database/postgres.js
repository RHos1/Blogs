import {Client} from "pg";
import dotenv from 'dotenv'; 
import { fileURLToPath} from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path: path.resolve(__dirname, '.env' )});
const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

await client.connect()
console.log("Postgres Connected");

export async function addBlog(title,content,image){
    try{
        const row = await client.query("INSERT INTO blogs (title,blog_content,image) VALUES($1,$2,$3) RETURNING *", [title,content,image]);
        return row.rows;

    }catch(err){
        throw err;

    }


}