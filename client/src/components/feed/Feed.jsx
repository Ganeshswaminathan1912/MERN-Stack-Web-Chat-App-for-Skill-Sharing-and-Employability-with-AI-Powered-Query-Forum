import { useContext, useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'
import axios from "axios"
import {AuthContext} from "../../context/AuthContext"


export default function Feed() {

  // const [data,setData] = useState(false)

  // const handleReload = () => {
  //   setData(true)
  // };

  // useEffect(()=>{
  //   handleReload()
  // },[data])


  const {user} = useContext(AuthContext)
  // console.log(Posts,Comments,Users);
  const [post, setPost] = useState([])

  useEffect(()=>{
    const userData = []
    const fetchPosts = async ()=>{
      const res = await axios.get(`api/post/timeline/${user._id}`,userData)
        setPost(res.data.sort((p1,p2)=>{
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }))
      // })
      
    }
    fetchPosts()
   
  },[user._id])
 
  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Share />
        {post.map((p) =>(
            <Post key={p._id} post={p}/>
        ))}
        
      </div>
      
    </div>
  )
}

