import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversations/Conversation"
import Message from "../../components/message/Message"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import {io} from "socket.io-client"
import Search from "../../components/search/Search"
import { ArrowRightAltTwoTone } from "@mui/icons-material"

export default function Messenger() {
  const {user} = useContext(AuthContext)
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();
  const [input,setInput] = useState("")
  const [results, setResults] = useState([])

  useEffect(()=>{
    socket.current = io("ws://localhost:8900")
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  },[])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      // console.log(users)
    });
  }, [user]);


  //get convo from db
  useEffect(()=>{
    const getConversation = async ()=>{
      try {
        const res = await axios.get(`api/conversations/${user._id}`)
        setConversations(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getConversation()
  },[user._id])

  //get messages from db
  useEffect(()=>{
    const getMessages = async ()=>{
      try {
        const res = await axios.get(`api/messages/${currentChat?._id}`)
        setMessages(res.data)
      } catch (error) {
        console.log(error);
      }
      
    }
    getMessages()
  },[currentChat])

  //call this function on submit
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const message = {
      sender:user._id,
      text:newMessage,
      conversationId:currentChat._id
    }

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post("api/messages",message)
      setMessages([...messages,res.data])
      setNewMessage("")
    } catch (error) {
      console.log(error);
    }
  }

  //scroll to the bottom
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])

  const fetchData = async(value)=>{
    const res = await axios.get("api/user/allUsers")
    // res.data.map(r=>(
    //   console.log(r.username,r._id,r.skills)
    // ))
    const results = res.data.filter((userData)=>{
      return value && userData && userData.skills && userData.skills.toLowerCase().includes(value)
    })
    setResults(results);
    // console.log(results);
  }

  const handleChange = (value)=>{
    setInput(value)
    fetchData(value)
  }

  return (
    <>
    <Topbar/>
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
        {conversations.map((c)=>(
          <div onClick={()=>setCurrentChat(c)}>
            <Conversation conversation = {c} currentUser={user}/>
          </div>
        ))}
        
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
        {currentChat ? (
        <>
        <div className="chatboxTop">
        {messages.map((m)=>(
          <div ref={scrollRef}>
            <Message message = {m} own = {m.sender === user._id}/>
          </div>
        ))}
            

        </div>
        <div className="chatboxBottom">

            <input placeholder="Type to send" type="text" className="chatMessageInput" onChange={(e)=>{setNewMessage(e.target.value)}} value={newMessage} required/>
            <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
        </div>
        </>)
         : <span className="noConversationText">Click on a conversation to start chatting or search for skills in the search <ArrowRightAltTwoTone className="searchSubmitButton "/> </span>
        }
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
        <input type="text" placeholder="Search for Skill" className="chatMenuInput" value={input} onChange={e=>handleChange(e.target.value)}/>
          <Search results = {results}/>
        </div>
      </div>
    </div> 
    </>

  )
}
