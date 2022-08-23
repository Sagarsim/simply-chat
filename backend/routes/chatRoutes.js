const express= require('express');
const router = express.Router();
const {accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup} = require("../controllers/chatController");
const { protect } = require('../middleware/authMiddleware');

router.post("/", protect, accessChat);
router.get("/", protect, fetchChats);
router.post("/group", protect, createGroupChat);
router.put("/rename", protect, renameGroup);
router.put("/groupadd", protect, addToGroup);
router.put("/groupremove", protect, removeFromGroup);

module.exports = router;
