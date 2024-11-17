import { getMessages, sendMessage } from "../controllers/chatController.js";
import { verifyToken } from "../middleware/userAuth.js";
import express from "express";
const chatRouter = express.Router();

chatRouter.post("/send-message", verifyToken, sendMessage);
chatRouter.post("/get-message", verifyToken, getMessages);

export default chatRouter;
