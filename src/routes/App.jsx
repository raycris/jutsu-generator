import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import HomePage from "./home/HomePages";
import NewTodoPage from "./new/NewTodoPage";
import EditTodoPage from "./edit/EditTodoPage";
import NotFound from "../components/NotFound/NotFound";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<NewTodoPage />} />
        <Route path="/edit/:id" element={<EditTodoPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
