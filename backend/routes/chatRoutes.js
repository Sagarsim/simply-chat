const express= require('express');
const router = express.Router();
const {accessChat} = require("../controllers/chatController");
const { protect } = require('../middleware/authMiddleware');

router.post("/", protect, accessChat);

module.exports = router;
