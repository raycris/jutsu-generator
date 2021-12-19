import React from "react";
import './TodoItem.css'

function TodoItem(props) {

  return (
    <li className="TodoItem">
      <span
        className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
        onClick={props.onComplete}
      >
        <img src="https://img.icons8.com/color/50/000000/uchiha-eyes.png" />
      </span>
      <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>
        {props.text}
      </p>

      <span
        className="Icon Icon-delete"
        onClick={props.onDelete}
      >
        <img src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/000000/external-shuriken-martial-arts-icongeek26-linear-colour-icongeek26.png" />
      </span>
    </li>
  );
}

export { TodoItem }