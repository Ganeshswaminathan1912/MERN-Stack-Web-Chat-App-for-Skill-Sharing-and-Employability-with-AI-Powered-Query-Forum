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
                const conversation = {
                    senderId:user._id,
                    receiverId:res.data._id
                }
                await axios.post("api/conversations/",conversation)
                window.location.reload()
            // const checkRes = await axios.get(`api/conversations//${user._id}`)
            // console.log(checkRes);

            // const checkData = (data)=>{
            //     return data !== res.data._id && user._id
            // }
            // const dataArray = []
            // // console.log(checkRes);
            // for(let i=0;i<=checkRes.data.length;i++){
            //     if(checkRes.data[i].members.includes(user._id) === true && checkRes.data[i].members.includes(res.data._id) === true){
            //         alert("You already have a conversation with the user")
            //         break
            //     }
                // if(checkRes.data[i].members.includes(user._id) === false && checkRes.data[i].members.includes(res.data._id) === false){
                //     alert("You can create")
                //     break
                // }

            //     const result =  checkRes.data[i].members.find(checkData)
            // dataArray.push(result)
            // console.log(dataArray);
            //     if(checkRes.data[i].members[1] === res.data._id && checkRes.data[i].members[0] === user._id){
            //         alert("You already have a conversation with them")
            // //         break
            //     }
            //     else if(checkRes.data[i].members[1] === res.data._id && checkRes.data[i].members[0] !== user._id){
            //         alert("Can't create");
            //     }
            //     else if(checkRes.data[i].members[1] !== res.data._id && checkRes.data[i].members[0] !== user._id){
            //         alert("you can create")
                // }

            //     alert("you can create")
                // else if(checkRes.data[i].members[1] !== res.data._id && checkRes.data[i].members[0] === user._id){
                //     alert("You cannot create")
                //     break
                // }else if(checkRes.data[i].members[1] === res.data._id && checkRes.data[i].members[0] !== user._id){
                //     alert("you cannot create")
                //     break
                // }
                // else if(checkRes.data[i].members[1] !== res.data._id && checkRes.data[i].members[0] !== user._id){
                //     alert("you Can create")
                //     break
                // }  
            // }
                
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
