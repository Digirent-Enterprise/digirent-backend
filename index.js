require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");
const { sendEmail } = require("./services/email.service");

// let server;
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

mongoose.connect(process.env.MONGODB_URL).then(() => {
  server.listen(process.env.PORT || 8000, async () => {
    console.log("welcome to digirentall server!");
    console.log("connected to mongoose");
    console.log("server run at port", process.env.PORT);
  });
});
