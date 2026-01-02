import type { Move } from '../types/chess';

/**
 * Convert a move object to UCI notation (e.g., "e2e4")
 */
export function moveToUCI(move: Move): string {
  return `${move.from}${move.to}${move.promotion || ''}`;
}

/**
 * Convert UCI notation to a move object
 */
export function uciToMove(uci: string): Move | null {
  if (uci.length < 4) return null;
  
  const from = uci.substring(0, 2);
  const to = uci.substring(2, 4);
  const promotion = uci.length > 4 ? uci.substring(4, 5) : undefined;

  return {
    from,
    to,
    promotion: promotion as any,
  };
}

/**
 * Convert SAN notation to UCI notation (requires chess instance)
 */
export function sanToUCI(san: string, chess: any): string | null {
  try {
    const move = chess.move(san);
    if (move) {
      chess.undo();
      return `${move.from}${move.to}`;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Extract move from various formats
 */
export function extractMove(text: string): string | null {
  // Try to find UCI format (e.g., e2e4, e2-e4, e2 e4)
  const uciPattern = /([a-h][1-8])\s*[-]?\s*([a-h][1-8])/i;
  const uciMatch = text.match(uciPattern);
  if (uciMatch) {
    return `${uciMatch[1]}${uciMatch[2]}`;
  }

  // Try to find SAN format (e.g., e4, Nf3, O-O)
  const sanPattern = /([PNBRQK]?[a-h]?[1-8]?x?[a-h][1-8][+#]?|O-O-O|O-O)/i;
  const sanMatch = text.match(sanPattern);
  if (sanMatch) {
    return sanMatch[1];
  }

  return null;
}

