import './share.css'
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef } from 'react';
import axios from 'axios';

export default function Share() {


  const title = useRef()
  const question = useRef()
  const {user} = useContext(AuthContext)


const submitHandler = async (e)=>{
  e.preventDefault()
  const newPost = {
    userId:user._id,
    qTitle:title.current.value,
    qDesc:question.current.value
  }
  try {
    await axios.post("api/post",newPost)
    window.location.reload()
  } catch (err) {
    console.log(err);
  }
}
  return (
    <form className='share' onSubmit={submitHandler} autoComplete='off'>
      <div className="shareWrapper">
        <div className="shareTop">
        <input name='title' ref={title} placeholder='Title' className="shareInput" spellCheck = "true" autoComplete='false' required/>
        </div>
        <hr className="shareHr" />
        <textarea name='question' ref={question} placeholder="Ask your question here, Mention @chatgpt and then your question for chatgpt to answer" className="shareInput" spellCheck="true" autoComplete='false' required></textarea>
      </div>
      <div className="shareBottom">
        <button className="shareButton" type='submit' >Post</button>
      </div>
    </form>
  )
}
