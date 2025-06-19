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

export async function addBlog(title,content,image,category,tags){
    try{
        const row = await client.query("INSERT INTO blogs (title,blog_content,image,category,tags) VALUES($1,$2,$3,$4,$5) RETURNING *", [title,content,image,category,tags]);
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
        const result  = await client.query("SELECT * FROM blogs WHERE blog_id = $1", [Number(id)]);
        if (result.rows.length === 0){
            return false;
        }
        return result.rows[0] 


    }catch(err){
        throw err;
    }
}

export async function Favourite(blog_id,user_id){
    try{
        const result = await client.query("INSERT INTO favourites (blog_id,user_id) VALUES($1,$2) RETURNING *",[blog_id,user_id])
        return result.rows;

    }catch(err){
        throw err;

    }
    

}

export async function getFavourites(user_id){
    try{
        const results = await client.query("SELECT DISTINCT ON (blogs.blog_id) blogs.title,blogs.blog_content,blogs.image,blogs.category,blogs.tags,blogs.blog_id FROM blogs JOIN favourites ON favourites.blog_id = blogs.blog_id WHERE favourites.user_id = $1 ORDER BY blogs.blog_id, favourites.favourite_id DESC",[user_id]);
        return results.rows;
    }catch(err){
        throw err;
    }
}

export async function deleteBlog(blog_id,user_id){
    try{
        const results = await client.query("DELETE FROM favourites where blog_id =$1 AND user_id =$2",[blog_id,user_id]);
    }catch(err){
        throw err;
    }
}

export async function addComment(blog_id,username,comment_text){
    try{
        const comments = await client.query("INSERT INTO comments (blog_id,username,comment_text) VALUES($1,$2,$3) RETURNING *", [blog_id,username,comment_text]);
    }catch(error){
        throw err;
    }

}

export async function getComment(blog_id){
    try{
        const comments = await client.query("SELECT * FROM comments WHERE blog_id = $1",[blog_id])
        return comments.rows;

    }catch(error){
        throw err;
    }
}