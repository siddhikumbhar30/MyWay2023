import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io();

const ChatRoom = ({ roomId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.emit("joinRoom", roomId);

    return () => {
      socket.emit("leaveRoom", roomId);
    };
  }, [roomId]);

  const sendMessage = (message) => {
    socket.emit("sendMessage", { message, roomId });
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.message}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Enter a message..."
        onChange={(e) => sendMessage(e.target.value)}
      />
    </div>
  );
};

export default ChatRoom;
