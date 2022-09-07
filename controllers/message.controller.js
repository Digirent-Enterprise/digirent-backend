const asyncHandler = require("express-async-handler");
const Message = require("../models/message.model")
const User = require("../models/user.model")
const Chat = require("../models/chat.model")

const allMessages = asyncHandler(async (req, res) => {
    try {
      const messages = await Message.find({ chat: req.params.chatID })
        .populate("chat");
      res.json(messages);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
});

const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatID } = req.body;
  
    if (!content || !chatID) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
  
    var newMessage = {
      sender: req.user.user_id,
      content: content,
      chat: chatID,
    };
  
    try {
      var message = await Message.create(newMessage);
  
      message = await message.populate("sender", "name email").execPopulate();
      message = await message.populate("chat").execPopulate();
      message = await User.populate(message, {
        path: "chat.users",
        select: "name email",
      });
  
      await Chat.findByIdAndUpdate(req.body.chatID, { latestMessage: message });
  
      res.json(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
});

module.exports = { sendMessage, allMessages }