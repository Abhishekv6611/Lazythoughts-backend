import User_Details from "../model/LazzyModel.js";
import { generateToken } from "../lib/utils.js";
import jwt from 'jsonwebtoken'
import Thoughts from "../model/userImageModel.js";
import cloudinary from "../lib/cloudinary.js";


export const Signup=async(req,res)=> {
    try {
      const {fullName,email,password}=req.body

        console.log(fullName,email,password);
        
      // if user not find
      if(!fullName|| !email || !password){
        return res.status(400).send({success:false,message:"Data Not Found"})
      }
      if(password.length<6){
        return res.status(400).send({success:false,message:"Password should be atleast 6 characters long"})
        
      }
      // If user exist
      const existUser=await User_Details.findOne({EmailAddress:email})
      if(existUser){
        return res.status(409).send({success:false,message:"User Already Exist",UserExist:true})
      }
      // new user 
        const user= new User_Details({
          fullName:fullName,
          EmailAddress:email,
          password:password

        })
        if(user){
         const token= generateToken(user._id,res)
          await user.save()
          return res.status(201).send({
            success:true,
            message:"Successfuly added to DataBase",
            _id:user._id,
            profilePic:user.profilePic,
            fullName:user.fullName,
            email:user.EmailAddress,
            token
          })
        }
      
    } catch (error) {
      console.log(error);
      return res.status(501).send({success:false,message:"Server Error"})
    }
  }

  export const Login=async(req,res)=>{
    try {
        const {email,password}=req.body
         if(!email || !password){
          return res.status(400).send({success:false,message:"Data not found"})
         }
         const existUser=await User_Details.findOne({EmailAddress:email})
         console.log(existUser);
         if(!existUser){
          return res.status(401).send({success:false,message:"Invalid Email"})
         }
        if(existUser){
         const token= generateToken(existUser._id,res)
          return res.status(201).send({
           success:true,
           message:"You got the userAccount",
           fullName:existUser.fullName,
           _id:existUser._id,
           profilePic:existUser.profilePic,
           email:existUser.EmailAddress,
           token
         })
        }

      } catch (error) {
        console.log(error);
        return res.status(501).send({success:false,message:"Internal server error"})  
      }
  }

  // export const GetuserImage=async(req,res)=>{
  //   try {
  //       const data=await User_Image.findOne({userName:req.query.userName})
  //       if(!data){
  //         return res.status(404).send({success:false,message:"Cannot find user image"})
  //       }
  //       return res.status(200).send({success:true,message:"successfully fetched user image",userImage:data.userImage})
  //     } catch (error) {
  //       console.log(error);
        
  //       return res.status(501).send({success:false,message:"Internal server Error"})
  //     }
  // }

  export const ThoughtsUpload=async(req,res)=>{
       const token=req.query.token
       
       const{title,description}=req.body
       
     try {
        if(!token || !title || !description){
          return res.status(404).send({success:false,message:"Token or title or description was required"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const userId=decoded.userId
        const existUser=await User_Details.findById(userId)
        if(!existUser){
          return res.status(404).json({success:false,message:"User is not found"})
        }
          const newThought=new Thoughts({
            userId:existUser._id,
            UserTitle:title,
            UserThoughts:description,
          })
          await newThought.save()
          return res.status(200).send({success:true,message:"Thoughts uploaded successfully"})
       
      } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:"Internal server Error"})
      }

  }

  export const Getthoughts=async(req,res)=>{
    const token=req.query.token
    try {
      if(!token){
        return res.status(404).send({success:false,message:"Token is required"})
      }
      const decoded=jwt.verify(token,process.env.JWT_SECRET)
      const userId=decoded.userId
      const existUser=await User_Details.findById(userId)
      if(!existUser){
        return res.status(404).json({success:false,message:"User is not found"})
        }
      const Thought=await Thoughts.find({ userId: existUser._id });
      return res.status(200).send({
        success:true,
        message:"successfully fetched thoughts",
        Thought
       
      })
    } catch (error) {
      console.log(error);
      return res.status(501).send({success:false,message:"Internal server Error"})
    }
  }

  export const PostDelete = async (req, res) => {
    try {
      const { token } = req.query; 
      const { id } = req.body;       
      // Validate token and id
      if (!token || !id) {
        return res.status(400).send({ success: false, message: "Token and ID are required" });
      }
  
      // Delete the post from the database
      const deletedPost = await Thoughts.findByIdAndDelete(id);
  
      if (!deletedPost) {
        return res.status(404).send({ success: false, message: "Post not found" });
      }
  
      return res.status(200).send({ success: true, message: "Post deleted successfully",});
    } catch (error) {
      console.error("Error deleting post:", error);
      return res.status(500).send({ success: false, message: "Internal server error" });
    }
  };

export const updateProfile=async(req,res)=>{
  try {
    const{userImg}=req.body
    console.log(userImg);
    } catch (error) {
    
  }
}

export const GetuserDetails = async (req, res) => {
  const token = req.query.token; // Ensure token is being passed in the query params
  try {
    if (!token) {
      return res.status(400).json({ success: false, message: "Token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const response = await User_Details.findById(userId); // Ensure this field is correct in your database

    if (!response) {
      return res.status(404).json({ success: false, message: "User not Found" });
    }

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      fullName: response.fullName,
      EmailAddress: response.EmailAddress,
      id:response._id,
      profilePic:response.profilePic
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ success: false, message: "Token has expired" });
    }
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const UpdatePost = async (req, res) => {
  try {
    const { token } = req.query; // Extract token from query parameters
    const { id, UserTitle, UserThoughts } = req.body; // Extract id and updated fields from request body


    // Validate token and id
    if (!token || !id) {
      return res.status(400).send({ success: false, message: "Token and ID are required" });
    }

    // Find the post by ID and update it
    const updatedPost = await Thoughts.findByIdAndUpdate(
      id,
      { UserTitle, UserThoughts }, // Fields to update
      { new: true } // Return the updated document
    );

    if (!updatedPost) {
      return res.status(404).send({ success: false, message: "Post not found" });
    }

    return res.status(200).send({ success: true, message: "Post updated successfully", updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
};


export const UpdateUserName = async (req, res) => {
  const token = req.query 
  const { id, userTitle } = req.body;

  try {
      if (!token || !id) {
          return res.status(400).send({ success: false, message: "Token and ID are required" });
      }

      const updatedUser = await User_Details.findByIdAndUpdate(
        id,
        { fullName: userTitle },
        { new: true } 
    );

      if (!updatedUser) {
          return res.status(404).send({ success: false, message: "User not found" });
      }

      return res.status(200).send({ success: true, message: "User updated successfully", updatedUser });
  } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const GetAllpostDetails = async (req, res) => {
  try {
    const data = await Thoughts.aggregate([
      {
        $lookup: {
          from: "users_details", 
          localField: "userId", 
          foreignField: "_id", 
          as: "userDetails",
        },
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true, // Keep posts even if user data is missing
        },
      },
      {
        $project: {
          _id: 1,
          UserTitle: 1,
          UserThoughts: 1,
          createdAt: 1,
          "userDetails.fullName": 1,
          "userDetails.profilePic": 1,
        },
      },
      { $sort: { createdAt: -1 } }, // Sort posts by latest first
    ]);

    return res.status(200).json({
      success: true,
      message: "Post details fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch post details",
    });
  }
};

export const UpdateProfilePic=async(req,res)=>{
  try {
    const {profilePic,id}=req.body
    if(!profilePic){
      return res.status(404).json({success:false,message:"Profile pic not found"})
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser=await User_Details.findByIdAndUpdate(id,{profilePic:uploadResponse.secure_url},{new:true})
   res.status(200).json(updatedUser)
  } catch (error) {
     console.log(error);
     res.status(500).json({success:false,message:"Failed to update profile"})
     
  }
}