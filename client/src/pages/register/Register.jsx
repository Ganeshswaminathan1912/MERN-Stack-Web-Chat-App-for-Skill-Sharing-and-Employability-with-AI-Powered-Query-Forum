import { useRef} from "react"
import "./register.css"
import axios from "axios"
import {Link} from "react-router-dom"

export default function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const year = useRef()
    const skills = useRef()
    const status = useRef()

        // const [message, setMessage] = useState("default");
      
        // useEffect(() => {
        //     if(axios.get(`api/user/searchEmail/${email.current.value}`) != null) {
        //         console.log("User already exists")
        //         setMessage("User already exists")
        //         console.log(message);
        //      } else{
        //         console.log("You can proceed");
        //      }
        // }, [message]);

    const handleClick = async (e)=>{
        e.preventDefault()
        const user = {
            username:username.current.value,
            email:email.current.value,
            password:password.current.value,
            year:year.current.value,
            skills:skills.current.value,
            status:status.current.value,
        }
        try {
            // if(await axios.get(`api/user/searchEmail/${email.current.value}`) != null) {
            //    console.log("User already exists")
            // } else{
                await axios.post("api/auth/register", user)
                window.location.href = "/login";
                await axios.post(`api/sendEmail/${email.current.value}/${username.current.value}`)
            // }

        } catch (error) {
            console.log(error);
        }
    }




  return (
    <div className="register">
    <div className="registerWrapper">
        <div className="registerLeft">

        </div>
        <div className="registerRight">
            <div className="registerBox">
            <h3 className="registerLogo">SkillShareHub</h3>
            <h4 className="registerDescTitle">
            Please Sign Up!
            </h4> 
            </div>
            <form className="registerLeft" onSubmit={handleClick}>
                 <div class="input-block-register">
                    <input type="text" name="username" id="input-text" required ref={username} spellcheck="false"/>
                        <span class="placeholder">
                            Username
                        </span>
                </div>
                <div class="input-block-register">
                    <input type="email" name="email" id="input-text" required ref={email} spellcheck="false"/>
                        <span class="placeholder">
                            Email
                        </span>
                </div>  
                <div class="input-block-register">
                    <input type="password" name="password" minLength="6" id="input-text" required ref={password} spellcheck="false"/>
                        <span class="placeholder">
                            Password
                        </span>
                </div>   
                <div class="input-block-register-year">
                    <input min={"1"} max={"4"} type="number" name="year" id="input-text" required ref={year} spellcheck="false"/>
                        <span class="placeholder">
                            Year
                        </span>
                        <span className="inpDescTitle">Current year that you're studying</span>
                </div>    
                <div class="input-block-register-skills">
                    <input type="text" name="skills" id="input-text" required ref={skills} spellcheck="false"/>
                        <span class="placeholder">
                            Skills
                        </span>
                </div>
                <div class="input-block-register-status">
                    <input type="text" name="status" id="input-text" required ref={status} spellcheck="false"/>
                        <span class="placeholder">
                            Status
                        </span>
                        <span className="inpDescTitle">Student or Teacher</span>
                </div> 
                <Link to={"/login"}>
                    <button className="registerLoginButton">Log In?</button>
                </Link>             
                
                <button className="registerButton">Sign Up</button>
            </form>


            </div>

    </div>

    </div>
  )
}
