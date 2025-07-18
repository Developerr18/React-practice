import { useState } from "react";

export default function MyTodoItem({ todo, onChange, onDelete }) {
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
                    <span>
                        {todo.done ? <del>{todo.title}</del> : todo.title}
                    </span>
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
