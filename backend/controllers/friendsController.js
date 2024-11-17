import User from "../models/userModel.js";

export const addRemoveFriend = async (req, res) => {
  try {
    const { friendId } = req.body;
    const id = req.user._id
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.header(
          "Access-Control-Allow-Origin",
          "https://sma-backend-z8o1.onrender.com"
        ).status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getOtherUsers = async (req,res) =>{ 
  try {
       const {id} = req.body;
       const otherUsers = await User.find({_id:{$ne:id}}).select("-password");
       if(!otherUsers){
          return res.status(401).json({
              message:"Currently do not have any users."
          })
       };
       return res.header(
          "Access-Control-Allow-Origin",
          "https://sma-backend-z8o1.onrender.com"
        ).status(200).json({
          otherUsers
      })
  } catch (error) {
      res.status(400).json({
        success:false,
        message: error.message,
      })
  }
}




/*
export const followUser = async(req,res)=>{
  try {
      const loggedInUserId = req.body.id; 
      const userId = req.params.id; 
      const loggedInUser = await User.findById(loggedInUserId);
      const user = await User.findById(userId);
      if(!user.followers.includes(loggedInUserId)){
          await user.updateOne({$push:{friends:loggedInUserId}});
          await loggedInUser.updateOne({$push:{friends:userId}});
      }else{
          return res.status(400).json({
              message:`User already followed to ${user.name}`
          })
      };
      return res.status(200).json({
          message:`${loggedInUser.username} just follow to ${user.username}`,
          success:true
      })
  } catch (error) {
      console.log(error);
  }
}
export const unfollowUser = async (req,res) => {
  try {
      const loggedInUserId = req.body.id; 
      const userId = req.params.id; 
      const loggedInUser = await User.findById(loggedInUserId);//patel
      const user = await User.findById(userId);//keshav
      if(loggedInUser.following.includes(userId)){
          await user.updateOne({$pull:{followers:loggedInUserId}});
          await loggedInUser.updateOne({$pull:{following:userId}});
      }else{
          return res.status(400).json({
              message:`User has not followed yet`
          })
      };
      return res.status(200).json({
          message:`${loggedInUser.name} unfollow to ${user.name}`,
          success:true
      })
  } catch (error) {
      console.log(error);
  }
}
*/
