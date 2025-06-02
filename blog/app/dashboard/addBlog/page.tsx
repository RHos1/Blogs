
import Navigation from '@/app/Components/navigation';
export default function addBlog(){
    return(<>
    <Navigation />
    <form className="flex flex-col m-auto h-90 w-120 justify-center align-center">
        <h1>Add Blog</h1>
        <label htmlFor="title">Blog Title</label>
        <input type="text" name="title" id="title" placeholder = "Blog Title" className="h-10 border-2 w-120"/>
        <label htmlFor="image">Add Image</label>
        <input type="text" name="image" id="image" placeholder = "image link" className="h-10 border-2 w-120"/>
        <label htmlFor="Blog Content">Blog Content</label>
        <textarea name="content" className="border-2" rows={6} cols={6}/>
    </form>
    </>)
}