import { useState } from 'react';
import { ChessBoard } from './components/ChessBoard';
import { GameControls } from './components/GameControls';
import { MoveHistory } from './components/MoveHistory';
import { GameStatus } from './components/GameStatus';
import { TeachingPanel } from './components/TeachingPanel';
import { useChessGame } from './hooks/useChessGame';
import './styles/globals.css';

function App() {
  const {
    board,
    selectedSquare,
    validMoves,
    lastMove,
    gameStatus,
    moveHistory,
    difficulty,
    setDifficulty,
    teachingMode,
    setTeachingMode,
    aiExplanation,
    clearExplanation,
    isThinking,
    aiError,
    handleSquareClick,
    resetGame,
  } = useChessGame();

  const [draggedSquare, setDraggedSquare] = useState<string | null>(null);

  const handleDragStart = (square: string) => {
    setDraggedSquare(square);
    handleSquareClick(square);
  };

  const handleDragEnd = (targetSquare: string) => {
    if (draggedSquare && draggedSquare !== targetSquare) {
      handleSquareClick(targetSquare);
    }
    setDraggedSquare(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 mb-2">
            Chess Game
          </h1>
          <p className="text-dark-400">Play against an AI opponent powered by OpenAI</p>
        </div>

        {/* Error Message */}
        {aiError && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {aiError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <GameControls
              difficulty={difficulty}
              onDifficultyChange={setDifficulty}
              teachingMode={teachingMode}
              onTeachingModeToggle={() => setTeachingMode(!teachingMode)}
              onNewGame={resetGame}
            />
            <GameStatus status={gameStatus} isThinking={isThinking} />
          </div>

          {/* Center - Chess Board */}
          <div className="lg:col-span-1 flex items-center justify-center">
            <ChessBoard
              board={board}
              selectedSquare={selectedSquare}
              validMoves={validMoves}
              lastMove={lastMove}
              onSquareClick={handleSquareClick}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <MoveHistory history={moveHistory} />
            <TeachingPanel
              explanation={aiExplanation}
              onClose={clearExplanation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

