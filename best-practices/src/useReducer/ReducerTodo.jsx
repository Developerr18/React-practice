import { useState } from "react";

const initialTodos = [
  {
    id: 1,
    title: "coding exercises",
    done: true,
  },
  {
    id: 2,
    title: "workout",
    done: false,
  },
  {
    id: 3,
    title: "meeting attendance",
    done: false,
  },
];

export default function MyTodo() {
  const [todos, setTodos] = useState(initialTodos);

  const handleAddTodo = (newTodo) => {
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: todos.length + 1, title: newTodo, done: false }]);
  };

  const handleChangeTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <MyTodoInput onAddTodo={handleAddTodo} />
      <ul>
        {todos.map((todo) => (
          <MyTodoItem
            key={todo.id}
            todo={todo}
            onChange={handleChangeTodo}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

function MyTodoItem({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li key={todo.id} className="m-5">
      {isEditing ? (
        <input
          className="border"
          value={todo.title}
          onChange={(e) => {
            onChange({
              ...todo,
              title: e.target.value,
            });
          }}
        />
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={(e) => {
              onChange({
                ...todo,
                done: e.target.checked,
              });
            }}
          />
          <span>{todo.done ? <del>{todo.title}</del> : todo.title}</span>
        </>
      )}
      {isEditing ? (
        <button
          onClick={() => setIsEditing(false)}
          className="ml-5 border px-2 py-1"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="ml-5 border px-2 py-1"
        >
          Edit
        </button>
      )}
      <button
        onClick={() => onDelete(todo.id)}
        className="ml-5 border px-2 py-1"
      >
        Delete
      </button>
    </li>
  );
}

function MyTodoInput({ onAddTodo }) {
  const [newTodo, setNewTodo] = useState("");

  return (
    <div>
      <input
        type="text"
        className="border m-2"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button
        className="border px-2 py-1"
        onClick={() => {
          onAddTodo(newTodo);
          setNewTodo("");
        }}
      >
        Add
      </button>
    </div>
  );
}
