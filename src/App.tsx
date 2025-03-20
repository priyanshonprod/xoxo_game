import React, { useState, useCallback } from 'react';
import { X, Circle, RotateCcw } from 'lucide-react';

type Player = 'X' | 'O';
type BoardState = (Player | null)[];

function App() {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

  const checkWinner = useCallback((squares: BoardState): Player | 'Draw' | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    if (squares.every(square => square !== null)) {
      return 'Draw';
    }

    return null;
  }, []);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const renderSquare = (index: number) => {
    return (
      <button
        onClick={() => handleClick(index)}
        className={`w-24 h-24 border-4 border-indigo-200 rounded-xl flex items-center justify-center
          transition-all duration-200 hover:bg-indigo-50 ${board[index] ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={!!board[index] || !!winner}
      >
        {board[index] === 'X' && <X className="w-12 h-12 text-indigo-600" strokeWidth={2.5} />}
        {board[index] === 'O' && <Circle className="w-12 h-12 text-rose-500" strokeWidth={2.5} />}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-rose-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Tic Tac Toe</h1>
          {!winner && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg text-gray-600">Current Player:</span>
              {currentPlayer === 'X' ? (
                <X className="w-6 h-6 text-indigo-600" />
              ) : (
                <Circle className="w-6 h-6 text-rose-500" />
              )}
            </div>
          )}
          {winner && (
            <div className="text-xl font-semibold">
              {winner === 'Draw' ? (
                <span className="text-gray-600">It's a Draw!</span>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-gray-800">Winner:</span>
                  {winner === 'X' ? (
                    <X className="w-6 h-6 text-indigo-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-rose-500" />
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {Array(9).fill(null).map((_, index) => (
            <div key={index}>
              {renderSquare(index)}
            </div>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl
            flex items-center justify-center gap-2 hover:from-indigo-600 hover:to-indigo-700 
            transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <RotateCcw className="w-5 h-5" />
          <span>New Game</span>
        </button>
      </div>
    </div>
  );
}

export default App;