const asyncHandler = require("express-async-handler");
const { Error } = require("mongoose");
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

const fetchChats = asyncHandler(async (req, res) => {
  try{
    Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email"
        })

        res.status(200).send(results);
      })
  } catch(err){
    res.status(400)
    throw new Error(err.message)
  }
})

const createGroupChat = asyncHandler(async (req, res) => {
  if(!req.body.users || !req.body.name){
    res.status(400);
    throw new Error("Please provide all the required fields.")
  }

  const users = JSON.parse(req.body.users);

  if(users.length < 2){
    res.status(400);
    throw new Error("Atleast 2 members are required to create a group");
  }

  try{
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user
    })

    const newGroupChat = await Chat.findOne({_id: groupChat._id})
    .populate("users", "-password")
      .populate("groupAdmin", "-password")

    res.status(200).json(newGroupChat);
  } catch(error){
    res.status(400)
    throw new Error(error.message)
  }
})

const renameGroup = asyncHandler(async (req, res) => {
  const {chatId, chatName} = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(chatId,
    {
      chatName
    },
    {
      new: true
    })
    .populate("users", "-password")
      .populate("groupAdmin", "-password")

    if(!updatedChat){
      res.status(400);
      throw new Error("Chat not found!")
    } else {
      res.json(updatedChat);
    }
})

const addToGroup = asyncHandler(async (req, res) => {
  const {chatId, userId} = req.body;

  const added = await Chat.findByIdAndUpdate(chatId,
    {
      $push:{users: userId}
    },
    {
      new: true
    })
    .populate("users", "-password")
      .populate("groupAdmin", "-password")

    if(!added){
      res.status(400);
      throw new Error("Chat not found!")
    } else {
      res.json(added);
    }
})

const removeFromGroup = asyncHandler(async (req, res) => {
  const {chatId, userId} = req.body;

  const removed = await Chat.findByIdAndUpdate(chatId,
    {
      $pull:{users: userId}
    },
    {
      new: true
    })
    .populate("users", "-password")
      .populate("groupAdmin", "-password")

    if(!removed){
      res.status(400);
      throw new Error("Chat not found!")
    } else {
      res.json(removed);
    }
})
module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup };