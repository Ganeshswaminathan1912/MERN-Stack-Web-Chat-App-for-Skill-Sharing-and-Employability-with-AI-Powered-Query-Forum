import "./login.css"
import { useContext, useEffect, useRef, useState } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress"
import { Link } from "react-router-dom";

export default function Login() {
    const email = useRef()
    const password = useRef()
    const [welcomeMessage,setWelcomeMessage] = useState("Please Login to Continue")
const {user, isFetching, error, dispatch} = useContext(AuthContext)
   

    const handleClick = (e)=>{
        e.preventDefault()
        loginCall({email:email.current.value,password:password.current.value},dispatch)


        // console.log(user,error);
    }        
    useEffect(()=>{
        if(user === null){
            setWelcomeMessage(error?.response?.data)
        }
        },[error?.response?.data,user])
    
  return (
    <div className="login">
    <div className="loginWrapper">
        <div className="loginLeft">

        </div>
        <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
            <h3 className="loginLogo">SkillShareHub</h3>
            <h4 className="loginDescTitle">
                Welcome Back!
            </h4> 
            <span className="loginDesc">
                Please Login to continue
            </span>
            <span className="loginDescDyn">
                {welcomeMessage}
            </span>
                <div className="input-block" id="email">
                    <input type="email" name="email"  required ref={email} spellCheck="false"/>
                        <span className="placeholder">
                            Email
                        </span>
                </div>
                <div className="input-block">
                    <input type="password" name="password"  minLength="6" required ref={password} spellCheck="false"/>
                        <span className="placeholder">
                            Password
                        </span>
                </div>        
                <Link to={"/register"}>
                    <button className="loginRegisterButton">Create a New Account?</button>
                </Link>        
                
                <button className="loginButton" type="submit" >{isFetching ? <CircularProgress color="inherit" size="17.5px"/> : "Log In"}</button>

            </form>
        </div>
    </div>

    </div>
  )
}
