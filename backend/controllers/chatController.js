const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

//Access one-to-one chat
const accessChat = asyncHandler(async (req, res) => {
  const {userId} = req.body;

  if(!userId){
    res.status(400);
    throw new Error("User ID not provided in request.")
  }

  let chatFound = await Chat.find({
    $and: [
      {users: {$elemMatch: {$eq: req.user._id}}},
      {users: {$elemMatch: {$eq: userId}}}
    ]
  }).populate("users", "-password")
  .populate("latestMessage");

  chatFound = await User.populate(chatFound, {
    path: "latestMessage.sender",
    select: "name pic email"
  })

  if(chatFound.length > 0){
    res.send(chatFound[0]);
  } else {
    try{

      const newChat = await Chat.create({
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId]
      })

      const getNewChat = await Chat.find({_id: newChat._id}).populate("users", "-password");

      res.status(200).send(getNewChat);
    } catch(err){

      res.status(400)
      throw new Error(err.message)
    }
  }
});

module.exports = { accessChat };