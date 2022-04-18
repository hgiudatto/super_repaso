import React, { useState, useReducer } from "react";
import Todo from "./Todo";

export const ACTIONS = {
  ADD_TASK: "add_todo",
  TOGGLE_TASK: "toggle-task",
  DELETE_TASK: "delete_task",
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TASK:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.DELETE_TASK:
      return todos.filter((todo) => todo.id !== action.payload.id);
    default:
      return todos;
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false };
}

const TodosApp = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TASK, payload: { name: name } });
    setName("");
  }

  console.log("All the todos: ", todos);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
      })}
    </>
  );
};

export default TodosApp;
