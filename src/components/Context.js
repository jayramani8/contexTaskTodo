import React, { Children, createContext, useReducer } from "react";

export const TodoContext = createContext();
const initialValue = {
  todo: [],
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_TODO":
      const array = [...state.todo];
      array.push(action.payload);

      return {
        ...state,
        todo: array,
      };
    case "Edit":
      const edit = state.todo.filter((cur) => cur.id !== action.payload.id);
      const editedData = [...edit, action.payload];
      return {
        ...state,
        todo: editedData,
      };

    case "DELETE":
      const remove = state.todo.filter((cur) => cur.id !== action.payload);

      return {
        ...state,
        todo: remove,
      };
    default:
      return {
        ...state,
      };
  }
};
const Context = ({ children }) => {
  const [inputState, dispatch] = useReducer(reducer, initialValue);

  return (
    <TodoContext.Provider value={{ inputState, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default Context;
