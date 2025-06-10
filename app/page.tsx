
"use client"
import Image from "next/image";
import Link from 'next/link';
import Navigation from './Components/navigation';
import {useState,useEffect} from 'react';

type result = {
  blog_id: number,
  title: string,
  blog_content: string,
  image: string,
  created: string,
}
export default function Home() {
  const [search,setSearch] = useState({
    query: ""
  })

  const [display, setDisplay] = useState(true)

  const handleDisplay = () => {
    setDisplay((prev) => prev? !prev: prev)
  }
  const [blogs, setBlogs] = useState<result[]>([])

  useEffect(() => {
    fetch('http://localhost:8000/getBlogs')
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      setBlogs(data)
    })
    .catch(err => {
      console.error("There appears to be an issue with that request",err)
    })

  }, [])

  

  const [results, setResults] = useState<result[]>([]);

  const handleChange = (e:React.ChangeEvent<any>) => {
    setSearch((prev) => ({...prev,[e.target.name]:e.target.value}))
  }

  const handleSubmit = async (e:React.ChangeEvent<any>) => {
    e.preventDefault();
    if (!search.query){
      alert("Search query can't be empty")
    }
    try{
      const response = await fetch('http://localhost:8000/searchBlogs', {
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({query: search.query}),
      })
      const data = await response.json()
      setResults(data);
  
    }catch(err){
      console.log("There appears to be an error with this request!");
    }

  }
  

  return (<>
    <Navigation />
    <section className="flex flex-row m-auto justify-center align-center">
      <div className="w-[50rem] h-[12rem]">
        <h1 className="text-3xl font-[500]">Blogwatch</h1>
        <h1 className="text-2xl font-[400]">Feed your creation.</h1>
        <h1 className="text-2xl font-[400] mb-3">Powered by Bloggers.</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row">
          <input type="text" placeholder = "Search blogs" name="query" id="query" className="w-[40rem] border-2 rounded-xl h-[3rem] pl-2" value={search.query} onChange={handleChange}></input>
          <div className="flex border-2 w-[4rem] h-[3rem] rounded-xl">
            <input type="image" src="https://www.iconpacks.net/icons/1/free-search-icon-957-thumb.png" className="w-[2rem] h-[2rem] m-auto " onClick={()=> handleDisplay()} />
          </div>
          </div>

        </form>
        
        </div>
  
        
       
      
    </section>
    <div className="flex flex-row m-auto  w-[80rem]  flex-wrap">
    {results.map((query)=> {
      return(<section key={query.blog_id}>
        <section className="flex flex-col h-[20rem] w-[26rem] mb-3 ">
          <h1 className="text-3xl font-[400]">{query.title}</h1>
          <div className="w-[25rem] h-[16rem] ">
            <img className=" w-full h-full rounded-xl object-cover hover: cursor-pointer hover:opacity-75" src={query.image} alt={query.title}></img>
          </div>

        </section>
      </section>)
    })}

    </div>
    <div className="m-auto w-[80rem] flex flex-row flex-wrap gap-2">
    {display && blogs.map(blog => {
      return(
      <section className="w-[26rem] h-[20rem]" key={blog.blog_id}>
        <h1 className="text-3xl">{blog.title}</h1>
        <div className="w-[25rem] h-[16rem]">
        <a href={`/blog/${blog.blog_id}`}><img className="h-full w-full object-cover rounded-xl hover:cursor-pointer hover:opacity-70"src={blog.image}></img> </a>

        </div>
      </section>
      )
    })}
    </div>
    </>);
}
