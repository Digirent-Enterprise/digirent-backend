const {Chat} = require("../models");
const createChatRoom = async (data) => {
    let chatRoom = await findExistingRoom(data.from);
    if (!chatRoom) {
        chatRoom = (await new Chat(data).save()).populate('from').populate('to');
    }
    return chatRoom
}

const sendMessage = async (data) => {
    const chatRoom = await Chat.findOneAndUpdate({from: data.from}, {$push: { messages:  data}});
    if (!chatRoom) return false;
    return chatRoom.messages;
}

const findExistingRoom = async (from) => {
    const chatRoom = await Chat.findOne({from}).populate('from', '-password -token')
        .populate('to', '-password -token')
    if (chatRoom){
        return chatRoom
    }
    return false;
}

const getChatUsers = async () => {
    const users = await Chat.find({to: '6308e6902e4e5d313cb11215'}).populate('from');
    if (!users) return false;
    return users;
}


module.exports = {
    createChatRoom,
    sendMessage,
    getChatUsers
}