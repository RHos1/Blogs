import express from 'express';
import cors from 'cors'; 
import {addBlog,getBlog,addUser} from '../Database/postgres.js'

const app = express();
app.use(express.json());
app.use(cors());
console.log('Hello from backend');
app.post('/addBlog', async (req,res) => {
    if(!req.body){
        res.status(500).send('There appears to be an issue with database connection')
    }
    try{
        const {title,content,image} = req.body;
        console.log('Received:', {title, content, image});
        const result = await addBlog(title,content,image);
        return res.status(200).send('Blog successfully added')
    }catch(err){
        console.error('There appears to be an error with this request', err);
        return res.status(500).json({error: 'Database Error',details: err.message});

    }
})

app.get('/getBlogs', async (req,res) => {
    try{
        const data = await getBlog();
        res.status(200).json(data);

    }catch(err){
        console.error('There appears to be an error with retrieving blogs',err);
        res.status(500).send('Error with retrieving blogs please try again')

    }
})

app.post('/Register', async (req,res) => {
    if(!req.body){
        return res.status(500).send('Error with the database')
    }
    try{
        const {username,password} = req.body;
        const result = await addUser(username,password);
        return res.status(200).send("User successfully registered!")
    }catch(err){ 
        console.error("There was an error registering this user!",err);
        res.status(500).send("There was an issue with registering this user.")

    }
})









app.listen(8000, () => {
    console.log("Listening on Port 8000")
})