import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

function useTodos() {
  const {
    error,
    loading,
    item: todos,
    saveItem: saveTodos,
    sincronizeItem: sincronizeTodos,
  } = useLocalStorage("Todos_v1", []);

  const [openModal, setOpenModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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

  const states = {
    error,
    loading,
    openModal,
    totalTodos,
    searchValue,
    searchedTodos,
    completedTodos,
  };

  const updateState = {
    addTodo,
    deleteTodo,
    setOpenModal,
    completeTodo,
    setSearchValue,
    sincronizeTodos,
  };

  return { states, updateState };
}

export default useTodos;
