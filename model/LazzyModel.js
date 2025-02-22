import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
   // Add this if fullName is mandatory
  },
  EmailAddress: {
    type: String,
   
    unique:true, 
  },
  password: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  profilePic:{
    type:String,
    default:"",
  },
    premium:{
    type:Boolean,
    default:false,
    },
    postCount:{
      type:Number,
      default:0,
    },
    token:{
      type:String,
      default:"",
  },   
});

const User_Details = mongoose.model("users_details", UserSchema); 
export default User_Details;

