import { addRemoveFriend,  getOtherUsers } from "../controllers/friendsController.js";
import {verifyToken} from "../middleware/userAuth.js";
import express from "express";
const friendsRouter = express.Router();

friendsRouter.post("/addFriends", verifyToken, addRemoveFriend);
friendsRouter.post('/getFriends', verifyToken, getOtherUsers)
/*friendsRouter.post('/add-friend/:id',verifyToken,followUser)*/

export default friendsRouter;
