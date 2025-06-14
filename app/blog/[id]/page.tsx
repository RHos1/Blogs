
"use client"
import {useEffect,useState} from 'react';
import Navigation from "@/app/Components/navigation";

interface Blog {
    blog_id: number;
    title: string;
    image: string;
    created: string;
    blog_content: string;
}

interface BlogPageProps {
    params: {
        id: string;
    };
}
export default function BlogPage({ params }: BlogPageProps) {
    const[blog, setBlog] = useState<Blog | null>(null);
    const[loading, setLoading] = useState(true);
    const[like,setLike] = useState(false);

    const handleLike = () => {
        setLike((prev)=>!prev)
    }

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
                    <img src= {like? "../heart (1).png" : "../heart.png"} onClick={()=>handleLike()}className="w-15 ml-8 hover: cursor-pointer"></img>
                </div>
                <div className="w-5/8">
                    <img src={blog.image} className="object-cover width-full height-full rounded-2xl"></img>
                </div>
                <p className="text-3xl font-[400]">{blog.blog_content}</p>

            </div>
            
        </>
    );
}


