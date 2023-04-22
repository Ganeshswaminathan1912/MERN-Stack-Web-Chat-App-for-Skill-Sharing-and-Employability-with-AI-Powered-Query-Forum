const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            required:true
        },
        qTitle:{
            type: String,
            required:true
        },
        qDesc:{
            type:String,
            required:true
        },
        answer:{
            type:String
        }
},
{timestamps:true}
)
module.exports = mongoose.model("Post", PostSchema)