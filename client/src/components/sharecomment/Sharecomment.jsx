import { useContext, useRef } from "react"
import "./sharecomment.css"
import { SendTwoTone } from "@mui/icons-material"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"

export default function Sharecomment(posts) {
  const comment = useRef()
  const {user} = useContext(AuthContext)
  const submitHandler = async ()=>{
    const newComment = {
      userId:user._id,
      comment:comment.current.value
    }
    try {
      await axios.post(`api/post/${posts.posts._id}`,newComment)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form className="shareCommentContainer" autoComplete="off" onSubmit={submitHandler}>
            <div className="shareCommentCenter">
            <div className="shareCommentTop">
            <input placeholder="Comment" name = "comment" ref={comment} className="shareCommentInput" autoComplete="off"/>
            </div>                
            </div>
            <div className="shareCommentRight">
            <div className="commentSend">
            <div className="shareCommentIconItem">
            <button type="submit" className="faButton">
              <SendTwoTone className="iconRight"/>
            </button>
            
            </div>
            </div>
            </div>
        </form>
  )
}

