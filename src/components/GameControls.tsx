import { motion } from 'framer-motion';
import { FiSettings, FiBook, FiRefreshCw } from 'react-icons/fi';
import type { DifficultyLevel } from '../types/chess';

interface GameControlsProps {
  difficulty: DifficultyLevel;
  onDifficultyChange: (difficulty: DifficultyLevel) => void;
  teachingMode: boolean;
  onTeachingModeToggle: () => void;
  onNewGame: () => void;
}

export function GameControls({
  difficulty,
  onDifficultyChange,
  teachingMode,
  onTeachingModeToggle,
  onNewGame,
}: GameControlsProps) {
  const difficulties: { value: DifficultyLevel; label: string }[] = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  return (
    <motion.div
      className="glass rounded-2xl p-6 shadow-medium"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        {/* Difficulty Selector */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-dark-300 mb-3">
            <FiSettings className="w-4 h-4" />
            Difficulty Level
          </label>
          <div className="flex gap-2">
            {difficulties.map((diff) => (
              <motion.button
                key={diff.value}
                onClick={() => onDifficultyChange(diff.value)}
                className={`
                  flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all
                  ${
                    difficulty === diff.value
                      ? 'bg-primary-500 text-dark-900 shadow-glow'
                      : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {diff.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Teaching Mode Toggle */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-dark-300 mb-3">
            <FiBook className="w-4 h-4" />
            Teaching Mode
          </label>
          <button
            onClick={onTeachingModeToggle}
            className={`
              relative w-14 h-8 rounded-full transition-colors duration-300
              ${teachingMode ? 'bg-primary-500' : 'bg-dark-700'}
            `}
          >
            <motion.div
              className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-medium"
              animate={{
                x: teachingMode ? 24 : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            />
          </button>
          <p className="text-xs text-dark-400 mt-2">
            {teachingMode
              ? 'AI will explain its moves'
              : 'AI will play without explanations'}
          </p>
        </div>

        {/* New Game Button */}
        <motion.button
          onClick={onNewGame}
          className="w-full px-6 py-3 bg-primary-500 text-dark-900 font-semibold rounded-lg shadow-medium hover:shadow-glow transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiRefreshCw className="w-5 h-5" />
          New Game
        </motion.button>
      </div>
    </motion.div>
  );
}

