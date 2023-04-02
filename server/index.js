const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const socket = require("socket.io");
const cors = require("cors");

const userRoute = require("./routes/UserRoute");
const postRoute = require("./routes/PostRoute");
const followerRoute = require("./routes/FollowerRoute");
const messageRoute = require("./routes/MessageRoute");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(`Some Problem Occured: ${err}`);
  });

app.use(cors());
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", postRoute);
app.use("/api", followerRoute);
app.use("/api", messageRoute);

PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatsocket = socket;
  socket.on("addUser", (id) => {
    onlineUsers.set(id, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});
