import React, { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";


const TodoContext = React.createContext();
function TodoProvider(props) {
  const {
    error,
    loading,
    item: todos,
    saveItem: saveTodos,
  } = useLocalStorage("Todos_v1", []);
  const [searchValue, setSearchValue] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  // Metodo para hacer search de los todos
  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  // Funcion para anadir los todos completados
  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text,
    });
    saveTodos(newTodos);
  };
  // Funcion para marcar los todos completados
  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  // Funcion para marcar los todos eliminados
  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        error,
        addTodo,
        loading,
        openModal,
        totalTodos,
        deleteTodo,
        searchValue,
        setOpenModal,
        completeTodo,
        searchedTodos,
        setSearchValue,
        completedTodos,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
