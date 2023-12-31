import "./post.css"
import { AccountCircleTwoTone, MoreVert } from "@mui/icons-material"
import moment from "moment"
import { useEffect, useState } from "react"
import Comment from "../comment/Comment"
import Sharecomment from "../sharecomment/Sharecomment"
import axios from "axios"
import {Link} from "react-router-dom"

export default function Post({post}) {

  
  const [show,setShow] = useState(false)
  const [user,setUser] = useState([])
  const [comments,setComments] = useState([])

  useEffect(()=>{
    const userData = []
    const fetchUser = async ()=>{
      await axios.get(`api/user?userId=${post.userId}`,userData).then(res =>{
        setUser(res.data)
      })
      
    }
    fetchUser()
  },[post.userId])

  useEffect(()=>{
    const postComments = []
    const fetchComments = async ()=>{
      await axios.get(`api/post/comments/${post._id}`,postComments).then(res =>{
        // setComments(res.data)
        setComments(res.data)
      })
      
    }
    fetchComments()
  },[post._id])

  
  function MyComponent(post) {
    const html = post.replace(/\n/g, "<br />")
    return (
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    );
  }

  function capitalize(params) {
    const firstLetter = params.charAt(0)
    const remainingLetters = params.slice(1)
     const cptLtr = firstLetter.toUpperCase() + remainingLetters
     return cptLtr
  }
  // let length = ""
  // const commentsLength = comments.length
  // if(commentsLength === 1 ){
  //   length = "Comment"
  // }
  // else{
  //   length = "Comments"
  // }
  // useEffect(() => {
  //   console.log("Post component reloaded!");
  // }, [reloadPost]);
  return (
    
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
            <div className="postTopLeft">
            <Link to={`${user.username}`}>
              <AccountCircleTwoTone className="accountIcon"/>
            </Link>
            <Link className="profileLink" to={`${user.username}`}>
                <span className="postUsername">{user.username}</span>
            </Link>  
            <Link className="profileLink" to={`${user.username}`}>
              <span className="postSkill">({user.skills})</span>
            </Link>
                
                <span className="postDate">{moment.utc(post.createdAt).local().startOf('seconds').fromNow()}</span>
            </div>
            <div className="postTopRight">
                <MoreVert/>
            </div>
        </div>
        <hr className="postHrTop" />
        <div className="postCenterTitle">
            <span className="postTitle">{capitalize(post.qTitle)}</span>
        </div>
        <div className="postCenterQuestion">
            <span className="postQuestion">{post.qDesc}</span>
        </div>
        <div className="postCenterTitle">
          <span className="postTitle">{post?.answer ? "Answer" : ""}</span>
        </div>
        
        <div className="postCenterAnswer">
            
            <p className="postAnswer">{post?.answer ? "": "Since you didn't mention '@chatgpt' answer will be posted by experts in the community in comments section"}</p>
            <span className="postAnswer">{post?.answer ? MyComponent(post?.answer) : ""}</span>
        </div>
        <hr className="postHrBottom" />
        <div className="postBottom">  
        <div className="postBottomLeft">
        </div>      
        { 
          show &&
        <div>     
        <div className="commentCenterTitle">
            <span className="commentTitle">Comments</span>
        </div>
            <span className="postTitle"><Comment posts={post}/></span>
        <Sharecomment posts = {post}/>
        </div>
        }
        <div className="postBottomRight">
        
            <span type = "button" className="postCommentText" onClick={()=> setShow(!show)}>{comments.length} {comments.length === 1 ? "Comment":"Comments"}</span>
        </div>
        </div>

      </div>
    </div>
  )
}

