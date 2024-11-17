import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your Username"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Password should be more than 6 characters "],
    },
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existing_id.png",
    },
    bio: {
      type: String,
    },
    post: {
      type: Array,
      default: [],
    },
    friends: {
      type: Array,
      default: [],
    },
    message: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
