import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import useTodos from "../useTodos";

import { TodoItem } from "../../components/TodoItem";
import { TodoList } from "../../components/TodoList";
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
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const {
    error,
    loading,
    totalTodos,
    searchValue,
    searchedTodos,
    completedTodos,
  } = states;

  const { deleteTodo, completeTodo, setSearchValue, sincronizeTodos } =
    updateState;

  return (
    <>
      <TodoHeader loading={loading}>
        <TodoCounter totalTodos={totalTodos} completedTodos={completedTodos} />
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          params={params}
          setParams={setParams}
        />
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
          // en el onEdit estamos mandando información hacia esa ruta con el state
          <TodoItem
            key={todo.id}
            text={todo.text}
            completed={todo.completed}
            onEdit={() => {
              navigate(`/edit/${todo.id}`, { state: { todo } });
            }}
            onComplete={() => completeTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        )}
      </TodoList>

      <CreateTodoButton onClick={() => navigate("/new")} />
      <ChangeAlert sincronize={sincronizeTodos} />
    </>
  );
}

export default HomePage;
