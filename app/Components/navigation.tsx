"use client"
import {useEffect,useState} from 'react'
import Link from 'next/link'
type User = {
    loggedIn:boolean;
    username: String;
}
export default function Navigator() {
    const [Custom,setCustom] = useState(false);
    const handleCustom = () => {
        setCustom((prev) => !prev)
    }
    const[user,setUser] = useState< User | null>(null);
    useEffect(() => {
        fetch('http://localhost:8000/session', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then((data:User) => {
        console.log(data),
        setUser(data);

    })
    },[])
    return(<section className ="flex flex-col justify-center align-center mb-20 gap-5">
        <section className="ml-10 mt-4 flex flex-row items-center gap-2">
            <input type="text" placeholder="Search blogs" className="pl-4 border-2 rounded-4xl w-200 h-10"></input>
            <Link href='dashboard/Login' className="ml-4 text-xl font-[500] color-grey">Login</Link>
            <Link href='dashboard/addBlog' className="text-xl font-[500] "><button className="border-2 w-30 rounded-2xl hover: cursor-pointer">New Blog</button></Link>
            {user?.loggedIn? (<section className="flex flex-col">
                <h1 className="text-xl font-[500] hover: cursor-pointer " onClick={()=>handleCustom()}>{user.username}
                    {Custom && <section className="flex flex-col border-1 h-30 ">
                        <div className="w-30 h-7">
                            <h1>Favourites</h1>
                        </div>
                        <div className="w-30 h-7">
                            <h1>My Blogs</h1>
                        </div>
                        <div className="w-30 h-7">
                            <h1>Logout</h1>
                        </div>

                        
                        
                        </section>}
                </h1>
            </section>) : null}
        </section>

        <section className="ml-10 flex flex-row gap-4">
            <Link href='/' className="text-xl font-[500]">Home</Link>
            <Link href='dashboard/testPage' className="text-xl font-[500]">Contact</Link>
            <Link href='dashboard/blogs' className="text-xl font-[500]">Blogs</Link>
            <Link href='dashboard/Register' className="text-xl font-[500]">Register</Link>
        </section>
    </section>)
}