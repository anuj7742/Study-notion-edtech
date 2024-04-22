const jwt  = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
// exports.auth = async (req,res, next) =>{
//     try{
//         //extract token 
//         const token = req.cookies.token
//                                 || req.body.token
//                                 || req.header("Authorization").replace("Bearer ","");
//         //if token missing then return response
//         console.log("Token",token)
//         console.log(process.env.JWT_SECRET)
//         if(!token){
//             return res.status(401).json({
//                 success:false,
//                 message:'Token is missing'
//             });
//         }

//         //verify the token
//         try{
//             const decode = await  jwt.verify(token, process.env.JWT_SECRET)
//             console.log("Token",token)
//             console.log(decode);
//             req.user = decode;
//         }catch(error){
//             return res.status(401).json({
//                 success:false,
//                 message:'Token is invalid'
//             });
//         }

//         next();


//     }catch(error){
//         return res.status(401).json({
//             success:false,
//             message:'Something went wrong while validating the token'
//         });
//     }
// }

exports.auth = async (req, res, next) => {
	try {
		// Extracting JWT from request cookies, body or header
      
        // console.log("Headers:", req.headers);
    
		const token =
			req.cookies.token ||
			req.body.token ||
            (req.headers.authorization && req.headers.authorization.replace("Bearer ", ""));//req.header("Authorization").replace("Bearer ", "");

		// If JWT is missing, return 401 Unauthorized response
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {
			// Verifying the JWT using the secret key stored in environment variables\
            // console.log("Token in middleware",token)
			const decode = jwt.verify(token, process.env.JWT_SECRET);
			// console.log(decode);
			// Storing the decoded JWT payload in the request object for further use
			req.user = decode;
		} catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res
				.status(401)
				.json({ success: false, 
                    message: "token is invalid" });
		}

		// If JWT is valid, move on to the next middleware or request handler
		next();
	} catch (error) {
		// If there is an error during the authentication process, return 401 Unauthorized response
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
};


exports.isStudent = async (req, res, next) =>{
    try{
         
        if(req.user.accountType !== "Student" ){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for students only'
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified , please try again'
        })
    }
}


exports.isInstructor = async (req, res, next) =>{
    try{
        const userDetails = await User.findOne({ email: req.user.email });
		console.log(userDetails);

		console.log(userDetails.accountType);
        if(userDetails.accountType !== "Instructor" ){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Instructor only'
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified , please try again'
        })
    }
}

exports.isAdmin = async (req, res, next) =>{
    try{
         console.log("User ",req.user.accountType)
         const userDetails = await User.findOne({ email: req.user.email });
        if(userDetails.accountType !== "Admin" ){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Admin only'
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified , please try again'
        })
    }
}