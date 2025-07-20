import { useState } from "react";

export default function CustomCounter() {
    const { count, increment, decrement, reset } = useCounter();

    return (
        <div className="custom-counter">
            <h2>Custom Counter</h2>
            <p>Count: {count}</p>
            <button
                className="bg-green-600 text-white px-2 py-1 m-2 rounded"
                onClick={increment}
            >
                Increment
            </button>
            <button
                className="bg-red-600 text-white px-2 py-1 m-2 rounded"
                onClick={decrement}
            >
                Decrement
            </button>
            <button
                className="bg-blue-600 text-white px-2 py-1 m-2 rounded"
                onClick={reset}
            >
                Reset
            </button>
        </div>
    );
}

function useCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(initialValue);

    return { count, increment, decrement, reset };
}
