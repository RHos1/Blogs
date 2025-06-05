
"use client"
import {useState} from 'react';
import Navigation from '@/app/Components/navigation';
export default function Register(){
     const [user,setUser] = useState({
        username: "",
        password: "",
        confirmpassword: ""
     })

     const handleChange = (e: React.ChangeEvent<any>) => {
        setUser((prev) => ({...prev, [e.target.name]:e.target.value}))

     }

     const handleSubmit = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        if(user.password !== user.confirmpassword){
          alert("These Passwords do not match");
          return;
        }
        try{
            const response = await fetch('http://localhost:8000/Register', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username: user.username,
                    password: user.password
                })
                
            } )
            const message = await response.text();
            alert(message);
;
        }catch(err){
            

        }

     }
 
    return(<>
    <Navigation/>
    <h1 className="text-3xl text-center mb-6">Register</h1>
    <form  onSubmit={handleSubmit} className='flex flex-col justify-center align-center m-auto w-40'>
        <label htmlFor="username" className='text-xl'>username</label>
        <input type="text" name="username" id ="username" className="border-2 w-60 h-10" value={user.username} onChange={handleChange}></input>
        <label htmlFor="password" className='text-xl'>password</label>
        <input type="password" name="password" id ="password" className="border-2 w-60 h-10" value={user.password} onChange={handleChange}></input>
        <label htmlFor="confirmpassword" className='text-xl'>password</label>
        <input type="password" name="confirmpassword" id ="confirmpassword" value={user.confirmpassword} className="border-2 w-60 h-10 mb-2" onChange={handleChange}></input>
        <button type='submit' className='rounded-3xl w-30 h-8 bg-black text-white'>Register</button>
    </form>
    
    </>)
}