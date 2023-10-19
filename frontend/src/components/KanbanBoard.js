import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io();

const KanbanBoard = ({ boardId }) => {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    socket.on("kanbanBoardUpdated", (board) => {
      setColumns(board.columns);
      setTasks(board.tasks);
    });

    socket.emit("joinKanbanBoard", boardId);

    return () => {
      socket.emit("leaveKanbanBoard", boardId);
    };
  }, [boardId]);

  const createTask = (columnId, taskName) => {
    socket.emit("createTask", { columnId, taskName, boardId });
  };

  const editTask = (task) => {
    socket.emit("editTask", task);
  };

  const moveTask = (task, newColumnId) => {
    socket.emit("moveTask", { task, newColumnId, boardId });
  };

  const deleteTask = (task) => {
    socket.emit("deleteTask", task);
  };

  return (
    <div className="kanban-board">
      <h1>Kanban Board</h1>
      <div className="columns">
        {columns.map((column) => (
          <div className="column" key={column.id}>
            <h2>{column.name}</h2>
            <ul>
              {tasks.filter((task) => task.columnId === column.id).map((task) => (
                <li key={task.id}>
                  {task.taskName}
                  <button onClick={() => editTask(task)}>Edit</button>
                  <button onClick={() => deleteTask(task)}>Delete</button>
                </li>
              ))}
              <input
                type="text"
                placeholder="Enter a new task..."
                onChange={(e) => createTask(column.id, e.target.value)}
              />
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
