import React from "react";
import { TodoForm } from "../../components/TodoForm";

import "./NewTodoPage.css";
import useTodos from "../useTodos";

const NewTodoPage = () => {
  const { updateState } = useTodos();
  const { addTodo } = updateState;

  return (
    <section className="container">
      <TodoForm
        label="Escribe un Jutsu nuevo"
        buttonLabel="Añadir"
        submitEvent={(text) => addTodo(text)}
      />
    </section>
  );
};

export default NewTodoPage;
