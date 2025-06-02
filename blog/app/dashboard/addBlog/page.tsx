
import {useState} from 'react'
import Navigation from '@/app/Components/navigation';
export default function addBlog(){
    const [blog,setBlog] = useState({title: "",
        image: "",
        content: ""
    })
    
    const handleChange = (e: React.ChangeEvent<any>) => {
        setBlog((prev) => ({...prev,[e.target.name] : e.target.value}))

    } 

    const handleSubmit = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        if (!blog.image||!blog.image||blog.content){
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
            console.log("There was an error with processing that request");
         }
         
       
    }

    return(<>
    <Navigation />
    <form className="flex flex-col m-auto h-90 w-120 justify-center align-center">
        <h1>Add Blog</h1>
        <label htmlFor="title">Blog Title</label>
        <input type="text" name="title" id="title" placeholder = "Blog Title" value={blog.title} onChange={handleChange} className="h-10 border-2 w-120"/>
        <label htmlFor="image">Add Image</label>
        <input type="text" name="image" id="image" placeholder = "image link"  value = {blog.image} onChange={handleChange} className="h-10 border-2 w-120"/>
        <label htmlFor="Blog Content">Blog Content</label>
        <textarea name="content" id="content" onChange={handleChange} value={blog.content} className="border-2" rows={6} cols={6}/>
    </form>
    </>)
}