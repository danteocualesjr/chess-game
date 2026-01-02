import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { MoveHistoryEntry } from '../types/chess';

interface MoveHistoryProps {
  history: MoveHistoryEntry[];
}

export function MoveHistory({ history }: MoveHistoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  if (history.length === 0) {
    return (
      <motion.div
        className="glass rounded-2xl p-6 shadow-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold mb-4 text-dark-200">Move History</h3>
        <p className="text-sm text-dark-400 text-center py-8">No moves yet</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="glass rounded-2xl p-6 shadow-medium"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold mb-4 text-dark-200">Move History</h3>
      <div
        ref={scrollRef}
        className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar"
      >
        {history.map((entry, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-dark-800/50 hover:bg-dark-700/50 transition-colors"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <span className="text-sm font-medium text-dark-400 w-8">
              {entry.moveNumber}.
            </span>
            <div className="flex gap-2 flex-1">
              {entry.whiteMove && (
                <span className="text-sm text-white font-mono px-2 py-1 rounded bg-dark-700">
                  {entry.whiteMove}
                </span>
              )}
              {entry.blackMove && (
                <span className="text-sm text-dark-900 font-mono px-2 py-1 rounded bg-dark-400">
                  {entry.blackMove}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

