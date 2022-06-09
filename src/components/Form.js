import React, { useState, useContext, useRef } from "react";
import { TodoContext } from "./Context";

const Form = () => {
  // eslint-disable-next-line no-unused-vars
  const inputData = useRef();
  const [editId, setEditId] = useState("");
  const { inputState, dispatch } = useContext(TodoContext);
  const submitTodoData = (e) => {
    e.preventDefault();
    if (editId) {
      const editObj = {
        id: editId,
        todo: inputData.current.value,
      };
      dispatch({ type: "Edit", payload: editObj });
      console.log(editObj);
      inputData.current.value = "";
      setEditId("");
    } else {
      const obj = {
        id: Math.random() * 1000,
        todo: inputData.current.value,
      };
      dispatch({ type: "ADD_TO_TODO", payload: obj });
      inputData.current.value = "";
    }
  };
  const editHandler = (id) => {
    // eslint-disable-next-line no-unused-vars
    setEditId(id);
    const edit = inputState.todo?.filter((cur) => cur.id === id);
    inputData.current.value = edit[0].todo;
  };

  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card rounded-3">
                <div className="card-body p-4">
                  <h4 className="text-center my-3 pb-3">To Do App</h4>

                  <form
                    onSubmit={submitTodoData}
                    className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
                  >
                    <div className="col-12">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form1"
                          ref={inputData}
                          className="form-control"
                          placeholder="Enter Data"
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </form>

                  <table className="table mb-4">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Todo item</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inputState &&
                        inputState.todo.length > 0 &&
                        inputState.todo.map((item, key) => {
                          return (
                            <>
                              <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{item.todo}</td>
                                <td>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      editHandler(item.id);
                                    }}
                                  >
                                    Edit
                                  </button>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-danger p-2"
                                    onClick={() => {
                                      dispatch({
                                        type: "DELETE",
                                        payload: item.id,
                                      });
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Form;
