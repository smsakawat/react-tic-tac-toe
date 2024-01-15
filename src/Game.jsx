import { useState } from 'react';
import AllMoves from './AllMoves';
import Board from './Board.jsx';
import './index.css';

export default function Game() {
  const [allMoves, setAllMoves] = useState([Array(9).fill(null)]);
  const [oIsNext, setOIsNext] = useState(false);
  const [currentMove, setCurrentMove] = useState(0);

  const currentCells = allMoves[currentMove];

  // Handling user moves
  const handlePlay = newMoves => {
    setOIsNext(!oIsNext);
    const nextAllMoves = [...allMoves.slice(0, currentMove + 1), newMoves];
    setAllMoves(nextAllMoves);
    setCurrentMove(nextAllMoves.length - 1);
  };

  // Handling Reset
  const handleReset = () => {
    setAllMoves([Array(9).fill(null)]);
    setCurrentMove(0);
    setOIsNext(false);
  };

  // Handling moves in jump
  const jumpTo = i => {
    setCurrentMove(i);
    setOIsNext(i % 2 === 1);
  };

  const movements = allMoves.map((move, i) => {
    let message;
    if (i > 0) {
      message = `Go to the move #${i}`;
    } else {
      message = `Make a move now`;
    }
    return (
      <li
        key={`${i}-move`}
        className="px-5 py-3 bg-indigo-300 text-slate-600 font-semibold rounded mb-2 hover:bg-indigo-400 transition hover:cursor-pointer w-full"
      >
        <button onClick={() => jumpTo(i)} className="w-full">
          {message}
        </button>
      </li>
    );
  });

  return (
    <div className="bg-slate-100 h-screen py-2 px-10 grid grid-cols-2 items-center justify-items-start gap-32">
      <div className="justify-self-end">
        <Board
          currentCells={currentCells}
          oIsNext={oIsNext}
          onPlay={handlePlay}
        />
      </div>
      <div className="">
        <AllMoves movements={movements} />
      </div>
      <div className="col-span-full text-center justify-self-center self-start">
        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="px-6 py-4 bg-indigo-500 hover:bg-indigo-600 transition text-slate-100 text-md font-semibold   rounded"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}
