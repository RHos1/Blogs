import {Client} from "pg";
import dotenv from 'dotenv'; 
import { fileURLToPath} from 'url';
import path from 'path';
import bcrypt from 'bcrypt';

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

export async function getBlog(){
    try{
        const row = await client.query("SELECT * FROM blogs");
        return row.rows;
    }catch(err){
        throw err;
    }
}

export async function addUser(username,password){
    try{
        const hashedpassword = await bcrypt.hash(password,10);
        const row = await client.query("INSERT INTO users (username,passwordh) VALUES($1,$2)", [username,hashedpassword]);
        return row.rows;
    }catch(err){
        throw err;
    }
}

export async function findUser(username,password){
    try{
        const result = await client.query("SELECT * FROM users WHERE username = $1", [username]);
        if (result.rows.length === 0){
            return false;
        }
        const user = result.rows[0];
        const ismatch = await bcrypt.compare(password,user.passwordh)
        return ismatch ? user: false;
    }catch(err){
        throw err;
    }


}

export async function findBlog(query){
    try{
        const results = await client.query("SELECT * FROM blogs WHERE blog_content ILIKE $1 ", [`%${query}%`])
        return results.rows;

    }catch(err){
        throw err;
    }

}

export async function renderBlog(id){
    try{
        const result  = await client.query("SELECT * FROM blogs WHERE blog_id = $1", [id]);
        if (result.rows.length === 0){
            return false;
        }
        return result.rows[0] 


    }catch(err){
        throw err;
    }
}

