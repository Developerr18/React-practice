import { useState } from "react";
import MyTodoInput from "./MyTodoInput";
import MyTodoItem from "./MyTodoItem";

export default function MyTodo() {
    const [todos, setTodos] = useState(initialTodos);

    const handleAddTodo = (newTodo) => {
        if (!newTodo.trim()) return;
        setTodos([
            ...todos,
            { id: todos.length + 1, title: newTodo, done: false },
        ]);
    };

    const handleChangeTodo = (updatedTodo) => {
        setTodos(
            todos.map((todo) =>
                todo.id === updatedTodo.id ? updatedTodo : todo
            )
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
