import { useState } from "react";

function Square() {
    const [value, setValue] = useState(null);

    const handleClick = () => setValue("X");

    return (
        <button
            onClick={handleClick}
            className="w-16 h-16 text-2xl font-bold leading-none p-0 border"
        >
            {value}
        </button>
    );
}

export default function Board() {
    return (
        <div className="container m-10">
            <div className="board-row grid grid-cols-3 w-fit">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="board-row grid grid-cols-3 w-fit">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="board-row grid grid-cols-3 w-fit">
                <Square />
                <Square />
                <Square />
            </div>
        </div>
    );
}
