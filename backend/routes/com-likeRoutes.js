import {
  AddComment,
  Addlikes,
  getComments,
  getLikes,
} from "../controllers/com-likeController.js";
import { verifyToken } from "../middleware/userAuth.js";
import express from "express";
const clRouter = express.Router();

clRouter.post("/comment", verifyToken, AddComment);
clRouter.post("/likes", verifyToken, Addlikes);
clRouter.post("/getComments", verifyToken, getComments);
clRouter.post("/getlikes", verifyToken, getLikes);

export default clRouter;
