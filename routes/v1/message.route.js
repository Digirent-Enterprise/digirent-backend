const express = require("express");
const { sendMessage, allMessages } = require("../../controllers/message.controller")
const { authenticateToken } = require("../../middlewares/auth");

const router = express.Router()

router.route("/").post(authenticateToken, sendMessage);
router.route("/:chatID").get(authenticateToken, allMessages);

module.exports = router;