import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useTodoStatus from "./HookComponents"; // default export

const Todolist = () => {
  const [taskInput, setTaskInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const {
    pendingTodos,
    completedTodos,
    setPendingTodos,
    setCompletedTodos,
    moveToCompleted,
    moveToPending,
  } = useTodoStatus();

  const handleAdd = () => {
    if (taskInput.trim() === "") return;

    const newTodo = {
      id: uuidv4(),
      title: taskInput.trim(),
    };

    setPendingTodos((prev) => [...prev, newTodo]);
    setTaskInput("");
  };

  const handleEditClick = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const handleSaveClick = (id, listType) => {
    const updateList = (list, setList) => {
      const updated = list.map((item) =>
        item.id === id ? { ...item, title: editText } : item
      );
      setList(updated);
    };

    if (listType === "pending") {
      updateList(pendingTodos, setPendingTodos);
    } else {
      updateList(completedTodos, setCompletedTodos); 
    }

    setEditId(null);
    setEditText("");
  };

  const handleCancelClick = () => {
    setEditId(null);
    setEditText("");
  };

  const handleDelete = (id, listType) => {
    if (listType === "pending") {
      setPendingTodos((prev) => prev.filter((todo) => todo.id !== id));
    } else {
      moveToPending((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo List</h1>

      <input
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={handleAdd}>Add</button>

      <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>
        <div>
          <h3>Pending</h3>
          <ul>
            {pendingTodos.map((todo) => (
              <li key={todo.id}>
                {editId === todo.id ? (
                  <>
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={() => handleSaveClick(todo.id, "pending")}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </>
                ) : (
                  <>
                    {todo.title}
                    <button onClick={() => handleEditClick(todo.id, todo.title)}>Edit</button>
                    <button onClick={() => handleDelete(todo.id, "pending")}>Delete</button>
                    <button onClick={() => moveToCompleted(todo)}>Completed</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Completed</h3>
          <ul>
            {completedTodos.map((todo) => (
              <li key={todo.id}>
                {editId === todo.id ? (
                  <>
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={() => handleSaveClick(todo.id, "completed")}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </>
                ) : (
                  <>
                    {todo.title}
                    <button onClick={() => handleEditClick(todo.id, todo.title)}>Edit</button>
                    <button onClick={() => handleDelete(todo.id, "completed")}>Delete</button>
                    <button onClick={() => moveToPending(todo)}>Pending</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todolist;
