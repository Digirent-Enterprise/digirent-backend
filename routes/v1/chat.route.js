const express = require("express");
const { accessChat, fetchChats } = require("../../controllers/chat.controller");
const { authenticateToken } = require("../../middlewares/auth");

const router = express.Router()

router.route("/").post(authenticateToken, accessChat);
router.route("/").get(authenticateToken, fetchChats);

module.exports = router;