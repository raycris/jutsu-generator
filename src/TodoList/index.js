import React from "react";
import "./TodoList.css";

function TodoList(props) {
  const rederFunction = props.children || props.render;
  return (
    <section className="TodoList-container">
      {props.error && props.onError()}
      {props.loading && props.onLoading()}

      {!props.loading && !props.totalTodos && props.onEmptyTodos()}

      {props.totalTodos &&
        !props.searchedTodos.length &&
        props.onEmptySearchResults(props.searchTextValue)}

      {props.searchedTodos.map(rederFunction)}

      <ul>{props.children}</ul>
    </section>
  );
}

export { TodoList };
