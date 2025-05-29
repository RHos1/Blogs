import express from 'express'
import {insertPost,getPosts,searchBlog} from './Project/db/postgre.js';
const app = express();
app.use(express.json());

app.get('/getBlogs', async (req,res) => {
    try{
        const data = await getPosts();
        res.status(200).json(data)

    }catch(err){
        console.error("There was an error with retrieving this data",err);
        res.status(500).send('Error with retrieving that data');

    }
})
app.post('/addBlog', async (req,res)=> {
    if (!req.body){
        res.status(500).send('There appears to be some error with this connection');
    }

    try{
        const {data} = req.body
        const result = await insertPost(data);
        res.status(200).send("Data was added to database successfully")
        return result.row;
    }catch(err){
        console.error("There was an error with that request",err);
        res.status(500).send("Error with that request")

    }
})
app.post('/searchBlog', async (req,res) => {
    if(!req.body){
        res.status(500).send('Error with transcribing this request');
    }
    try{
        const {search} = req.body;
        const result = await searchBlog(search);
        console.log("Data Found");
        res.status(200).json(result);
    }
    catch(err){
        console.error("Found an error with this search query", err);
        res.status(500).send("Error with that search query");
    }
})

app.listen(8000, () => {
    console.log('Running on port 8000');
})




