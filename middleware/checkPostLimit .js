import jwt from 'jsonwebtoken'
import User_Details from '../model/LazzyModel.js'

const CheckPostLimit =async(req,res,next)=>{
    const token=req.query.token
    // console.log(token);
    
    // console.log("inside middleware");
    
    if(token){
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const userId=decoded.userId
        const User=await User_Details.findById(userId)
        if(!User.premium && User.postCount>=3){
            res.status(401).json({message:"You have reached the post limit"})
        }else{
            next()
        }
    }else{
        res.status(401).json({message:"Unauthorized"})
    }
}

export default CheckPostLimit