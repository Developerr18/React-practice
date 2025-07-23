import { useState } from "react";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [isAscending, setIsAcending] = useState(true);
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpToMove(move) {
        setCurrentMove(move);
    }

    const moves = history.map((squares, move) => {
        const description =
            move > 0 ? `Go to move #${move}` : "Go to game start";
        return (
            <li key={move}>
                <button
                    onClick={() => jumpToMove(move)}
                    className="border mt-1 mb-1 ml-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    {description}
                </button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={currentSquares}
                    xIsNext={xIsNext}
                    onPlay={handlePlay}
                />
            </div>
            <div className="game-info">
                <div className="ml-5 mt-2 mb-7 text-2xl">{`You are at move #${currentMove}`}</div>
                <button
                    onClick={() => setIsAcending(!isAscending)}
                    className="mb-4 ml-4 px-4 py-2 bg-gray-500 text-white rounded"
                >
                    Sort moves {isAscending ? "Descending" : "Ascending"}
                </button>
                <ol>{isAscending ? moves : [...moves].reverse()}</ol>
            </div>
        </div>
    );
}

function Board({ squares, xIsNext, onPlay }) {
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) return;
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }

    const result = calculateWinner(squares);
    const winner = result?.winner;
    const isDraw = !winner && squares.every(Boolean);
    const winningLine = result?.line;

    const status = winner
        ? `Winner: ${winner}`
        : isDraw
        ? "It's a Draw!"
        : `Next player: ${xIsNext ? "X" : "O"}`;

    return (
        <div className="container ml-10 mt-10 mb-7">
            <div className="m-5 text-2xl">{status}</div>

            {[0, 1, 2].map((row) => (
                <div key={row} className="grid grid-cols-3 w-fit">
                    {[0, 1, 2].map((col) => {
                        const index = row * 3 + col;
                        return (
                            <Square
                                key={index}
                                value={squares[index]}
                                onSquareClick={() => handleClick(index)}
                                highlight={winningLine?.includes(index)}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

function Square({ value, onSquareClick, highlight }) {
    return (
        <button
            onClick={onSquareClick}
            className={`w-16 h-16 text-2xl font-bold leading-none p-0 border ${
                highlight ? "bg-yellow-300" : "bg-white"
            }`}
        >
            {value}
        </button>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let line of lines) {
        const [a, b, c] = line;
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return { winner: squares[a], line };
        }
    }

    return null;
}
