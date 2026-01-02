import { motion } from 'framer-motion';
import type { Piece as PieceType } from '../types/chess';

interface PieceProps {
  piece: PieceType | null;
  square: string;
  isSelected: boolean;
  isValidMove: boolean;
  onDragStart: (square: string) => void;
  onDragEnd: (targetSquare: string) => void;
}

const pieceSymbols: Record<string, string> = {
  wp: '♙',
  wr: '♖',
  wn: '♘',
  wb: '♗',
  wq: '♕',
  wk: '♔',
  bp: '♟',
  br: '♜',
  bn: '♞',
  bb: '♝',
  bq: '♛',
  bk: '♚',
};

export function Piece({ piece, square, isSelected, isValidMove, onDragStart, onDragEnd }: PieceProps) {
  if (!piece) return null;

  const pieceKey = `${piece.color}${piece.type}`;
  const symbol = pieceSymbols[pieceKey];

  return (
    <motion.div
      className={`
        absolute inset-0 flex items-center justify-center text-5xl md:text-6xl
        cursor-grab active:cursor-grabbing select-none
        ${isSelected ? 'z-20' : 'z-10'}
        ${isSelected ? 'drop-shadow-glow' : ''}
      `}
      drag
      dragMomentum={false}
      dragConstraints={false}
      onDragStart={() => onDragStart(square)}
      onDragEnd={(event, info) => {
        // Use the point coordinates to find the target square
        const x = info.point.x;
        const y = info.point.y;
        
        // Find element at the drop point
        const targetElement = document.elementFromPoint(x, y);
        
        if (targetElement) {
          // Look for the square element (could be the square div or a child)
          const squareElement = targetElement.closest('[data-square]') as HTMLElement;
          if (squareElement) {
            const targetSquare = squareElement.getAttribute('data-square');
            if (targetSquare && targetSquare !== square) {
              onDragEnd(targetSquare);
            }
          }
        }
      }}
      animate={{
        scale: isSelected ? 1.1 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      whileHover={{
        scale: 1.05,
      }}
      whileDrag={{
        scale: 1.15,
        zIndex: 30,
      }}
    >
      <span className={`${piece.color === 'w' ? 'text-white' : 'text-dark-900'}`}>
        {symbol}
      </span>
    </motion.div>
  );
}

