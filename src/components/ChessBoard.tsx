import { motion } from 'framer-motion';
import { Piece } from './Piece';
import type { Move } from '../types/chess';

interface ChessBoardProps {
  board: (any | null)[][];
  selectedSquare: string | null;
  validMoves: string[];
  lastMove: Move | null;
  onSquareClick: (square: string) => void;
  onDragStart: (square: string) => void;
  onDragEnd: (square: string) => void;
}

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

export function ChessBoard({
  board,
  selectedSquare,
  validMoves,
  lastMove,
  onSquareClick,
  onDragStart,
  onDragEnd,
}: ChessBoardProps) {
  const isLightSquare = (file: string, rank: number) => {
    const fileIndex = files.indexOf(file);
    const rankIndex = ranks.indexOf(rank);
    return (fileIndex + rankIndex) % 2 === 0;
  };

  const getSquareName = (file: string, rank: number) => `${file}${rank}`;

  const isLastMoveSquare = (square: string) => {
    return lastMove && (lastMove.from === square || lastMove.to === square);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto pl-6">
      {/* Coordinate labels - files (a-h) */}
      <div className="flex justify-between mb-2 text-sm font-medium text-dark-400">
        {files.map((file) => (
          <span key={file} className="w-[12.5%] text-center">{file}</span>
        ))}
      </div>

      <div className="relative bg-dark-800 rounded-2xl p-4 shadow-strong">
        <div className="grid grid-cols-8 gap-0 relative">
          {/* Coordinate labels - ranks (1-8) */}
          {ranks.map((rank) => (
            <div
              key={`rank-${rank}`}
              className="absolute -left-6 top-0 h-[12.5%] flex items-center justify-center text-sm font-medium text-dark-400 w-6"
              style={{ top: `${(8 - rank) * 12.5}%` }}
            >
              {rank}
            </div>
          ))}

          {ranks.map((rank) =>
            files.map((file) => {
              const square = getSquareName(file, rank);
              const isLight = isLightSquare(file, rank);
              const piece = board[8 - rank]?.[files.indexOf(file)];
              const isSelected = selectedSquare === square;
              const isValidMoveTarget = validMoves.includes(square);
              const isLastMove = isLastMoveSquare(square);

              return (
                <motion.div
                  key={square}
                  data-square={square}
                  className={`
                    relative aspect-square flex items-center justify-center
                    ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
                    ${isSelected ? 'ring-4 ring-primary-400 ring-offset-2' : ''}
                    ${isValidMoveTarget ? 'cursor-pointer' : ''}
                    ${isLastMove ? 'ring-2 ring-primary-500' : ''}
                    transition-colors duration-200
                  `}
                  onClick={() => onSquareClick(square)}
                  onDrop={(e) => {
                    e.preventDefault();
                    onSquareClick(square);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  whileHover={{
                    backgroundColor: isLight ? '#fef3c7' : '#92400e',
                  }}
                  animate={{
                    boxShadow: isValidMoveTarget
                      ? '0 0 20px rgba(251, 191, 36, 0.5)'
                      : 'none',
                  }}
                >
                  {/* Valid move indicator */}
                  {isValidMoveTarget && !piece && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="w-3 h-3 rounded-full bg-primary-500 shadow-glow" />
                    </motion.div>
                  )}

                  {/* Valid move indicator on occupied square */}
                  {isValidMoveTarget && piece && (
                    <motion.div
                      className="absolute inset-0 border-4 border-primary-500 rounded-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}

                  {/* Piece */}
                  {piece && (
                    <Piece
                      piece={piece}
                      square={square}
                      isSelected={isSelected}
                      isValidMove={isValidMoveTarget}
                      onDragStart={onDragStart}
                      onDragEnd={onDragEnd}
                    />
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* Coordinate labels - files (a-h) bottom */}
      <div className="flex justify-between mt-2 text-sm font-medium text-dark-400">
        {files.map((file) => (
          <span key={file} className="w-[12.5%] text-center">{file}</span>
        ))}
      </div>
    </div>
  );
}

