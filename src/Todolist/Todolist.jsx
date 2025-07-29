import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Todolist = () => {
  const [inputValue, setInputValue] = useState("");
  const [todolist, setTodolist] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    const newTodoItem = { id: uuidv4(), title: inputValue };

    setTodolist([...todolist, newTodoItem]);
    setInputValue("");
  };

  const handleDelete = (id) => {
    const filteredList = todolist.filter((todo) => todo.id !== id);
    setTodolist(filteredList);
  };

  const handleEditClick = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const handleSaveClick = (id) => {
    const updatedList = todolist.map((todo) =>
      todo.id === id ? { ...todo, title: editText } : todo
    );
    setTodolist(updatedList);
    setEditId(null);
    setEditText("");
  };

  const handleCancelClick = () => {
    setEditId(null);
    setEditText("");
  };

  return (
    <div>
      <h2>Todo List</h2>

      <input value={inputValue} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>

      <ul>
        {todolist.map((todo) => (
          <li key={todo.id}>
            {editId === todo.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSaveClick(todo.id)}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </>
            ) : (
              <>
                <span>{todo.title}</span>
                <button onClick={() => handleEditClick(todo.id, todo.title)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
