import { useEffect } from 'react';
import sound from '../assets/mixkit-arcade-game-jump-coin-216.wav';
import Cell from './Cell';

// Winner check function
const calculateWinner = cells => {
  const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];
  for (const line of winnerLines) {
    const [x, y, z] = line;

    //  Checking winner
    if (cells[x] && cells[x] === cells[y] && cells[x] === cells[z]) {
      return cells[x];
    }
  }
  return null;
};

// Audio sound
const audio = new Audio(sound);

function Board({ oIsNext, currentCells: cells, onPlay }) {
  console.log(cells);
  // Loading sound
  const audio = new Audio(sound);
  useEffect(() => {
    audio.load();
  }, [audio]);

  let status;
  let winner = calculateWinner(cells);
  if (winner) {
    status = `Winner: ${winner} 💸`;
  } else if (cells.every(cell => cell !== null)) {
    status = "It's a draw!";
  } else {
    status = `Player: ${oIsNext ? 'O' : 'X'}`;
  }

  // Handling square click
  const handleCellClick = i => {
    // Handling multiple click in a square
    if (cells[i] || winner) return;

    // Setting current move
    audio.play();
    const nextCells = [...cells];
    oIsNext ? (nextCells[i] = 'O') : (nextCells[i] = 'X');
    onPlay(nextCells);
  };

  return (
    <>
      <h2 className="text-4xl mt-4 mb-8  font-semibold text-indigo-800 ">
        {status}
      </h2>
      <div className="flex">
        <Cell value={cells[0]} onCellClick={() => handleCellClick(0)} />
        <Cell value={cells[1]} onCellClick={() => handleCellClick(1)} />
        <Cell value={cells[2]} onCellClick={() => handleCellClick(2)} />
      </div>
      <div className="flex">
        <Cell value={cells[3]} onCellClick={() => handleCellClick(3)} />
        <Cell value={cells[4]} onCellClick={() => handleCellClick(4)} />
        <Cell value={cells[5]} onCellClick={() => handleCellClick(5)} />
      </div>
      <div className="flex">
        <Cell value={cells[6]} onCellClick={() => handleCellClick(6)} />
        <Cell value={cells[7]} onCellClick={() => handleCellClick(7)} />
        <Cell value={cells[8]} onCellClick={() => handleCellClick(8)} />
      </div>
    </>
  );
}

export default Board;
