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

async function getBlog(id: string): Promise<Blog | null> {
    try {
        const res = await fetch(`http://localhost:8000/api/blogs/${id}`, {
            cache: 'no-store' // This ensures fresh data on each request
        });
        
        if (!res.ok) {
            return null;
        }
        
        return res.json();
    } catch (error) {
        console.error('Error fetching blog:', error);
        return null;
    }
}

export default async function BlogPage({ params }: BlogPageProps) {
    const blog = await getBlog(params.id);
    
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
                <h1 className="text-6xl font-[500]">{blog.title}</h1>
                <div className="w-5/8">
                    <img src={blog.image} className="object-cover width-full height-full rounded-2xl"></img>
                </div>
                <p className="text-3xl font-[400]">{blog.blog_content}</p>

            </div>
            
        </>
    );
}