const KanbanBoard = require("../models/KanbanBoard");

class KanbanBoardController {
  constructor(socket) {
    this.socket = socket;

    this.socket.on("joinKanbanBoard", (boardId) => {
      this.socket.join(boardId);

      const board = KanbanBoard.findById(boardId);
      this.socket.emit("kanbanBoardUpdated", board);
    });

    this.socket.on("createTask", ({ columnId, taskName, boardId }) => {
      const task = new KanbanBoard.Task({
        columnId,
        taskName,
      });

      KanbanBoard.findById(boardId).addTask(task);

      this.socket.to(boardId).emit("kanbanBoardUpdated", KanbanBoard.findById(boardId));
    });

    this.socket.on("editTask", (task) => {
      KanbanBoard.findById(task.boardId).updateTask(task);

      this.socket.to(task.boardId).emit("kanbanBoardUpdated", KanbanBoard.findById(task.boardId));
    });

    this.socket.on("moveTask", ({ task, newColumnId, boardId }) => {
      KanbanBoard.findById(boardId).moveTask(task, newColumnId);

      this.socket.to(boardId).emit("kanbanBoardUpdated", KanbanBoard.findById(boardId));
    });

    this.socket.on("deleteTask", (task) => {
      KanbanBoard.findById(task.boardId).deleteTask(task);

      this.socket.to(task.boardId).emit("kanbanBoardUpdated", KanbanBoard.findById(task.boardId));
    });
  }
}

module.exports = KanbanBoardController;
