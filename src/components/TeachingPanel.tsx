import { motion, AnimatePresence } from 'framer-motion';
import { FiBook, FiX } from 'react-icons/fi';

interface TeachingPanelProps {
  explanation: string | null;
  onClose: () => void;
}

export function TeachingPanel({ explanation, onClose }: TeachingPanelProps) {
  return (
    <AnimatePresence>
      {explanation && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="glass-strong rounded-2xl p-6 shadow-strong border-2 border-primary-500/30"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <FiBook className="w-5 h-5 text-primary-400" />
              <h3 className="text-lg font-semibold text-dark-200">AI Explanation</h3>
            </div>
            <button
              onClick={onClose}
              className="text-dark-400 hover:text-dark-200 transition-colors p-1 hover:bg-dark-700 rounded-lg"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-dark-300 leading-relaxed"
          >
            {explanation}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

