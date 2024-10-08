const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

//resetPassword token 
exports.resetPasswordToken = async (req,res) =>{
    try{
            //get email from req.body
        const email = req.body.email;
        //email validation
        const user = await User.findOne({ email: email });
        if(!user){
            return res.status(401).json({
                success:false,
                message:'Your Email is not registered'
            })
        }
        //generate token
        const token = crypto.randomUUID();
        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
                                            {email:email},
                                            {
                                                token:token,
                                                resetPasswordExpires:Date.now()+ 5*60*1000
                                            },
                                            {new:true})
        //create url
        const url = `https://study-notion-edtech-iota.vercel.app/update-password/${token}`
        //send mail containing the url
        await mailSender(email,
                        "Password Reset Link",
                        `Password Reset Link: ${url}`);
        //return response
        return res.json({
            success:true,
            message:'Email sent successfully, please check email and change password'
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset pwd mail'
        })    
    }

}
// exports.resetPasswordToken = async (req, res) => {
// 	try {
// 		const email = req.body.email;
// 		const user = await User.findOne({ email: email });
// 		if (!user) {
// 			return res.json({
// 				success: false,
// 				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
// 			});
// 		}
// 		const token = crypto.randomBytes(20).toString("hex");

// 		const updatedDetails = await User.findOneAndUpdate(
// 			{ email: email },
// 			{
// 				token: token,
// 				resetPasswordExpires: Date.now() + 3600000,
// 			},
// 			{ new: true }
// 		);
// 		console.log("DETAILS", updatedDetails);

// 		const url = `http://localhost:3000/update-password/${token}`;

// 		await mailSender(
// 			email,
// 			"Password Reset",
// 			`Your Link for email verification is ${url}. Please click this url to reset your password.`
// 		);

// 		res.json({
// 			success: true,
// 			message:
// 				"Email Sent Successfully, Please Check Your Email to Continue Further",
// 		});
// 	} catch (error) {
// 		return res.json({
// 			error: error.message,
// 			success: false,
// 			message: `Some Error in Sending the Reset Message`,
// 		});
// 	}
// };


//resetPassword

exports.resetPassword = async (req,res) =>{
    try{
            //data fetch
        const {password, confirmPassword, token} = req.body;
        //validation
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:'Password not matching'
            })
        }
        //get userDetails from db using token
        const userDetails =await User.findOne({token: token});
        //if no entry - invalid token
        if(!userDetails){
            return res.json({
                success:false,
                message:"Token is invalid"
            })
        }
        //token time check
        if( userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"Token is expired, please regenerate your token"
            })
        }
        //hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        //password update
        await User.findOneAndUpdate(
            {token: token},
            {password: hashedPassword},
            {new:true}
        );
        //return response
        return res.status(200).json({
            success:true ,
            message:"Password reset Successfully"
        })
    }catch(error){
        return res.status(500).json({
            success:false ,
            message:"Something went wrong while password reset"
        })
    }

}
