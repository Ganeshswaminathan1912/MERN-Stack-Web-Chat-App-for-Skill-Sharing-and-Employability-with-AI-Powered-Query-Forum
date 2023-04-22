const router = require("express").Router()
const user = require("../models/User")
const bcrypt = require("bcrypt")
const User = require("../models/User")

//update a document
router.route("/:id")
.patch(async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
                const usr = await User.updateOne({_id:req.params.id}, {
                    $set: req.body
                }).then(result =>{
                    res.status(200).json("Account has been updated")
                    console.log(result);
                })
            }catch(err){
                return res.status(500).json(err)
            }
        }else{
        try{
            const usr = await User.updateOne({_id:req.params.id}, {
                $set: req.body
            }).then(result =>{
                res.status(200).json("Account has been updated")
                console.log(result);
            })
        }catch(err){
            res.status(500).json(err)
        }
    }
    }else{
        return res.status(403).json("You can update only your account")
    }
    // User.updateOne({_id:req.body.userId},{$set:req.body}).then(result=>{
    //     console.log(result);
    // })
})

//delete user
.delete( async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const usr = await User.deleteOne({_id:req.params.id}).then(result =>{
                res.status(200).json("Account has been deleted")
                console.log(result);
            })
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        return res.status(403).json("You can delete only your account")
    }
    // User.updateOne({_id:req.body.userId},{$set:req.body}).then(result=>{
    //     console.log(result);
    // })
})

//get user with userId and username
router.get("/",async (req,res)=>{
    const userId = req.query.userId
    const username = req.query.username
    try{
    const usr = userId  ? await User.findById(userId):await User.findOne({username:username})
        const {password, updatedAt, ...other} = usr._doc
        // console.log(other);
        res.status(200).json(other)
    
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/allUsers", async(req,res)=>{
    try {
        const usrs = await User.find({})
        res.status(200).json(usrs)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router