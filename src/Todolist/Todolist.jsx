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
    if (inputValue.trim() === "") return;

    const newTodoItem = {
      id: uuidv4(),
      title: inputValue,
    };

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
    <div style={{ padding: "20px" }}>
      <h2>Todo List</h2>
      <input
        placeholder="Add a new todo"
        value={inputValue}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Add</button>

      <ul>
        {todolist.map((item) => (
          <li key={item.id} style={{ margin: "10px 0" }}>
            {editId === item.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSaveClick(item.id)}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </>
            ) : (
              <>
                <span>{item.title}</span>
                <button
                  onClick={() => handleEditClick(item.id, item.title)}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ marginLeft: "5px" }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
