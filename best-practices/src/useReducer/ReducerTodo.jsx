import { useReducer, useState } from "react";

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

function todoReducer(todos, action) {
  switch (action.type) {
    case "AddedTodo":
      return [
        ...todos,
        { id: todos.length + 1, title: action.title, done: false },
      ];
    case "Changed_Todo":
      return todos.map((todo) => {
        if (todo.id === action.updatedTodo.id) {
          return action.updatedTodo;
        } else {
          return todo;
        }
      });
    case "Delete_Todo":
      return todos.filter((todo) => todo.id !== action.todoId);
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export default function MyTodo() {
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);
  // const [todos, setTodos] = useState(initialTodos);

  function handleAddTodo(newTodo) {
    dispatchTodos({
      type: "AddedTodo",
      title: newTodo,
    });
  }

  function handleChangeTodo(updatedTodo) {
    dispatchTodos({
      type: "Changed_Todo",
      updatedTodo,
    });
  }

  function handleDeleteTodo(todoId) {
    dispatchTodos({
      type: "Delete_Todo",
      todoId,
    });
  }

  /*
  const handleAddTodo = (newTodo) => {
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: todos.length + 1, title: newTodo, done: false }]);
  };
  const handleChangeTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };*/

  return (
    <div>
      <MyTodoInput onAddTodo={handleAddTodo} />
      <ul>
        {todos.map((todo) => (
          <MyTodoItem
            key={todo.id}
            todo={todo}
            onChange={handleChangeTodo}
            onDelete={handleDeleteTodo}
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
          type="text"
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
            className="m-2"
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
