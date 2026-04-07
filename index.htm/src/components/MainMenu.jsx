import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';

export function MainMenu() {
  const [showLevels, setShowLevels] = useState(false);
  const initGame = useGameStore((state) => state.initGame);
  const resetGame = useGameStore((state) => state.resetGame);
  const heritagePoints = useGameStore((state) => state.heritagePoints);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'radial-gradient(circle, #2a2a2a 0%, #050505 100%)',
      color: '#fff',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="neon-text" style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '4px' }}>
          Unicorn Founder
        </h1>
        <p style={{ color: '#888', fontSize: '1.2rem', marginBottom: '3rem', fontStyle: 'italic' }}>
          A Choice-Based Strategy Simulation
        </p>

        {heritagePoints > 0 && (
          <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(255,215,0,0.1)', border: '1px solid gold', borderRadius: '8px', color: 'gold' }}>
            <strong>Legacy Active:</strong> {heritagePoints} Heritage Points
            <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>+{(heritagePoints * 2)}% Starting Money & +{heritagePoints}% Starting Team</div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '350px', margin: '0 auto' }}>
          
          <AnimatePresence mode="wait">
            {!showLevels ? (
              <motion.button
                key="start-btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLevels(true)}
                style={{
                  padding: '1rem', fontSize: '1.2rem', fontWeight: 800, background: '#81A6C6', color: '#111',
                  borderRadius: '8px', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(129, 166, 198, 0.4)'
                }}
              >
                Start New Venture
              </motion.button>
            ) : (
              <motion.div
                key="levels"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}
              >
                <div style={{ color: '#81A6C6', fontWeight: 'bold' }}>Select Initial Capital:</div>
                <button
                  onClick={() => initGame('easy')}
                  style={{ padding: '0.8rem', background: '#222', border: '1px solid #4caf50', borderRadius: '8px', color: '#4caf50', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Silver Spoon (Easy - 80% Money)
                </button>
                <button
                  onClick={() => initGame('normal')}
                  style={{ padding: '0.8rem', background: '#222', border: '1px solid #81A6C6', borderRadius: '8px', color: '#81A6C6', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Average Founder (Normal - 50% Money)
                </button>
                <button
                  onClick={() => initGame('hard')}
                  style={{ padding: '0.8rem', background: '#222', border: '1px solid #ff4444', borderRadius: '8px', color: '#ff4444', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Bootstrapper (Hard - 20% Money)
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (window.confirm("Are you sure you want to reset all game data, including Heritage Points?")) {
                resetGame();
              }
            }}
            style={{
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              background: 'transparent',
              color: '#ff4444',
              borderRadius: '8px',
              border: '1px solid #ff4444',
              cursor: 'pointer'
            }}
          >
            Reset All Data
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
