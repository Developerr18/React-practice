import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);
    const [selectedStep, setSelectedStep] = useState(1);

    function handleDecrement() {
        if (count - selectedStep < 0) return;
        setCount(count - selectedStep);
    }

    function handleStepChange(e) {
        setSelectedStep(Number(e.target.value));
    }

    return (
        <>
            <div className="counter-display text-5xl ml-10 mt-5">
                Count: {count}
            </div>
            <div className="select-stepsize mt-5">
                <label htmlFor="step">Choose a step :</label>
                <select
                    id="step"
                    value={selectedStep}
                    onChange={handleStepChange}
                    className="ml-2 bg-white text-black border border-gray-300 rounded p-2"
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>

            <div className="buttons mt-10">
                <button
                    onClick={() => setCount(count + selectedStep)}
                    className="bg-blue-600 text-white px-4 py-2 mx-2 cursor-pointer rounded-md hover:bg-blue-700 transition"
                >
                    Increment
                </button>
                <button
                    onClick={handleDecrement}
                    className="bg-red-600 text-white px-4 py-2 mx-2 cursor-pointer rounded-md hover:bg-red-700 transition"
                >
                    Decrement
                </button>
                <button
                    onClick={() => setCount(0)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 mx-2 cursor-pointer rounded-md hover:bg-gray-300 transition"
                >
                    Reset
                </button>
            </div>
        </>
    );
}
