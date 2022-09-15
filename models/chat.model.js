const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        messages: [{
            from: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            to: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            content: {
              type: String
            },
            at: {
                type: String,
                default: Date.now
            },
        }]
    }
)

const Chat = mongoose.model("Chat", ChatSchema, 'chats')
module.exports = Chat;
