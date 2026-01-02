import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertCircle, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import type { GameStatus as GameStatusType } from '../types/chess';

interface GameStatusProps {
  status: GameStatusType;
  isThinking: boolean;
}

export function GameStatus({ status, isThinking }: GameStatusProps) {
  const getStatusMessage = () => {
    if (status.isCheckmate) {
      return {
        icon: FiXCircle,
        text: `Checkmate! ${status.turn === 'w' ? 'Black' : 'White'} wins`,
        color: 'text-red-400',
        bgColor: 'bg-red-500/20',
      };
    }
    if (status.isStalemate) {
      return {
        icon: FiCheckCircle,
        text: 'Stalemate - Draw',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/20',
      };
    }
    if (status.isDraw) {
      return {
        icon: FiCheckCircle,
        text: 'Draw',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/20',
      };
    }
    if (status.isCheck) {
      return {
        icon: FiAlertCircle,
        text: `${status.turn === 'w' ? 'White' : 'Black'} is in check!`,
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/20',
      };
    }
    return {
      icon: null,
      text: `${status.turn === 'w' ? 'White' : 'Black'}'s turn`,
      color: 'text-dark-300',
      bgColor: 'bg-dark-800/50',
    };
  };

  const statusInfo = getStatusMessage();
  const Icon = statusInfo.icon;

  return (
    <motion.div
      className="glass rounded-2xl p-6 shadow-medium"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="space-y-4">
        {/* Current Status */}
        <div className={`${statusInfo.bgColor} rounded-lg p-4 flex items-center gap-3`}>
          {Icon && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: status.isCheck ? Infinity : 0 }}
            >
              <Icon className={`w-6 h-6 ${statusInfo.color}`} />
            </motion.div>
          )}
          <div>
            <p className={`font-semibold ${statusInfo.color}`}>{statusInfo.text}</p>
          </div>
        </div>

        {/* AI Thinking Indicator */}
        <AnimatePresence>
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 text-dark-300"
            >
              <motion.div
                className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <span className="text-sm font-medium">AI is thinking...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

