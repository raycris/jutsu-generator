import React, { useState } from "react";

import "./TodoForm.css";
import Uchiha from "../image/Uchiha.jpg";

function TodoForm({ addTodo, setOpenModal }) {
  const [newTodoValue, setNewTodoValue] = useState("");

  const onCancel = () => {
    setOpenModal(false);
  };
  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    addTodo(newTodoValue);
    setOpenModal(false);
  };
  return (
    <form onSubmit={onSubmit} style={{ backgroundImage: `url(${Uchiha})` }}>
      <label>Escribe un Jutsu nuevo</label>
      <textarea
        value={newTodoValue}
        onChange={onChange}
        placeholder="Escribe tu jutsu"
      />
      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button-cancel"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          className="TodoForm-button TodoForm-button-add"
          type="submit"
          // onClick={onAdd}
        >
          Anadir
        </button>
      </div>
    </form>
  );
}

export { TodoForm };
