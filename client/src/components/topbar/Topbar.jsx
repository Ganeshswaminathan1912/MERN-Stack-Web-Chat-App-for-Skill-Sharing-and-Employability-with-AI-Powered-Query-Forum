import "./topbar.css"
import { SearchOutlined, ChatOutlined, PsychologyAltOutlined} from "@mui/icons-material"
import { useContext } from "react"
import { Link } from "react-router-dom"
import {AuthContext} from "../../context/AuthContext"

export default function Topbar(){
     const {user} = useContext(AuthContext)
     const handleLogout = ()=>{
        localStorage.clear()
        window.location.reload()
        window.location.href = "/login";
     }
    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
            <Link to="/" style={{textDecoration:"none"}}>
                <span className="logo">SkillShareHub</span>
            </Link>
                
            </div>
            <div className="topbarCenter">
            <div className="searchbar">
            <SearchOutlined className="searchIcon"/>
            <input placeholder="Search for Queries (FE)" className="searchInput" />
            </div>                
            </div>
            <div className="topbarRight">
            <div className="topbarIcons">
            <div className="topbarIconItem">
            <Link to={"/"} className="profileLink">
                <PsychologyAltOutlined className="msgIcon"/>
            </Link>
            
            {/* <span className="topbarIconBadge">1</span> */}
            </div>
            <div className="topbarIconItem">
            <Link to={"/messenger"}>
            <ChatOutlined className="profileLink"/>
            </Link>
            {/* <span className="topbarIconBadge">1</span> */}
            </div>
            <div className="topbarLinks">
            <Link to={`/${user.username}`} className="profileLink">
            <span className="topbarLink">Profile</span>
            </Link>
            </div>
            </div>
            <div className="topbarLinks">
                <span className="topbarLink" onClick={handleLogout}>Logout</span>
            </div>
            </div>
        </div>
    )
}