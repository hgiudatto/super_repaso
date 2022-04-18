import React, { useState, useReducer } from "react";

const ACTIONS = {
  ADD_TASK: "add_todo",
};

function reducer(todos, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [...todos, newTodo(action.payload.name)];
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
    </>
  );
};

export default TodosApp;
