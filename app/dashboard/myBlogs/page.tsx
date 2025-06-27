"use client"
import Navigation from "@/app/Components/navigation";
import {useState,useEffect} from 'react';

type User = {
    user_id: number;
    username: string;
}

type Blog ={
    blog_id:number;
    title: string;
    blog_content: string;
    image: string;
    created: string;
    category: string;
    tags: string;
    username: string;
    

}


export default function MyBlogs(){

    const [user,setUser] = useState<User|null>(null);
    const [blog, setBlog] = useState<Blog[]>([]);
    
    useEffect(() => {
        async function getUser(){
            try{
                const attempt = await fetch('http://localhost:8000/session', 
                    {credentials: "include"})
                const data = await attempt.json();
                setUser(data);

            }catch(err){
                console.error("There was an error with setting the user", err)
            }

        }
        getUser();

    },[])

    useEffect(() => {
        async function getBlogs(){
            try{
                if (!user){
                    return;
                }
                const response = await fetch('http://localhost:8000/api/created',{
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({username: user.username})
                }
                )
                
                const data = await response.json();
                setBlog(data);

            }catch(err){
                console.error("error source", err);
            }
        }
        getBlogs();
    },[user])
    


    return(<>
    <Navigation/>
    {user && <h1>{user.username}</h1>}
    <h1>My Blogs</h1>
    {blog.map((entry) => {
        return(<div key={entry.blog_id}><h1>{entry.title}</h1></div>)
    })}
    </>)
}