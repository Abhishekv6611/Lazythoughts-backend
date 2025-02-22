import mongoose from "mongoose";

const ThoughtsSchema=new mongoose.Schema({  
   userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User_Details", // Reference to User_Details collection
   
   },  
     UserTitle: {
    type: String,
   
  },
  UserThoughts: {
    type: String,
    
  },
  

    },

    {timestamps:true},
)
const Thoughts=mongoose.model('Thoughts',ThoughtsSchema);
export default Thoughts