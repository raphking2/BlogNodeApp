const { findOne, findById } = require('../models/user')
const User = require('../models/user')
const ErrorResponse = require("../utils/errorResponse");

exports.signup = async (req,res,next)=>{
   const {email} = req.body
   const userExist = await User.findOne({email});
   if(userExist){
    return res.status(400).json({
        success: false,
        message:"Email already Exist"
    })
   }
     
   try {

    const user = await User.create(req.body)

    res.status(201).json({
        success:true,
        user
    })

    
   } catch (error) {
    console.log(error)
    res.status(400).json({
        success: false,
        message: error.message
    })
    
   }
}
exports.login = async (req,res,next)=>{
    try {

       const{email,password} = req.body;
       if(!email || !password){
        // return res.status(400).json({
        //     success:false,
        //     message:"Email and Password are required"
        // })
         return next(new ErrorResponse(`Email and Password are required`, 400))
       }
        //Check if email exist in database
        const user = await User.findOne({email})
        if(!user){
            // return res.status(400).json({
            //     success:false,
            //     message:"Invalid Credentials"
            // })
            return next(new ErrorResponse(`Invalid Credentials`, 400))
        }
        //Verify Password
        const isMatched = await user.comparePassword(password);
        if(!isMatched){
            // return res.status(400).json({
            //     success:false,
            //     message:"Invalid Credentials"
            // })
          return  next(new ErrorResponse(`Invalid Credentials`, 400))
        }
        

    //  res.status(201).json({
    //         success:true,
    //         token
    //     })

        generateToken(user,201,res);

    } catch (error) {
        console.log(error);
        // return res.status(400).json({
        //     success:false,
        //     message:"Cannot Login check your Credentials"
        // })
        next(new ErrorResponse(`Cannot Login check your Credentials`, 400))
    }

}
const generateToken = (user,statusCode,res)=>{
    const token = user.jwtGenerateToken();
    const options ={
        httpOnly:true,
        expire: new Date(Date.now() + process.env.EXPIRE_TOKEN)
    }
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        token
    })

}

//Logout Controller 

exports.logout = (req,res,next)=>{
    res.clearCookie('token');
    res.status(201).json({
        success:true,
        message: "user logged out successful"
    })

}

//Retrieve single user data by ID

exports.singleuser = async (req,res,next)=>{
      
    try {
        const user = await User.findById(req.params.id);
 
     res.status(201).json({
         success:true,
         user
     })
 
     
    } catch (error) {
     next(new ErrorResponse(`User with id ${req.params.id} is not found`, 404));
    }
 }

 //Error Default landing page 

//  exports.errdefault = async (req,res,next)=>{
//     res.status(404).send('Page not found');

//  }