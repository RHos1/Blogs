import Link from 'next/link'
export default function Navigator() {
    return(<section className ="flex flex-row gap-4 justify-center align-center">
        <Link href='dashboard/testPage' className="text-3xl font-[500] ">Home</Link>
        <Link href='dashboard/addBlog' className="text-3xl font-[500] ">addBlog</Link>
        <Link href='dashboard/testPage' className="text-3xl font-[500]">Login</Link>
        <Link href='dashboard/testPage' className="text-3xl font-[500]">Contact</Link>
    </section>)
}