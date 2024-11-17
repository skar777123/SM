import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, email, password, profilePic, bio } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      email,
      password: passwordHash,
      profilePic,
      bio,
    });
    res.header(
          "Access-Control-Allow-Origin",
          "https://sma-backend-z8o1.onrender.com"
        ).status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({
        message: "Provide email and password to Login",
      });
    }
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET);
    return res.header(
          "Access-Control-Allow-Origin",
          "https://sma-backend-z8o1.onrender.com"
        )
      .status(201)
      .cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: "development",
      })
      .json({
        token,
        message: `Welcome back ${user.username}`,
        user,
        success: true,
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const logoutUser = (req, res) => {
  return res.header(
          "Access-Control-Allow-Origin",
          "https://sma-backend-z8o1.onrender.com"
        ).cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
    message: "user logged out successfully.",
    success: true,
  });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Wrong Old Password" });
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);
    const updatePasword = await User.updateOne({
      password: passwordHash,
    });
    if (updatePasword) {
      res.header(
          "Access-Control-Allow-Origin",
          "https://sma-backend-z8o1.onrender.com"
        ).status(200).json({
        message: "Password is Changed",
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.header(
          "Access-Control-Allow-Origin",
          "https://sma-backend-z8o1.onrender.com"
        ).status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    const currentUser = await User.findOne({ _id: userId });
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.header(
          "Access-Control-Allow-Origin",
          "https://sma-backend-z8o1.onrender.com"
        ).status(200).json(currentUser);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const getUserId = async (req, res) => {
  try {
    const userId = req.user._id;
    const currentUser = await User.findOne({ _id: userId });
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.header(
          "Access-Control-Allow-Origin",
          "https://sma-backend-z8o1.onrender.com"
        ).status(200).json(currentUser._id);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const addedFriends = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const friends = await User.find({
      _id: { $in: user.friends },
    });
    res.header(
          "Access-Control-Allow-Origin",
          "https://sma-backend-z8o1.onrender.com"
        ).status(200).json({
      friends,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

/*
export const getFriendsPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const friends = await User.find({
      _id: { $in: user.friends },
    });
    const friendsPosts = await Promise.all(
      friends.map(async (friend) => {
        const posts = await Post.find({ userId: friend._id });
        return posts;
      })
    );
    res.status(200).json({
      posts: friendsPosts.flat(),
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
*/
