
"use client"
import {useEffect,useState} from 'react';
import Navigation from "@/app/Components/navigation";

type User = {
    loggedIn: boolean;
    username: String;
    user_id: number;

}

interface Blog {
    blog_id: number;
    title: string;
    image: string;
    created: string;
    blog_content: string;
}

type Comment =  {
    comment_id: number;
    blog_id: number;
    username: string;
    comment_text: string;
    created_at: string;

}


interface BlogPageProps {
    params: {
        id: string;
    };
}
export default function BlogPage({ params }: BlogPageProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [user, setUser] = useState<User| null>(null);
    const[blog, setBlog] = useState<Blog | null>(null);
    const[loading, setLoading] = useState(true);
    const[like,setLike] = useState(false);
    const[info,setInfo]  = useState({blog_id:0,
        user_id:0
    })

    const[comment,setComment] = useState({
        blog_id: 0,
        username: "",
        comment_text: ""
    })

    const changeComment = (e:React.ChangeEvent<any>) => {
        setComment((prev)=> ({...prev,[e.target.name]:e.target.value}))
    }

    

    const handleChange  = (e:React.ChangeEvent<any>) => {
        setInfo((prev) => ({...prev,[e.target.name]:e.target.value}))
    }

    const handleComment = async(e:React.ChangeEvent<any>) => {
        if(!user || !blog){
            return;
        }
        const attempt = await fetch('http://localhost:8000/api/comment', {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({blog_id: blog.blog_id,
                username: user.username,
                comment_text: comment.comment_text
            })

        })
        const response = await attempt.text();
        alert(response);
    }
   

   
 
    useEffect(()=> {
      try{
         fetch('http://localhost:8000/session',{credentials:'include'
        })
        .then(response => response.json())
        .then((data:User) => {
            console.log(data);
            setUser(data);
        })

      }catch(err){

      }
        
    },[])

     
    const handleLike = () => {
        setLike((prev)=>!prev)
    }
    useEffect(() => {
        async function getComments(){
            if(!blog){
                return;
            }
            const comments = await fetch('http://localhost:8000/api/comments', {
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({blog_id:blog.blog_id})
                }
                
            )

            const data = await comments.json();
            setComments(data);

        }
        getComments();
    },[blog?.blog_id]);

    useEffect(() => {
        async function getBlog() {
    
        
    
            try {
                const res = await fetch(`http://localhost:8000/api/blogs/${params.id}`, {
                    cache: 'no-store' // This ensures fresh data on each request
                });
                
                if (!res.ok) {
                    setBlog(null);
                }else{
                    const data = await res.json();
                    setBlog(data);

                }
                
                
            } catch (error) {
                console.error('Error fetching blog:', error);
                setBlog(null);
            } finally {
                setLoading(false);
            }
        }
        getBlog();
    
    },[params.id])

    const handleSubmit = async(e:React.ChangeEvent<any>) => {
        e.preventDefault();
        try{
            if (!user || !blog){
                alert("User or blog infor missing.");
                return;
            }
        const response = await fetch('http://localhost:8000/api/like', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({blog_id: blog.blog_id,
                    user_id: user.user_id,
                })
            })

        const message = await response.text();
        alert(message);

        }catch(err){
            console.log("There appears to be an error here");

        }
        

    }

    useEffect(() => {
        if(blog && user){
            setInfo({
                user_id : user.user_id,
                blog_id: blog.blog_id
            });
        }
    }, [user,blog]);
    
    
    if(loading){
        return(
            <div>

            </div>
        );
    }
    
    
    
    
    
    
    
    if (!blog) {
        return (
            <div>
                <h1>Blog Not Found</h1>
                <p>The blog you're looking for doesn't exist.</p>
            </div>
        );
    }

    
    
    return (
            
        <>
            <Navigation/>
            <div className="flex flex-col m-auto w-[80rem] content-center items-center gap-5">
                <div className="flex flex-row">
                    <h1 className="text-6xl font-[500]">{blog.title}</h1>
                    <form onSubmit={handleSubmit}>
                    <button type="submit" onClick={()=>handleLike()}> <img src= {like? "../heart (1).png" : "../heart.png"} className="w-15 ml-8 hover: cursor-pointer"/></button>
                    </form>
                   
                </div>
                <div className="w-5/8">
                    <img src={blog.image} className="object-cover width-full height-full rounded-2xl"></img>
                </div>
                <p className="text-3xl font-[400]">{blog.blog_content}</p>

                <h1 className="text-3xl font-[500]">Comments</h1>

                <form onSubmit={handleComment} className="flex flex-col">
                    <input type="text" className="border-2 w-120 h-10 pl-2 mb-2" name="comment_text" onChange={changeComment} value={comment.comment_text} placeholder="Add a comment"></input>
                    <button type="submit" className="border-2 rounded-xl w-50">Add</button>
                </form>

                {comments.map((comment)=>{
                    return(<div key={comment.comment_id}>{comment.comment_text}</div>)
                })}


                <section className="flex flex-row gap-20" id="stats">
                    <div><img className="w-10 " src="../heart (1).png"></img></div>
                    <div><img src="../forum-icon.png" className="w-10"></img></div>
                </section>

            </div>



            
    
        </>
    );
}


