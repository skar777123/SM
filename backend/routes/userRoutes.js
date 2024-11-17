import {
  loginUser,
  registerUser,
  logoutUser,
  forgotPassword,
  getUsersForSidebar,
  getUserDetails,
  getUserId,
  addedFriends,
 // getFriendsPosts,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/userAuth.js";
import express from "express";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.get("/getuser", verifyToken, getUsersForSidebar);
userRouter.get("/currentUser", verifyToken, getUserDetails);
userRouter.get("/currentUserId", verifyToken, getUserId);
userRouter.get("/addedFriends", verifyToken, addedFriends);
//userRouter.get("/getFriendsPosts", verifyToken, getFriendsPosts);


export default userRouter;
