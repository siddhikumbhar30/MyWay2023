const mongoose = require("mongoose");

const KanbanBoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  columns: [
    {
      name: {
        type: String,
        required: true,
      },
      tasks: [
        {
          taskName: {
            type: String,
            required: true,
          },
          status: {
            type: String,
            enum: ["TODO", "IN_PROGRESS", "DONE"],
            default: "TODO",
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],
});

KanbanBoardSchema.methods.addTask = function (task) {
  this.columns[0].tasks.push(task);
};

KanbanBoardSchema.methods.updateTask = function (task) {
  const taskIndex = this.columns.findIndex(column => column.id === task.columnId);
  const taskToUpdate = this.columns[taskIndex].tasks.find(taskInColumn => taskInColumn.id === task.id);

  Object.assign(taskToUpdate, task);
};

KanbanBoardSchema.methods.moveTask = function (task, newColumnId) {
  const taskIndex = this.columns.findIndex(column => column.id === task.columnId);
  const taskToMove = this.columns[taskIndex].tasks.find(taskInColumn => taskInColumn.id === task.id);

  this.columns[taskIndex].tasks.splice(taskIndex, 1);

  const newColumnIndex = this.columns.findIndex(column => column.id === newColumnId);
  this.columns[newColumnIndex].tasks.push(taskToMove);
};

KanbanBoardSchema.methods.deleteTask = function (task) {
  const taskIndex = this.columns.findIndex(column => column.id === task.columnId);
  this.columns[taskIndex].tasks.splice(taskIndex, 1);
};

const KanbanBoard = mongoose.model("KanbanBoard", KanbanBoardSchema);

module.exports = KanbanBoard;
