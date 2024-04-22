const mongoose = require("mongoose"); 
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
});

//function to send email
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Veirfication Email from StudyNotion", otpTemplate(otp) );
        console.log("Email sent Successfully",mailResponse)
    }catch(error){
        console.log("Error occured while sending mails",error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
} )

module.exports = mongoose.model("OTP", OTPSchema)