const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const { isAuthenticated } = require("../middleware/authMiddleware");


router.get("/new-message", isAuthenticated, messageController.newMessageGet);
router.post("/new-message", isAuthenticated, messageController.newMessagePost);

module.exports = router;
