const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const conversationRoute = require("./routes/conversations")
const messageRoute = require("./routes/messages")

const app = express()

dotenv.config()


mongoose.connect(process.env.MONGOOSE_URL, {useNewUrlParser: true})
// mongoose.connect(process.env.MONGOOSE_URL, ()=>{
//     console.log("Connested to MongoDB");
// })

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/post", postRoute)
app.use("/api/conversations", conversationRoute)
app.use("/api/messages", messageRoute)

app.route("/")
.get((req,res)=>{
    res.send("Welcome")
})


app.listen(8800, ()=>{
    console.log("Server started on port 8800");
})