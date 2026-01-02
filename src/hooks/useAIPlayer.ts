import { useState, useCallback } from 'react';
import type { DifficultyLevel, AIMoveResponse } from '../types/chess';
import { getAIMove } from '../services/openaiService';
import { ChessEngine } from '../services/chessEngine';

export function useAIPlayer(chessEngine: ChessEngine) {
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const makeMove = useCallback(
    async (difficulty: DifficultyLevel, teachingMode: boolean): Promise<AIMoveResponse | null> => {
      setIsThinking(true);
      setError(null);

      try {
        const fen = chessEngine.getFen();
        const response = await getAIMove(fen, difficulty, teachingMode);

        // Validate the move
        const isValid = chessEngine.isValidMove(
          response.move.substring(0, 2),
          response.move.substring(2, 4)
        );

        if (!isValid) {
          throw new Error('AI returned an invalid move');
        }

        return response;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to get AI move';
        setError(errorMessage);
        console.error('Error in useAIPlayer:', err);
        return null;
      } finally {
        setIsThinking(false);
      }
    },
    [chessEngine]
  );

  return {
    makeMove,
    isThinking,
    error,
  };
}

