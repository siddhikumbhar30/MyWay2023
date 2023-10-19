const express = require("express");
const socketIO = require("socket.io");
const ChatRoomController = require("./controllers/ChatRoomController");
const KanbanBoardController = require("./controllers/KanbanBoardController");
// const config = require("./config");
const mongoose = require("mongoose");

const app = express();
const server = app.listen(8000,()=>{
  console.log("3000");
});

const io = socketIO(server);

io.on("connection", (socket) => {
  new ChatRoomController(socket);
  new KanbanBoardController(socket);
});

mongoose.connect("mongodb+srv://booknook:Vishal1111@cluster0.xnxlmeg.mongodb.net/booknook?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/", (req, res) => {
  res.send("Hello World!");
});
