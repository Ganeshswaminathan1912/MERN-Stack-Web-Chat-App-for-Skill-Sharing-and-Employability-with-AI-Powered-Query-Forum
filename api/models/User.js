const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            min:3,
            max:20,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            min:8
        },
        year:{
            type:Number,
            required:true,
            min:1
        },
        skills:{
            type: String,
            required:true
        },
        status:{
            type:String,
            required:true,
            min:6
        },
        isAdmin:{
            type:Boolean,
            default:false
        }
},
{timestamps:true}
)
module.exports = mongoose.model("User", UserSchema)