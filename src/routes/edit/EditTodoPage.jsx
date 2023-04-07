import React from "react";
import { useParams, useLocation } from "react-router-dom";

import { TodoForm } from "../../components/TodoForm";

import useTodos from "../useTodos";

import "./EditTodoPage.css";

const EditTodoPage = () => {
  const { states, updateState } = useTodos();
  const { loading, getTodo } = states;
  const { editTodo } = updateState;
  const params = useParams();
  const id = Number(params.id);
  const location = useLocation();

  let todotext;

  /* Con el useLocation estamos recibiendo informacion desde la ruta anterior
  la cual llama este metodo
  */

  if (location.state?.todo) {
    todotext = location.state.todo.text;
  } else if (loading) {
    return <p>Cargando...</p>;
  } else {
    const todo = getTodo(id);
    todotext = todo.text;
  }

  return (
    <section className="container">
      <TodoForm
        label="Edita un Jutsu"
        defaultJutsuText={todotext}
        buttonLabel="Editar"
        submitEvent={(newText) => editTodo(id, newText)}
      />
    </section>
  );
};

export default EditTodoPage;
