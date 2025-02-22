import express from "express";
import {
  Getthoughts,
  Login,
  PostDelete,
  Signup,
  ThoughtsUpload,
  GetuserDetails,
  UpdatePost,
  GetAllpostDetails,
  UpdateUserName,
  UpdateProfilePic,
} from "../controllers/LazzyControllers.js";
import CheckPostLimit from "../middleware/checkPostLimit .js";

const router = express.Router();



router.post("/signup", Signup);
router.post("/login", Login);
router.post("/uploadThoughts",CheckPostLimit,ThoughtsUpload);
router.get("/getuserDetails", GetuserDetails);

router.get("/getthoughts", Getthoughts);
router.delete("/postdelete", PostDelete);
router.put("/updatePost", UpdatePost);
router.get("/getAllpostDetails", GetAllpostDetails);
router.put("/updateusername", UpdateUserName);
router.put("/updateprofile", UpdateProfilePic);

export default router;
