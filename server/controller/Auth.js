const User = require("../models/User");
const OTP =  require("../models/OTP");
const otpGenerator = require("otp-generator")
const bcryptjs = require("bcryptjs");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {passwordUpdated} = require("../mail/templates/passwordUpdate")
const mailSender = require("../utils/mailSender")

//send OTP 
exports.sendotp = async (req,res) =>{
   try{
     //fetch email from req.body
     const {email} = req.body;

     //check if user already exist 
     const checkUserPresent = await User.findOne({email});
 
     //if user already exist then return a response
     if(checkUserPresent){
         return res.status(401).json({
             success:false,
             message:'User already registered'
         })
     }
 
     //generate otp
     var otp = otpGenerator.generate(6, {
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
     })
     console.log("OTP generated: ",otp);


     //check unique otp or not
     const result = await OTP.findOne({otp:otp});

     while(result){
        otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        result = await OTP.findOne({otp:otp});
     }

    const otpPayload = {email, otp}

     //create an entry in db for OTP
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    //return response successful
    res.status(200).json({
        success:true,
        message:"OTP sent successfully",
        otp
    })  


   }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
   }

}

//signup

exports.signup = async (req,res) =>{
    
    try{

        //data fetch from req.body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } =req.body;

        //validate
        if(!firstName || !lastName || !password || !confirmPassword
            || !otp){
                return res.status(403).json({
                    success:false,
                    message:"All fields are required"
                })
            }
        //match both passwords
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and ConfirmPassword value does not match"
            })
        }

        //check if user already exist or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already registered'
            });
        }

        //find most recent otp for the user
        const recentOtp =await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);

        //validate otp
        if(recentOtp.length == 0){
            //otp not found 
            return res.status(400).json({
                success:false,
                message:'OTP not found'
            })
        }else if(otp !== recentOtp.otp){
            //invalid otp
            return res.status(400).json({
                success:false,
                message:'Invalid OTP '
            })
        }
        
        //Hash Password
        const hashedPassword = await bcryptjs.hash(password, 10);


        //entry create in db 
        const profileDetails =  await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`, 
        })

        //return response  
        return res.status(200).json({
            success:true,
            message:'User is registered Successfully'
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User is not registered , Please try again"
        })
    }
 
}


//log in 
exports.login = async (req,res) =>{
    try{
        //get data
        const {email, password} = req.body;

        //validate data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:'All fields are required, please try again',
            })
        }

        //user check exist or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered, please signup first"
            })
        }

        //password match
        if(await bcryptjs.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"2h",
            })
            user.token  = token;
            user.password =undefined;

            //create cookie and send response
            const options = {
                expires : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly : true
            }
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in successfully'
            })
        }else{
            return res.status(401).json({
                success:false,
                message:"Password is Incorrect"
            })
        }   

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure, please try again',
        })
    }
}

exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcryptjs.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// // Match new password and confirm new password
		// if (newPassword !== confirmNewPassword) {
		// 	// If new password and confirm new password do not match, return a 400 (Bad Request) error
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "The password and confirm password does not match",
		// 	});
		// }

		// Update password
		const encryptedPassword = await bcryptjs.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				"Password Changed || StudyNotion",
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};