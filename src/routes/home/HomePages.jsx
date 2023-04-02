import React from "react";

import useTodos from "../useTodos";
import { Modal } from "../../components/Modal";
import { TodoItem } from "../../components/TodoItem";
import { TodoList } from "../../components/TodoList";
import { TodoForm } from "../../components/TodoForm";
import { TodoSearch } from "../../components/TodoSearch";
import { TodosError } from "../../components/TodosError";
import { TodoHeader } from "../../components/TodoHeader";
import { EmptyTodos } from "../../components/EmptyTodos";
import { TodoCounter } from "../../components/TodoCounter";
import { ChangeAlert } from "../../components/ChangeAlert";
import { TodosLoading } from "../../components/TodoLoading";
import { CreateTodoButton } from "../../components/CreateTodoButton";

function HomePage() {
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
    <>
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
            // onEdit={() => completeTodo(todo.text)}
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
    </>
  );
}

export default HomePage;
