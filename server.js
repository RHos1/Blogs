import express from 'express'
import {insertPost} from './Project/db/postgre.js';
const app = express();
app.use(express.json());


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

app.listen(8000, () => {
    console.log('Running on port 8000');
})




