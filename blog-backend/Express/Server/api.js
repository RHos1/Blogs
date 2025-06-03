import express from 'express';
import cors from 'cors'; 
import {addBlog} from '../Database/postgres.js'

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











app.listen(8000, () => {
    console.log("Listening on Port 8000")
})