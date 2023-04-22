import { useEffect, useState } from "react";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css"
import axios from "axios";
import { useParams } from "react-router";
import img from "../../person/profile.jpeg"




export default function Profile() {
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user,setUser] = useState({})
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
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <hr className="profileHr" />
                <div className="profileInfoDescription">Skills :<span className="profileInfoDescription">{user.skills}</span></div>
                <div className="profileInfoDescription">Status :<span className="profileInfoDescriptionStatus">{user.status}</span></div>
                <div className="profileInfoDescription">Year :<span className="profileInfoDescriptionYear">{user.year}</span></div>
            </div>
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
