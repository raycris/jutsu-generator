import React from 'react'

import { TodoForm } from '../../components/TodoForm'

import "./EditTodoPage.css";

const EditTodoPage = () => {
  return (
    <section className="container">
      <TodoForm
        label="Edita un Jutsu"
        buttonLabel="Guardar"
        submitEvent={() => console.log("llamar a editTodo")}
      />
    </section>
  )
}

export default EditTodoPage