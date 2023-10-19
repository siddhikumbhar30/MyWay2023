const express = require("express");
const ChatRoomController = require("../controllers/ChatRoomController");

const router = express.Router();

router.get("/", ChatRoomController.getAllChatRooms);
router.get("/:id", ChatRoomController.getChatRoomById);
router.post("/", ChatRoomController.createChatRoom);
router.put("/:id", ChatRoomController.updateChatRoom);
router.delete("/:id", ChatRoomController.deleteChatRoom);

module.exports = router;
