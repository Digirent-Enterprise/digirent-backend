require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");
const { sendEmail } = require("./services/email.service");
const { Server } = require('socket.io');
const {ChatService} = require("./services"); // Add this

let server;

mongoose.connect(process.env.MONGODB_URL).then(() => {
  server = app.listen(process.env.PORT || 8000, async () => {
    console.log("welcome to digirentall server!");
    console.log("connected to mongoose");
    console.log("server run at port", process.env.PORT);
  });
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on("connection", (socket) => {
    socket.on("create-chat-room", async (data)=> {
        if (!data.from || !data.to ) return;
        const newRoom = await ChatService.createChatRoom(data);
        if (!newRoom) socket.emit('error-create-room')
        socket.emit('create-room-success', newRoom);
    })

   socket.on("send-message", async (data) => {
       const send = await ChatService.sendMessage(data);
       const users = await ChatService.getChatUsers();
       if (!send) socket.emit('error-send-message');
       socket.emit('send-success', send);
       socket.emit('change-chat-log', users)
   })
   socket.on("get-chat-users", async () => {
       const users = await ChatService.getChatUsers();
       if (!users) socket.emit('error-get-chat-users');
       socket.emit('get-chat-users-success', users);
   })
  });

});
