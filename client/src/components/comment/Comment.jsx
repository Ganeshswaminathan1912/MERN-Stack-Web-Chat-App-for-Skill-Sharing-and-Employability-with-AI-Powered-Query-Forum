import "./comment.css"
import { AccountCircleTwoTone} from "@mui/icons-material"
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Comment(posts) {
  //iterate for userid for comments or try undo in post.js
  const [comments,setComments] = useState([])
  const [commenter,setCommenter] = useState([])


  useEffect(()=>{
    const postComments = []
    const fetchComments = async ()=>{
      await axios.get(`api/post/comments/${posts.posts._id}`, postComments).then(res=>{
        setComments(res.data)
      })
    }
    fetchComments()
  },[posts.posts._id])

  useEffect(()=>{
    const userData = []
    const fetchCommenter = async()=>{
      for(let i = 0;i<=comments.length;i++){
        await axios.get(`api/user?userId=${comments[i].userId}`,userData).then(res=>{
          setCommenter(res.data)
        })
      }
    }
    fetchCommenter()
  },[comments])

  // const comment = Comments.filter(c=>c.postId === posts.posts._id)
  // const [comments] = useState(comment)
  // comments.map((c,i)=>(
    // console.log(Users.filter(u=>u._id === c.userId)[0].username, c.comment)
  // ))
  return (
    comments.map((c,i)=>(
          <div className="comment">
        <div className="commentCenterContent">
        <div className="commentTop">
            <div className="commentTopLeft">
            <Link to={`${commenter.username}`}>
              <AccountCircleTwoTone className="commentAccountIcon"/>
            </Link>
            <Link className="profileLink" to={`${commenter.username}`}>
              <span className="commentUsername">{commenter.username}</span>
            </Link>
                {/* iterate for comments*/}
                <span className="commentContent">{c.comment} <span className="commentDate">{moment.utc(c.createdAt).local().startOf('seconds').fromNow()}</span></span>

                
            </div>
        </div>
        </div>
    </div>

    ))

    
  )
}
