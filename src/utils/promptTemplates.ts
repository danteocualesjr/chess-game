import type { DifficultyLevel } from '../types/chess';

export function getMovePrompt(
  fen: string,
  difficulty: DifficultyLevel,
  teachingMode: boolean
): string {
  const difficultyInstructions = {
    beginner: `You are playing chess at a BEGINNER level. Make simple, straightforward moves. 
    Focus on developing pieces and basic principles. Avoid complex tactics and deep calculations. 
    Sometimes make slightly suboptimal moves to keep the game accessible.`,
    
    intermediate: `You are playing chess at an INTERMEDIATE level. Play a balanced game with 
    some tactical awareness. Look for basic tactics like forks, pins, and skewers. Make solid 
    moves but don't calculate too deeply.`,
    
    advanced: `You are playing chess at an ADVANCED level. Play strong chess with deep calculation. 
    Look for complex tactics, combinations, and strategic plans. Calculate multiple moves ahead 
    and find the best moves available.`,
  };

  const teachingInstruction = teachingMode
    ? `\n\nIMPORTANT: Teaching mode is ON. After providing your move, explain your reasoning 
    in 1-2 sentences. Focus on the strategic or tactical idea behind the move.`
    : '';

  return `You are playing chess against a human opponent. The current board position in FEN notation is:
${fen}

${difficultyInstructions[difficulty]}

${teachingInstruction}

Respond with ONLY a valid chess move in UCI notation (e.g., "e2e4" or "g1f3"). 
Do not include any other text unless teaching mode is enabled, in which case provide the move 
followed by a brief explanation on a new line.

Your move:`;
}

export function getTeachingPrompt(fen: string, lastMove: string, difficulty: DifficultyLevel): string {
  return `You are teaching chess to a beginner. The current board position is:
${fen}

The last move played was: ${lastMove}

Explain this move and its purpose. What strategic or tactical idea does it demonstrate? 
Keep the explanation clear and educational, suitable for someone learning chess.

Explanation:`;
}

export function getMoveSuggestionPrompt(
  fen: string,
  playerColor: 'w' | 'b',
  difficulty: DifficultyLevel
): string {
  return `You are helping a chess player improve. The current board position is:
${fen}

It is ${playerColor === 'w' ? 'White' : 'Black'}'s turn to move.

Suggest the best move and explain why it's good. Consider:
- Piece development
- King safety
- Tactical opportunities
- Strategic plans

Provide the move in UCI notation followed by a brief explanation.

Suggestion:`;
}

