import { useState, useCallback, useEffect, useRef } from 'react';
import { ChessEngine } from '../services/chessEngine';
import type { Move, GameStatus, DifficultyLevel, MoveHistoryEntry } from '../types/chess';
import { useAIPlayer } from './useAIPlayer';

export function useChessGame() {
  const [chessEngine] = useState(() => new ChessEngine());
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [validMoves, setValidMoves] = useState<string[]>([]);
  const [lastMove, setLastMove] = useState<Move | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>(() => chessEngine.getGameStatus());
  const [moveHistory, setMoveHistory] = useState<MoveHistoryEntry[]>([]);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('intermediate');
  const [teachingMode, setTeachingMode] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);

  const { makeMove: getAIMove, isThinking, error: aiError } = useAIPlayer(chessEngine);
  const playerColor = useRef<'w' | 'b'>('w');

  useEffect(() => {
    updateGameStatus();
    updateMoveHistory();
  }, [lastMove]);

  const updateGameStatus = () => {
    setGameStatus(chessEngine.getGameStatus());
  };

  const updateMoveHistory = () => {
    const history = chessEngine.getHistory();
    const entries: MoveHistoryEntry[] = [];
    
    let moveNumber = 1;
    for (let i = 0; i < history.length; i += 2) {
      const entry: MoveHistoryEntry = {
        moveNumber,
        whiteMove: history[i],
      };
      if (history[i + 1]) {
        entry.blackMove = history[i + 1];
      }
      entries.push(entry);
      moveNumber++;
    }
    
    setMoveHistory(entries);
  };

  const handleSquareClick = useCallback(
    (square: string) => {
      // If AI is thinking, ignore clicks
      if (isThinking) return;

      // If it's not player's turn, ignore
      if (chessEngine.getTurn() !== playerColor.current) return;

      // If game is over, ignore
      if (chessEngine.isGameOver()) return;

      // If clicking the same square, deselect
      if (selectedSquare === square) {
        setSelectedSquare(null);
        setValidMoves([]);
        return;
      }

      const board = chessEngine.getBoard();
      const [file, rank] = square.split('');
      const row = 8 - parseInt(rank);
      const col = file.charCodeAt(0) - 97;
      const piece = board[row]?.[col];

      // If clicking on a piece of the current player
      if (piece && piece.color === playerColor.current) {
        setSelectedSquare(square);
        const moves = chessEngine.getValidMoves(square);
        setValidMoves(moves);
        return;
      }

      // If a square is selected and clicking on a valid move square
      if (selectedSquare && validMoves.includes(square)) {
        makePlayerMove(selectedSquare, square);
        return;
      }

      // Otherwise, deselect
      setSelectedSquare(null);
      setValidMoves([]);
    },
    [selectedSquare, validMoves, isThinking, chessEngine]
  );

  const makePlayerMove = useCallback(
    async (from: string, to: string) => {
      const move = chessEngine.makeMove(from, to);
      
      if (!move) {
        setSelectedSquare(null);
        setValidMoves([]);
        return;
      }

      setLastMove(move);
      setSelectedSquare(null);
      setValidMoves([]);
      updateGameStatus();

      // If game is not over, let AI make a move
      if (!chessEngine.isGameOver() && chessEngine.getTurn() !== playerColor.current) {
        await makeAIMove();
      }
    },
    [chessEngine]
  );

  const makeAIMove = useCallback(async () => {
    const response = await getAIMove(difficulty, teachingMode);
    
    if (!response) {
      return;
    }

    const from = response.move.substring(0, 2);
    const to = response.move.substring(2, 4);
    
    const move = chessEngine.makeMove(from, to);
    
    if (move) {
      setLastMove(move);
      if (response.explanation) {
        setAiExplanation(response.explanation);
      } else {
        setAiExplanation(null);
      }
      updateGameStatus();
    }
  }, [chessEngine, difficulty, teachingMode, getAIMove]);

  const resetGame = useCallback(() => {
    chessEngine.reset();
    setSelectedSquare(null);
    setValidMoves([]);
    setLastMove(null);
    setMoveHistory([]);
    setAiExplanation(null);
    updateGameStatus();
  }, [chessEngine]);

  const getBoard = useCallback(() => {
    return chessEngine.getBoard();
  }, [chessEngine]);

  const clearExplanation = useCallback(() => {
    setAiExplanation(null);
  }, []);

  return {
    board: getBoard(),
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
    playerColor: playerColor.current,
  };
}

