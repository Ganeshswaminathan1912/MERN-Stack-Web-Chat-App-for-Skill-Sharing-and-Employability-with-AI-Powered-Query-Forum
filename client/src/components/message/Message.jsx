import moment from "moment"
import "./message.css"
import img from "../../person/profile.jpeg"

export default function Message({message,own}) {
    
  return (
    <div className={own? "message own":"message"}>
      <div className="messageTop">
        <img src={img} alt="" className="messageImg" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{moment.utc(message.createdAt).local().startOf('seconds').fromNow()}</div>
    </div>
  )
}
