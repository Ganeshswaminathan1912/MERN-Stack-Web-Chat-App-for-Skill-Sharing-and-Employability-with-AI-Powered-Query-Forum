const User = require("../models/User")
const bcrypt = require("bcrypt")

const router = require("express").Router()

// router.get("/", (req,res)=>{
//     res.send("auth route")
// })
//REGISTER
router.route("/register")
.post(async (req,res)=>{

    try{
        //generate new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        //create new user
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
            year:req.body.year,
            skills:req.body.skills,
            status:req.body.status
        })
        //save user
        const user = await newUser.save()
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})
//LOGIN
router.route("/login")
.post(async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})        
        if(!user){
            res.status(404).json("No record of Email")
            return
        }
        else if(user){
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if(validPassword){
               res.status(200).json(user) 
               return
            }else{
                res.status(404).json("Incorrect password")
                return
            }
        }
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router