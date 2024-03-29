const router = require("express").Router();
const Message = require("../models/Message");
const Conversation = require("../models/Message")

//add
router.post("/", async(req,res)=>{
    const newMessage = new Message(req.body)
    try {
        const sentMessage = await newMessage.save()
        res.status(200).json(sentMessage)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get
router.get("/:conversationId",async(req,res)=>{
    try {
        const messages = await Message.find({conversationId:req.params.conversationId})
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(err)
    }
})

module.exports = router