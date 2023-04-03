import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

function useTodos() {
  const {
    error,
    loading,
    item: todos,
    saveItem: saveTodos,
    sincronizeItem: sincronizeTodos,
  } = useLocalStorage("Todos_v2", []);

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
    const id = newTodoId(todos);
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text,
      id,
    });
    saveTodos(newTodos);
  };
  // Funcion para marcar los jutsus completados
  const completeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  // Funcion para editat los jutsus completados
  const editTodo = (id, newText) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos[todoIndex].text = newText;
    saveTodos(newTodos);
  };

  // Funcion para marcar los todos eliminados
  const deleteTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const newTodoId = (todoList) => {
    if (!todoList.length) {
      return 1;
    }
    const idList = todoList.map((todo) => todo.id);
    const idMax = Math.max(...idList);
    return idMax + 1;
  };

  const states = {
    error,
    loading,
    totalTodos,
    searchValue,
    searchedTodos,
    completedTodos,
  };

  const updateState = {
    addTodo,
    deleteTodo,
    editTodo,
    completeTodo,
    setSearchValue,
    sincronizeTodos,
  };

  return { states, updateState };
}

export default useTodos;
