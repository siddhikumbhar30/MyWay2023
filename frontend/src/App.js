import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chatRooms">
          <ChatRoom />
        </Route>
        <Route path="/kanbanBoards/:boardId">
          <KanbanBoard />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
