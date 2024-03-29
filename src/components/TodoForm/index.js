import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Uchiha from "../../assets/image/Uchiha.jpg";

import "./TodoForm.css";

function TodoForm(props) {
  const [newTodoValue, setNewTodoValue] = useState(props.defaultJutsuText || "");
  const navigate = useNavigate()

  const onCancel = () => {
    navigate("/")
  };


  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };


  const onSubmit = (event) => {
    event.preventDefault();
    props.submitEvent(newTodoValue);
    navigate("/")
  };


  return (
    <form onSubmit={onSubmit} style={{ backgroundImage: `url(${Uchiha})` }}>
      <label>{props.label}</label>
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
          onClick={onSubmit}
        >
          {props.buttonLabel}
        </button>
      </div>
    </form>
  );
}

export { TodoForm };
