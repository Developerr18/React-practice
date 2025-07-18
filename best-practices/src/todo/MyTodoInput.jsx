import { useState } from "react";

export default function MyTodoInput({ onAddTodo }) {
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
