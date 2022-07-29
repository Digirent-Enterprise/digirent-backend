require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

let server;

mongoose
  .connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    server = app.listen(process.env.PORT, () => {
      console.log("welcome to digirentall server!");
      console.log("connected to mongoose");
      console.log("server run at port", process.env.PORT);
    });
  });
