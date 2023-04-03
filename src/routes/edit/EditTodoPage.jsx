import React from "react";
import { useParams } from "react-router-dom";

import { TodoForm } from "../../components/TodoForm";

import useTodos from "../useTodos";

import "./EditTodoPage.css";

const EditTodoPage = () => {
  const { updateState } = useTodos();
  const { editTodo } = updateState;
  const params = useParams();
  const id = Number(params.id);

  return (
    <section className="container">
      <TodoForm
        label="Edita un Jutsu"
        buttonLabel="Editar"
        submitEvent={(newText) => editTodo(id, newText)}
      />
    </section>
  );
};

export default EditTodoPage;
