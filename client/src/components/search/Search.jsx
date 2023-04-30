import axios from "axios"
import "./search.css"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"

export default function Search(results) {
    const {user} = useContext(AuthContext)

    const handleClick = async (value)=>{
        if(value === user.username){
            alert("This is you, you cannot start a conversation with yourself");
        }else{
            const res = await axios.get(`api/user?username=${value}`)
            // console.log(res.data._id);

            const checkRes = await axios.get(`api/conversations/receiver/${res.data._id}/${user._id}`)
            // console.log(checkRes.data.length);
            if(checkRes.data.length === 1){
                alert("You already have a conversation with them")
            }else{
                const conversation = {
                    senderId:user._id,
                    receiverId:res.data._id
                }
                await axios.post("api/conversations/",conversation)
                window.location.reload()
            }   
        }
        
    }

  return (
    <div className="parentDiv">
    <div className="parentDivWrapper">
    {results.results.map((r)=>(
        r.username === user.username ?(
    <div onClick={(e)=>handleClick(`${r.username}`)} className="childDiv">
    <div key={r._id} style={{fontSize:"20px"}}>{r.username}</div>
    <div key={r._id}>{r.skills + " (You)"}</div>
    </div>
        ):(
    <div onClick={(e)=>handleClick(`${r.username}`)} className="childDiv">
    <div key={r._id} style={{fontSize:"20px"}}>{r.username}</div>
    <div key={r._id}>{r.skills}</div>
    </div>
        )
    ))}    
    </div>
  </div>
  )
}
