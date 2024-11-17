import Chat from "../models/chatModel.js";
import Conv from "../models/convModel.js";
import User from "../models/userModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.body;
    const senderId = req.user._id;

    let conversation = await Conv.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conv.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Chat({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await User.findByIdAndUpdate(
      { _id: senderId },
      {
        $push: {
          type: Array,
          message: conversation._id,
        },
      },
      { new: true }
    );
    await User.findByIdAndUpdate(
      { _id: receiverId },
      {
        $push: {
          type: Array,
          message: conversation._id,
        },
      },
      { new: true }
    );
    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO FUNCTIONALITY WILL GO HERE
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res
        .header(
          "Access-Control-Allow-Origin",
          "https://sma-backend-z8o1.onrender.com"
        ).status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const userToChatId = req.body.id;
    const senderId = req.user._id;

    const conversation = await Conv.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(500).json([]);

    res.header(
          "Access-Control-Allow-Origin",
          "https://sma-backend-z8o1.onrender.com"
        ).status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
