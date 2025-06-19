
"use client"
import Navigation from "@/app/Components/navigation"
import {useEffect,useState} from 'react';
type User = {
    user_id: number;
    username: string;
}
type Favourite = {
    title: string;
    blog_content: string;
    category: string;
    tags: string;
    image: string;
    blog_id: string;
}

export default function Favourites(){
    const[user,setUser] = useState<User|null>(null);
    const[favourites,setFavourites] = useState<Favourite[]>([]);
    useEffect(() => {
        const fetchUser = async () => {
            try{
                
            const response = await fetch(('http://localhost:8000/session'),{
                credentials:'include'}
            )
            const data:User =  await response.json();
            setUser(data);
            
        }catch(err){
            console.log("Error finding user credientials")

        }

            
        };
        fetchUser();
    },[])


    useEffect(() => {
        const getFavourites = async () => {
            if (!user){
                return;
            }
            try{
                const data = await fetch('http://localhost:8000/api/favourites', {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({user_id:user.user_id})
                
                    
                });

                const response = await data.json();
                setFavourites(response);
    
            } catch(err){
                alert("An error occured")
                console.error(err);
            };
           
            
            
            
    

        }
        getFavourites();
        
    },[user])

    const handleDelete = async(e:React.ChangeEvent<any>, blog_id: string) => {
        e.preventDefault();
        if(!user){
            return;
        }
        try{
            const attempt = await fetch('http://localhost:8000/api/deleteblog',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({user_id:user.user_id,blog_id})

            })
            if (attempt.ok){
                setFavourites((prev)=> prev.filter((f)=> f.blog_id !==blog_id));
            }else{
                console.log("Error with deleting this blog")
            }

        }catch(err){
            console.error(err);
            console.log("There appears to be an error with this request");
        }
    }

    return(<>
    <Navigation/>
    <div className="ml-10 flex flex-col w-[60rem] bg-[#dadde3] rounded-2xl">
        <h1 className=" mt-5 ml-10 text-4xl mb-6">{user?.username}'s Favourites</h1>
        {favourites.map((favourite)=>{
        return(<section key={favourite.blog_id} className="ml-10 w-60 h-60">
        <h1 className="text-3xl">{favourite.title}</h1>
            <div className="flex flex-row justify-center">
                <img src={favourite.image} className="ml-20 h-40 w-50 rounded-2xl "alt={favourite.title}/>
                <form onSubmit={(e) => handleDelete(e, favourite.blog_id)}>
                    <button type="submit" className="border-2 bg-black rounded-2xl h-9 border-black  w-24 font-white mt-30 ml-10 text-white text-xl">Delete</button>
                </form>
            </div>
            

        </section>)
        })}


    </div>
    
    </>)
}