import React from "react";
import { useTodos } from "./useTodos";

import { Modal } from "../Modal";
import { TodoItem } from "../TodoItem";
import { TodoList } from "../TodoList";
import { TodoForm } from "../TodoForm";
import { TodoSearch } from "../TodoSearch";
import { TodosError } from "../TodosError";
import { TodoHeader } from "../TodoHeader";
import { EmptyTodos } from "../EmptyTodos";
import { TodoCounter } from "../TodoCounter";
import { TodosLoading } from "../TodoLoading";
import { CreateTodoButton } from "../CreateTodoButton";

function App() {
  const {
    error,
    loading,
    openModal,
    totalTodos,
    deleteTodo,
    searchValue,
    setOpenModal,
    completeTodo,
    searchedTodos,
    completedTodos,
    setSearchValue,
    addTodo,
  } = useTodos();

  return (
    <React.Fragment>
      <TodoHeader>
        <TodoCounter totalTodos={totalTodos} completedTodos={completedTodos} />
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      </TodoHeader>

      <TodoList>
        {error && <TodosError error={error} />}
        {loading && <TodosLoading />}
        {!loading && !searchedTodos.length && <EmptyTodos />}

        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      {openModal && (
        <Modal>
          <TodoForm addTodo={addTodo} setOpenModal={setOpenModal} />
        </Modal>
      )}

      <CreateTodoButton setOpenModal={setOpenModal} />
    </React.Fragment>
  );
}

export default App;
