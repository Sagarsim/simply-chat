const express= require('express');
const router = express.Router();
const { registerUser, authUser, searchUser } = require("../controllers/userController");
const { protect } = require('../middleware/authMiddleware');

router.post("/", registerUser);
router.get("/", protect, searchUser);
router.post("/login", authUser);

module.exports = router;

