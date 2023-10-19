const ChatRoom = require("../models/ChatRoom");

class ChatRoomController {
  constructor(socket) {
    this.socket = socket;

    this.socket.on("joinRoom", (roomId) => {
      this.socket.join(roomId);
    });

    this.socket.on("sendMessage", ({ message, roomId }) => {
      this.socket.to(roomId).emit("message", message);
    });

    this.socket.on("leaveRoom", (roomId) => {
      this.socket.leave(roomId);
    });
  }
}

module.exports = ChatRoomController;
