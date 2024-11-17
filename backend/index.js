import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import friendsRouter from "./routes/friendsRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import postRouter from "./routes/postRoutes.js";
import { app, server } from "./socket/socket.js";
import chatRouter from "./routes/chatRoutes.js";
import clRouter from "./routes/com-likeRoutes.js";

// config part
dotenv.config();
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/user", userRouter);
app.use("/api/friendsApi", friendsRouter);
app.use("/api/post", postRouter);
app.use("/api/chat", chatRouter);
app.use("/api/comlike", clRouter);

//cors
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: {
      "Access-Control-Allow-Origin": "*",
    },
  })
);

// Database and server Connection
mongoose.connect(process.env.URI).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT, () => {
    console.log(`Server is Running on ${process.env.PORT}`);
  });
});
