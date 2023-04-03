import React from "react";
import { TodoForm } from "../../components/TodoForm";

import "./NewTodoPage.css";

const NewTodoPage = () => {
  return (
    <section className="container">
      <TodoForm
        label="Escribe un Jutsu nuevo"
        buttonLabel="Añadir"
        submitEvent={() => console.log("llamar a addTodo")}
      />
    </section>
  );
};

export default NewTodoPage;
