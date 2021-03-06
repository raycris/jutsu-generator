import React from "react";

import { Modal } from "../Modal";
import { useTodos } from "./useTodos";
import { TodoItem } from "../TodoItem";
import { TodoList } from "../TodoList";
import { TodoForm } from "../TodoForm";
import { TodoSearch } from "../TodoSearch";
import { TodosError } from "../TodosError";
import { TodoHeader } from "../TodoHeader";
import { EmptyTodos } from "../EmptyTodos";
import { TodoCounter } from "../TodoCounter";
import { ChangeAlert } from "../ChangeAlert";
import { TodosLoading } from "../TodoLoading";
import { CreateTodoButton } from "../CreateTodoButton";

function App() {
  const { states, updateState } = useTodos();

  const {
    error,
    loading,
    openModal,
    totalTodos,
    searchValue,
    searchedTodos,
    completedTodos,
  } = states;

  const {
    addTodo,
    deleteTodo,
    setOpenModal,
    completeTodo,
    setSearchValue,
    sincronizeTodos,
  } = updateState;
  
  return (
    <React.Fragment>
      <TodoHeader loading={loading}>
        <TodoCounter totalTodos={totalTodos} completedTodos={completedTodos} />
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      </TodoHeader>

      <TodoList
        error={error}
        loading={loading}
        totalTodos={totalTodos}
        searchedTodos={searchedTodos}
        searchTextValue={searchValue}
        onError={() => <TodosError />}
        onLoading={() => <TodosLoading />}
        onEmptyTodos={() => <EmptyTodos />}
        onEmptySearchResults={(searchText) => (
          <p>No hay resultado para {searchText}</p>
        )}
      >
        {(todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        )}
      </TodoList>

      {openModal && (
        <Modal>
          <TodoForm addTodo={addTodo} setOpenModal={setOpenModal} />
        </Modal>
      )}

      <CreateTodoButton setOpenModal={setOpenModal} />
      <ChangeAlert sincronize={sincronizeTodos} />
    </React.Fragment>
  );
}

export default App;
