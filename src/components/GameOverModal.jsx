import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';

export function GameOverModal() {
  const bankruptcyReason = useGameStore((state) => state.bankruptcyReason);
  const initGame = useGameStore((state) => state.initGame);

  return (
    <div className="modal-overlay">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          background: '#111',
          border: '2px solid #ff4444',
          borderRadius: '12px',
          padding: '3rem',
          maxWidth: '500px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 0 40px rgba(255, 68, 68, 0.4)'
        }}
      >
        <h1 style={{ color: '#ff4444', fontSize: '3rem', margin: '0 0 1rem', textTransform: 'uppercase' }}>
          Bankrupt
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '2.5rem' }}>
          {bankruptcyReason}
        </p>

        <button
          onClick={initGame}
          style={{
            background: '#ff4444',
            color: '#fff',
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </motion.div>
    </div>
  );
}
