const router = require("express").Router()
const { response } = require("express")
const Post = require("../models/Posts")
const Comment = require("../models/Comments")
require('dotenv').config()
const {Configuration, OpenAIApi} = require("openai")
const { route } = require("./users")
const User = require("../models/User")
const Comments = require("../models/Comments")

//openAI API call

const config = new Configuration({
    organization: "org-KOVbZpkvfUKRhhfznJ7HGBIL",
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)
const content = "Hello this is chatgpt, if you want me to answer please type @chatgpt and then enter your query."
const ansTitle = "Answer"
async function data(query){
var completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: query,
    max_tokens:4000,
    temperature:0,
});
return completion.data.choices[0].text
}

//create a question
router.route("/")
.post(async (req,res)=>{
    if (req.body.qDesc.split(" ")[0] == "@chatgpt"){
        try{
            data(req.body.qDesc).then(response=>{
                Post.create({userId:req.body.userId ,qTitle:req.body.qTitle, qDesc:req.body.qDesc, answer:response}).then(result =>{
                    res.status(200).json(result)
                })
                
            })
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        const newPost = Post(req.body)
        try{
            const savedPost = await newPost.save()
            res.status(200).json(savedPost)
        }catch(err){
            res.status(500).json(err)
        }
    }

})

//post a comment
router.route("/:id")
.post(async (req,res)=>{
    try{
        Comment.create({userId:req.body.userId, postId:req.params.id, comment:req.body.comment}).then(result =>{
        res.status(200).json(result)
    })
}catch(err){
    res.status(500).json(err)
}
})

//delete a question
.delete(async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id).then(result=>{
            if(result.userId === req.body.userId){
                Post.deleteOne().then(ans =>{
                    console.log(ans);
                })
                res.status(200).json("The post has been deleted")
            }else{
                res.status(403).json("You can only delete your post")
            }
        })
    }catch(err){
        res.status(500).json(err)
    }
})

//get a particular post
router.route("/viewPost/:id")
.get(async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id).then(result=>{
        res.status(200).json(result)
    })
    }catch(err){
        res.status(500).json(err)
    }

})

//get all posts
router.route("/timeline/:userId")
.get(async(req,res)=>{
    try{
        const currentUser = await User.findById(req.params.userId)
        const userPosts = Post.find({userId:currentUser.id}).then(result =>{
            const allPosts = Post.find({}).then(resultAll=>{
                res.status(200).json(resultAll)
            })
            
        })
        
        
        
    }catch(err){
        res.status(500).json(err)
    }
})

//get comments based on postID
router.route("/comments/:id")
.get(async(req,res)=>{
    try{
        const comments = await Comments.find({postId:req.params.id}).then(result =>{
            res.status(200).json(result)
        })
    }catch(err){
        res.send(500).json(err)
    }
})

//642d68e5533b5462d5b49682
// data("what is javascript").then(res=>{
//     console.log(res);
// })

module.exports = router