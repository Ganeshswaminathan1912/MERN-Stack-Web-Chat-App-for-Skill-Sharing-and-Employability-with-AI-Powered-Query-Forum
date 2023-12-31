const router = require("express").Router();
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kgsnsrm2023@gmail.com",
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

router.post("/:emailId/:userName",(req,res)=>{
    try {
        const mailOptions = {
        from: "SkillShareHub<welcome@skillsharehub.com>",
        to: req.params.emailId,
        subject: "Welcome to SkillShareHub!",
        html: `<h3>Hello ${req.params.userName}!,</h3><br><p>We would like to extend a warm welcome to SkillshareHub! We are thrilled to have you as a new member<br> of our community. <br><br>Here are a few instructions to help you get started:<br><br>1. Use the search function to find skills you are interested in: The search function allows you to find experts<br> in different fields. Just type in your desired skill, and a list of experts with the searched skill will appear.<br> Click on any of the results to start chatting with the expert.<br>2. Query forum powered by ChatGPT: Our Query Forum is powered by ChatGPT, an AI that can answer your<br> queries related to different skills. Just mention @ChatGPT in the query section to get an answer. If the AI<br> makes a mistake, our experts are always available to correct it and provide you with accurate <br> information.<br><br>We hope you find these instructions helpful in navigating SkillshareHub. If you have any questions or<br>concerns, please don't hesitate to contact us.<br><br><br><br>Best regards,<br>SkillshareHub Team</p>`,
};
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    res.status(200).json("Email sent: " + info.response);
  }
});
    } catch (error) {
        console.log(error);
    }
})

module.exports = router