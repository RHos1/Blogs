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
  category: string;
  tags: string;

}

type User = {
  loggedIn: boolean;
  username: string;
}

export default function Page(){

    const[display,setDisplay] = useState(true);
    const[blogs,setBlogs] = useState<Blog[]>([]);
    const[user,setUser] = useState<User  | null>(null);
    const[travel, setTravel] = useState<Blog[]>([]);
    const[work, setWork] = useState<Blog[]>([]);

    

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

    useEffect(() => {
      
      const tdata = blogs.filter((item) => item.category === "travel");
      setTravel(tdata);
      const wdata = blogs.filter((item) => item.category === "work");
      setWork(wdata);
      
      
    },[blogs])

    const handleDisplay = () => {
      setDisplay((prev) => !prev)
    }
    return(<>
    <Navigation1/>
    <h1 className="text-center text-5xl font-[500] mb-4">
        Blogs</h1>
 
       
   
    
    
    <h1 className="text-4xl font-[500] text-center">Travel</h1>
    
    <Swiper 
     direction ="horizontal"
     loop={true}
     pagination={{clickable: true}}
     navigation={true}
     scrollbar = {{draggable: true}}
     modules={[Navigation, Pagination, Scrollbar]}
     className="mySwiper h-[20rem] w-[65rem] mb-8"
     slidesPerView={3}
     >

    

    
    {travel.map((blog) => {
      return(<SwiperSlide key={blog.blog_id}>
        <h1 className="text-2xl ">{blog.title}</h1>
        <div className="w-60 h-60 flex flex-col rounded-xl overflow-hidden ">
          <img className="w-60 h-40" src ={blog.image} />
          <div className="w-60 h-20  bg-[#b8c8e3] flex flex-row justify-center align-center">
            <div className="mt-4 gap-2 justify-center align-center flex flex-row">
              <img className="w-10 h-10" src="../send.png"></img>
              <img className="w-10 h-10" src="../heart (1).png"></img>
              <img className="w-10 h-10" src="../forum-icon.png"></img>
              <img className="w-10 h-10" src="../save.png"></img>
            </div>
          </div>
          
        </div>
      </SwiperSlide>)
    
    })}
    </Swiper>

    <h1 className="text-4xl font-[500] text-center">Work</h1>
    
    <Swiper 
     direction ="horizontal"
     loop={true}
     pagination={{clickable: true}}
     navigation={true}
     scrollbar = {{draggable: true}}
     modules={[Navigation, Pagination, Scrollbar]}
     className="mySwiper h-[20rem] w-[65rem] mb-4"
     slidesPerView={3}
     >

    

    
    {work.map((blog) => {
      return(<SwiperSlide key={blog.blog_id}>
        <h1 className="text-2xl ">{blog.title}</h1>
        <div className="w-60 h-60 flex flex-col rounded-xl overflow-hidden ">
          <img className="w-60 h-40" src ={blog.image} />
          <div className="w-60 h-20  bg-[#b8c8e3] flex flex-row justify-center align-center">
            <div className="mt-4 gap-2 justify-center align-center flex flex-row">
              <img className="w-10 h-10" src="../send.png"></img>
              <img className="w-10 h-10" src="../heart (1).png"></img>
              <img className="w-10 h-10" src="../forum-icon.png"></img>
              <img className="w-10 h-10" src="../save.png"></img>
            </div>
          </div>
          
        </div>
      </SwiperSlide>)
    
    })}
    </Swiper>

    <h1 className="text-center text-3xl font-[500] hover:cursor-pointer" onClick={()=> handleDisplay()}>Show All</h1>

    <Swiper 
     direction ="horizontal"
     loop={true}
     pagination={{clickable: true}}
     navigation={true}
     scrollbar = {{draggable: true}}
     modules={[Navigation, Pagination, Scrollbar]}
     className="mySwiper h-[20rem] w-[65rem]"
     slidesPerView={3}
     >

    
    { display && blogs.map((blog) => {
      return(<SwiperSlide key={blog.blog_id}>
        <h1 className="text-2xl ">{blog.title}</h1>
        <div className="w-60 h-60 flex flex-col rounded-xl overflow-hidden ">
          <img className="w-60 h-40" src ={blog.image} />
          <div className="w-60 h-20  bg-[#b8c8e3] flex flex-row justify-center align-center">
            <div className="mt-4 gap-2 justify-center align-center flex flex-row">
              <img className="w-10 h-10" src="../send.png"></img>
              <img className="w-10 h-10" src="../heart (1).png"></img>
              <img className="w-10 h-10" src="../forum-icon.png"></img>
              <img className="w-10 h-10" src="../save.png"></img>
            </div>
          </div>
          
        </div>
      </SwiperSlide>)
    
    })}
    </Swiper>

    
   
    

    
  
    
        
        </>)
}