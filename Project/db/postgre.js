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

export async function insertPost(value) {
    try{
        const result = await client.query("INSERT INTO test (blog_text) VALUES($1)",[value]);
        return result.rows;
    }catch(err){
        throw err;
        
    }
   
}
export async function getPosts(){
    try{
        const response = await client.query("SELECT * FROM test");
        return response.rows;
    }catch(err){
        throw err;

    }
}

export async function searchBlog(search){
    try{
        const response = await client.query("SELECT * FROM test where blog_text LIKE $1",[`%${search}%`]);
        return response.rows;
    }catch(err){
        throw err;
    }
}