"use client"
import {useState} from 'react';
import Navigation from '@/app/Components/navigation'
import Link from 'next/link'
export default function Login(){
    const [user,setUser] = useState({username: "", 
        password: ""
    });
    const handleChange = (e:React.ChangeEvent<any>) => {
        setUser((prev) => ({...prev, [e.target.name]: e.target.value}))

    }

    const handleSubmit = async (e:React.ChangeEvent<any>) => {
        e.preventDefault();
        if (!user.username||!user.password){
            alert("Both fields have to filled");
        }
        try{
            const response = await fetch('http://localhost:8000/Login', {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({username: user.username,
                    password: user.password
                }),
                credentials: 'include'
            })
            const message = await response.text();
            alert(message);
            if (response.ok){
                window.location.href= '/dashboard/blogs';
            }


        }catch(err){

        }
    }

    return(<>
    <Navigation />
    
    <section className="flex flex-row ml-10 content-center">
        
        <form onSubmit={handleSubmit} className='flex flex-col w-120'>
        <h1 className="text-3xl  mb-6">Login</h1>
            <label htmlFor="username" className='text-xl'>username</label>
            <input type="text" name="username"placeholder="username" id ="username" className="pl-2 border-2 w-100 h-10 mb-4" value={user.username} onChange={handleChange} ></input>
            <label htmlFor="password" className='text-xl'>password</label>
            <input type="password" placeholder="password" name="password" id ="password" className="pl-2 border-2 w-100 h-10 mb-4" value={user.password} onChange={handleChange} ></input>
            <button type='submit' className='rounded-3xl w-30 h-8 bg-black text-white'>Login</button>  
        </form>

        <div className="flex flex-col content-center">
            <h1 className="text-2xl mb-4">Don't have an account?</h1>
            <Link href="./Register"><button className="rounded-3xl bg-black w-30 h-8 text-white mb-4">Sign Up</button></Link>
            <p className="w-130 text-xl font-[400]">Having an account means you can make new blogs, save and view your favourite blogs.</p>

        </div>
    </section>
    </>)


}