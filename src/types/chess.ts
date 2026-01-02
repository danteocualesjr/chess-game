export type PieceColor = 'w' | 'b';
export type PieceType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k';

export interface Piece {
  type: PieceType;
  color: PieceColor;
}

export interface Square {
  file: string; // a-h
  rank: number; // 1-8
}

export interface Move {
  from: string;
  to: string;
  promotion?: PieceType;
  san?: string; // Standard Algebraic Notation
}

export interface GameStatus {
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  isDraw: boolean;
  turn: PieceColor;
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface AIMoveResponse {
  move: string;
  explanation?: string;
}

export interface MoveHistoryEntry {
  moveNumber: number;
  whiteMove?: string;
  blackMove?: string;
  san?: string;
}

