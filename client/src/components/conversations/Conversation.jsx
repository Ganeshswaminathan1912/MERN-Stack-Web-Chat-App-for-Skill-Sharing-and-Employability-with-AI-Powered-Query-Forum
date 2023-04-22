import { useEffect, useState } from "react"
import "./conversation.css"
import axios from "axios"
import img from "../../person/profile.jpeg"


export default function Conversation({conversation, currentUser}) {
  const [user,setUser] = useState([])

  useEffect(()=>{
    const friendId = conversation.members.find((m)=> m!== currentUser._id)

    const getUser = async ()=>{
      try {
        const res = await axios.get(`api/user?userId=${friendId}`)
          setUser(res.data);
      } catch (error) {
        console.log(error);
      }
  
    }
    getUser()
  },[currentUser,conversation])

    // const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className="conversation">
    <img src={img} alt="profile_img" className="conversationImg" />
    <span className="conversationName">{user.username}</span>
    </div>
  )
}
