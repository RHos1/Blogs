"use client"
import Navigation1 from "@/app/Components/navigation";
import {Swiper,SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import {useState} from 'react';
import {useEffect} from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


type Blog ={
  blog_id: number;
  title: string;
  image: string;
  blog_content: string;
  created: string;

}

type User = {
  loggedIn: boolean;
  username: string;
}

export default function Page(){

    const[display,setDisplay] = useState(true);
    const[blogs,setBlogs] = useState<Blog[]>([]);
    const[user,setUser] = useState<User  | null>(null);

    useEffect(() => {
      fetch('http://localhost:8000/session', {
        credentials: 'include'
      })
      .then(response => response.json())
      .then((data: User) => {
        console.log(data)
        setUser(data);
      })
    },[])
    
    useEffect(() => {
      fetch('http://localhost:8000/getBlogs')
      .then((response) => response.json())
      .then((data)=> {
        console.log(data);
        setBlogs(Array.isArray(data)? data:[data]);
      })
        

      .catch(err => {
        console.error("There was an error with that request",err)
      })
        
    },[])

    const handleDisplay = () => {
      setDisplay((prev) => !prev)
    }
    return(<>
    <Navigation1/>
    <h1 className="text-center text-4xl font-[500] mb-4">
        Blogs</h1>
    
    
    <h1 className="text-center text-3xl font-[500] hover:cursor-pointer" onClick={()=> handleDisplay()}>Show All</h1>
    <Swiper 
     direction ="horizontal"
     loop={true}
     pagination={{clickable: true}}
     navigation={true}
     scrollbar = {{draggable: true}}
     modules={[Navigation, Pagination, Scrollbar]}
     className="mySwiper h-[15rem] w-[60rem]"
     slidesPerView={3}
     >

    
    { display && blogs.map((blog) => {
      return(<SwiperSlide key={blog.blog_id}>
        <h1 className="text-2xl">{blog.title}</h1>
        <div className="w-60 h-40 flex">
          <img src={blog.image} className="rounded-xl"/>
        </div>
      </SwiperSlide>)
    
    })}
    </Swiper>
    

    
  
    
        
        </>)
}