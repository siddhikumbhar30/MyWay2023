const mongoose = require("mongoose");

const ChatRoomSchema = new mongoose.Schema({
  name: String,
  messages: [
    {
      message: String,
      senderId: String,
      createdAt: Date,
    },
  ],
});

const ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema);

module.exports = ChatRoom;
