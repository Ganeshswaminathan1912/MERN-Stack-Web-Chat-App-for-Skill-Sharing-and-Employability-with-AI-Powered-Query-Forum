import { useContext, useEffect, useState } from "react";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css"
import axios from "axios";
import { useParams } from "react-router";
import img from "../../person/profile.jpeg"
import { AuthContext } from "../../context/AuthContext";




export default function Profile() {
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const {user} = useContext(AuthContext)
  const [userDyn,setUser] = useState({})
  const username = useParams().username

  useEffect(()=>{
    const userData = []
    const fetchUser = async ()=>{
      await axios.get(`api/user?username=${username}`,userData).then(res=>{
        setUser(res.data);
      })
    }
    fetchUser()
  },[username])

const handleSubmit = async(value)=>{
  const res = await axios.get(`api/user?username=${value}`)
            // console.log(res.data._id);

            const checkRes = await axios.get(`api/conversations/receiver/${res.data._id}/${user._id}`)
            // console.log(checkRes.data.length);
            if(checkRes.data.length === 1){
              window.location.href = "/messenger";
            }else{
                const conversation = {
                    senderId:user._id,
                    receiverId:res.data._id
                }
                await axios.post("api/conversations/",conversation)
                window.location.href = "/messenger";
            }
}
  //   const userData = []
  //   const fetchUser = async ()=>{
  //     await axios.get(`api/user?username=kgsn_1912`,userData).then(res =>{
  //       console.log(res);
  //     })
      
  //   }
  //   fetchUser()
  // },[])

  return (
    <div>
      <Topbar/>
      <div className="profile">
      <Leftbar/>
        <div className="profileRight">
            <div className="profileRightTop">
            <div className="profileCover">
            <img src={img} className="profileImage" alt = "profileImg" />
            <div className="myProfile"><span className="profileInfoDescription">My Profile</span></div>
            
            </div>
            {userDyn.username === user.username ? (
              <div className="profileInfo">
                <h4 className="profileInfoName">{userDyn.username}</h4>
                <hr className="profileHr" />
                <div className="profileInfoDescription">Skills :<span className="profileInfoDescription">{userDyn.skills}</span></div>
                <div className="profileInfoDescription">Status :<span className="profileInfoDescriptionStatus">{userDyn.status}</span></div>
                <div className="profileInfoDescription">Year :<span className="profileInfoDescriptionYear">{userDyn.year}</span></div>
            </div>
            ):(
              <div className="profileInfo">
                <h4 className="profileInfoName">{userDyn.username}</h4>
                <hr className="profileHr" />
                <div className="profileInfoDescription">Skills :<span className="profileInfoDescription">{userDyn.skills}</span></div>
                <div className="profileInfoDescription">Status :<span className="profileInfoDescriptionStatus">{userDyn.status}</span></div>
                <div className="profileInfoDescription">Year :<span className="profileInfoDescriptionYear">{userDyn.year}</span></div>
                <button className="shareButtonProfile" type='submit' onClick={e=>handleSubmit(userDyn.username)} >Chat</button>
            </div>
            )
            
            }

            
            </div>           
            <Rightbar/>
        </div>
      </div>    
      <div className="foot">
      <span className="footText">@Copyright SkillShareHub</span>
      
      </div>
    </div>

  )
}
