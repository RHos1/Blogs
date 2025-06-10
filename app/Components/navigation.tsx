import Link from 'next/link'
export default function Navigator() {
    return(<section className ="flex flex-col justify-center align-center mb-20 gap-5">
        <section className="ml-10 mt-4 flex flex-row items-center gap-2">
            <input type="text" placeholder="Search blogs" className="pl-4 border-2 rounded-4xl w-200 h-10"></input>
            <Link href='dashboard/Login' className="ml-4 text-xl font-[500] color-grey">Login</Link>
            <Link href='dashboard/addBlog' className="text-xl font-[500] "><button className="border-2 w-30 rounded-2xl hover: cursor-pointer">New Blog</button></Link>
        </section>

        <section className="ml-10 flex flex-row gap-4">
            <Link href='/' className="text-xl font-[500]">Home</Link>
            <Link href='dashboard/testPage' className="text-xl font-[500]">Contact</Link>
            <Link href='dashboard/blogs' className="text-xl font-[500]">Blogs</Link>
            <Link href='dashboard/Register' className="text-xl font-[500]">Register</Link>
        </section>
    </section>)
}