const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const Chat = require("../models/chat.model")

const accessChat = asyncHandler(async (req, res) => {
    const { userID } = req.body;
    if (!userID) {
        console.log("UserID param not sent with request")
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        $and: [
            {users: {$elemMatch: {$eq: req.user.user_id}}},
            {users: {$elemMatch: {$eq: userID}}}
        ]
    }).populate("users", "-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name email",
    })

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            users: [req.user.user_id, userID],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "-password")

            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message)
        }
    }
})

const fetchChats = asyncHandler(async (req, res) => {
    try {
        Chat.find({users: {$elemMatch: {$eq: req.user.user_id}}}).populate("users", "-password").populate("Admin", "-password").populate("latestMessage")
        .sort({updatedat: -1})
        .then(async (results) => {
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "name email"
            })

            res.status(200).send(results)
        })
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
})

module.exports = { accessChat, fetchChats }