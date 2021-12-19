import React from "react";
import { Modal } from "../Modal";
import { TodoItem } from "../TodoItem";
import { TodoList } from "../TodoList";
import { TodoForm } from "../TodoForm";
import { TodosError } from "../TodosError"
import { TodoSearch } from "../TodoSearch";
import { EmptyTodos } from "../EmptyTodos"
import { TodoCounter } from '../TodoCounter'
import { TodoContext } from "../TodoContext";
import {TodosLoading} from "../TodoLoading"
import { CreateTodoButton } from "../CreateTodoButton";


function AppUI() {

  const {
    error,
    loading,
    openModal,
    deleteTodo,
    completeTodo,
    SetOpenModal,
    searchedTodos,
  } = React.useContext(TodoContext)

  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />

      <TodoList>
        {error &&<TodosError error={error}/>}
        {loading && <TodosLoading/>}
        {(!loading && !searchedTodos.length) && <EmptyTodos/>}


        {searchedTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>


      {!!openModal && (
        <Modal>
          <TodoForm/>
        </Modal>

      )}

      <CreateTodoButton 
        SetOpenModal={SetOpenModal}
      />

    </React.Fragment>
  )
}

export { AppUI }