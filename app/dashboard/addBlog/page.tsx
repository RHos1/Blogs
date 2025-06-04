
"use client"
import {useState} from 'react';
import Navigation from '@/app/Components/navigation';
export default function AddBlog(){
    const [blog,setBlog] = useState({title: "",
        image: "",
        content: ""
    })
    
    const handleChange = (e: React.ChangeEvent<any>) => {
        setBlog((prev) => ({...prev,[e.target.name] : e.target.value}))

    } 

    const handleSubmit = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        if (!blog.image||!blog.title|| !blog.content){
            alert("All Fields require inputs");
            return;
         }
         try{
             const response = await fetch('http://localhost:8000/addBlog',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({title: blog.title,
                    image: blog.image,
                    content: blog.content,
                })

             })
             const result = await response.text();
             alert(result);

         }
         catch(err){
            console.error("There was an error with processing that request",err);
            alert(`Error with that request: ${err instanceof Error ? err.message : String(err)}`);
         }
         
       
    }

    return(<>
    <Navigation />
    <form className="flex flex-col m-auto h-110 w-120 justify-center align-center" onSubmit={handleSubmit}>
        <h1 className="text-4xl mb-4">Add Blog</h1>
        <label htmlFor="title" className="text-3xl mb-2">Blog Title</label>
        <input type="text" name="title" id="title" placeholder = "Blog Title" value={blog.title} onChange={handleChange} className="h-10 border-2 w-120 mb-3"/>
        <label htmlFor="image" className="text-3xl mb-2">Add Image</label>
        <input type="text" name="image" id="image" placeholder = "image link"  value = {blog.image} onChange={handleChange} className="h-10 border-2 w-120 mb-3"/>
        <label htmlFor="Blog Content" className="text-3xl mb-2">Blog Content</label>
        <textarea name="content" id="content" onChange={handleChange} value={blog.content} className="border-2 mb-2"  rows={6} cols={6}/>
        <button type="submit" className=" text-white  bg-black w-24 h-10 rounded-4xl">Add Blog</button>
    </form>
    </>)
}