import express from 'express';
import cors from 'cors'; 
import {addBlog,getBlog,addUser,findUser,findBlog,renderBlog,Favourite,getFavourites,deleteBlog,addComment,getComment,getCommentNumber,getLikes, createdBlogs} from '../Database/postgres.js'
import session from 'express-session'
import { RESPONSE_LIMIT_DEFAULT } from 'next/dist/server/api-utils/index.js';


const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(session({
    secret: 'some encryption',
    resave: false,
    saveUninitialized: false,
    cookie : {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))
console.log('Hello from backend');
app.post('/addBlog', async (req,res) => {
    if(!req.body){
        res.status(500).send('There appears to be an issue with database connection')
    }
    try{
        const {title,content,image,category,tags} = req.body;
        console.log('Received:', {title, content, image,category,tags});
        const result = await addBlog(title,content,image,category,tags);
        return res.status(200).send('Blog successfully added')
    }catch(err){
        console.error('There appears to be an error with this request', err);
        return res.status(500).json({error: 'Database Error',details: err.message});

    }
})

app.get('/session', (req,res) => {
    if (req.session.username){
        return res.status(200).json({loggedIn: true, username: req.session.username, user_id: req.session.userid});
    }else{
        return res.status(200).json({loggedIn : false});
    }
})

app.post('/logout', (req,res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out.');
        }
        res.clearCookie('connect.sid');
        return res.status(200).send('Logged out successfully.');
    });
});

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


app.post('/Login', async (req,res) => {
    if (!req.body){
        res.status(500).send('There appears to be an error with the database connection');
    }
    try{
        const {username,password} = req.body;
        const user = await findUser(username,password);
        if (!user){
            res.status(401).send('Password or username is wrong');
        }
        
        else{
            req.session.username = username;
            console.log(user.user_id);
            req.session.userid = user.user_id;
            req.session.save(err=> {
                if (err) {
                    console.error('Session save error:', err);
                    return res.status(500).send('Failed to save session');
                }
            })
            res.status(200).json({message: "User sucessfully found"})
        }
       

    }catch(err){
        res.status(500).send('There appears to be an error with finding that user');

    }
})

app.post('/searchBlogs', async(req,res) => {
    try{
        const {query} = req.body;
        const response = await findBlog(query);
        console.log(JSON.stringify(response));
        res.status(200).json(response);
        
    }catch(err){
        console.error("There appears to be an issue with that search",err)
        res.status(500).send("There appears to be an error with that search request")
    }
    
    
 
})

app.get('/api/blogs/:id', async (req,res) => {

    try{
        const {id} = req.params;
        const result = await renderBlog(id);
        if (!result){
            res.status(404).send("That blog was not found")
    }
        else{
            res.status(200).json(result);
        }


    }catch(err){
        console.error("There appears to be an error",err);
        res.status(500).send("There appers to be an error here")

    }
    
})

app.post('/api/like', async (req,res) => {
    try{
        const {blog_id,user_id} = req.body
        const content = await Favourite(blog_id,user_id);
        return res.status(200).send('Successfully Liked a Blog!');
         
        

    }catch(err){
        console.error("There was an error with that request",err);
        return res.status(500).send('Error with processing that request')
    }
    
    
})

app.post('/api/favourites', async (req,res) => {
    try{
        const {user_id} = req.body;
        const result = await getFavourites(user_id);
        return res.status(200).json(Array.isArray(result)? result: [result]);

    }catch(err){
        console.error('Error Occured',err);
        res.status(500).send('Error with that file');

    }

})

app.post('/api/deleteblog', async(req,res)=> {
    try{
        const {blog_id,user_id} = req.body;
        const result = await deleteBlog(blog_id,user_id);
        return res.status(200).send('Blog Successfully deleted');
    }catch(err){
        console.error(err);
        return res.status(500).send('Error with deleting Blog');
    }
    
})

app.post('/api/comment', async(req,res) => {
    try{
        const {blog_id,username,comment_text} = req.body;  
        const result = await addComment(blog_id,username,comment_text);
        return res.status(200).send('Comment added successfully');


    }catch(err){
        console.error("This error occured",err);
        return res.status(500).send('Internal Error')
    }
})

app.post('/api/comments', async(req,res) => {
    try{
        const{blog_id} = req.body;
        const comments = await getComment(blog_id);
        console.log("Retrieved Comments");
        return res.status(200).json(comments);
    }catch(err){
        console.err("This is your error", err);
        res.status(500).send("Error with retrieving comments")
    }
    
})

app.post('/api/commentsnumber', async(req,res) => {
    try{
        const{blog_id} = req.body;
        const number = await getCommentNumber(blog_id);
        return res.status(200).json(number);
    }catch(err){
        console.error("Error cause",err);
        return res.status(500).send('Internal Error with retrieving comment number');
    }
    
})

app.post('/api/likes', async(req,res) => {
    try{
        const{blog_id} = req.body;
        const likes = await getLikes(blog_id);
        res.status(200).json(likes);
    }
    catch(err){
        console.error("This is the error",err);
        res.status(500).send("Error with retrieving like count");
    }
})

app.post('/api/created', async(req,res) => {
    try{
        const {username} = req.body;
        const result = await createdBlogs(username);
        res.status(200).json(result);

    }catch(err){
        console.error("Error cause", err);
        res.status(500).send('There was an error with retrieving this data');

    }
})




app.listen(8000, () => {
    console.log("Listening on Port 8000")
})
