import { useState } from "react";

function App() {
  const [todos, todosSet] = useState([
    { id: 1, text: "React", isEditing: false },
    { id: 2, text: "Java Script", isEditing: false },
  ]);

  const [editText, setEditText] = useState("");

  const handleEditClick = (id, currentText) => {
    setEditText(currentText);
    todosSet(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: true } : todo
      )
    );
  };

  const handleSaveClick = (id) => {
    todosSet(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText, isEditing: false } : todo
      )
    );
    setEditText("");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Todo List</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "10px" }}>
            {todo.isEditing ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSaveClick(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <button
                  onClick={() => handleEditClick(todo.id, todo.text)}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
