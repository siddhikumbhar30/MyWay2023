const express = require("express");
const KanbanBoardController = require("../controllers/KanbanBoardController");

const router = express.Router();

router.get("/", KanbanBoardController.getAllKanbanBoards);
router.get("/:id", KanbanBoardController.getKanbanBoardById);
router.post("/", KanbanBoardController.createKanbanBoard);
router.put("/:id", KanbanBoardController.updateKanbanBoard);
router.delete("/:id", KanbanBoardController.deleteKanbanBoard);

module.exports = router;
