"use client"
import Navigation from "@/app/Components/navigation";
import {useState} from 'react';
import {useEffect} from 'react';
type Blog ={
  blog_id: number;
  title: string;
  image: string;
  blog_content: string;
  created: string;

}
export default function Page(){
    const[blogs,setBlogs] = useState<Blog[]>([]);
    useEffect(() => {
      fetch('http://localhost:8000/getBlogs')
      .then((response) => response.json())
      .then((data)=> {
        console.log(data);
        setBlogs(Array.isArray(data)? data:[data]);
      })
        

      .catch(err => {
        console.error("There was an error with that request",err)
      })
        
    },[])
    return(<>
    <Navigation />
    <h1>
        Blogs</h1>

    {blogs.map((blog) => {
      return(<div key={blog.blog_id}>
        <h1>{blog.title}</h1>
      </div>)
    })}

    
        
        </>)
}