import { Chess, Square as ChessSquare } from 'chess.js';
import type { Move, GameStatus, PieceColor } from '../types/chess';

export class ChessEngine {
  private chess: Chess;

  constructor(fen?: string) {
    this.chess = new Chess(fen);
  }

  getBoard(): (any | null)[][] {
    return this.chess.board();
  }

  getFen(): string {
    return this.chess.fen();
  }

  isValidMove(from: string, to: string, promotion?: string): boolean {
    try {
      const move = this.chess.move({
        from: from as ChessSquare,
        to: to as ChessSquare,
        promotion: promotion as any,
      });
      if (move) {
        this.chess.undo();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  makeMove(from: string, to: string, promotion?: string): Move | null {
    try {
      const move = this.chess.move({
        from: from as ChessSquare,
        to: to as ChessSquare,
        promotion: promotion as any,
      });
      if (move) {
        return {
          from: move.from,
          to: move.to,
          promotion: move.promotion as any,
          san: move.san,
        };
      }
      return null;
    } catch {
      return null;
    }
  }

  getValidMoves(square: string): string[] {
    const moves = this.chess.moves({ square: square as ChessSquare, verbose: true });
    return moves.map(move => move.to);
  }

  getGameStatus(): GameStatus {
    return {
      isCheck: this.chess.isCheck(),
      isCheckmate: this.chess.isCheckmate(),
      isStalemate: this.chess.isStalemate(),
      isDraw: this.chess.isDraw(),
      turn: this.chess.turn() as PieceColor,
    };
  }

  getHistory(): string[] {
    return this.chess.history({ verbose: false });
  }

  reset(): void {
    this.chess.reset();
  }

  undo(): void {
    this.chess.undo();
  }

  isGameOver(): boolean {
    return this.chess.isGameOver();
  }

  getTurn(): PieceColor {
    return this.chess.turn() as PieceColor;
  }
}

