import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';

export function DecisionCard() {
  const scenario = useGameStore((state) => state.currentScenario);
  const makeDecision = useGameStore((state) => state.makeDecision);
  const turn = useGameStore((state) => state.turn);

  if (!scenario) return null;

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto', zIndex: 5 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={turn}
          initial={{ x: 100, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -100, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle neon accent line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #81A6C6, #4caf50, #ff9800, #9c27b0)' }} />

          {/* Advisor Hint */}
          {scenario.advisor && (
            <div style={{ background: '#222', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #81A6C6', color: '#ccc', fontStyle: 'italic', fontSize: '0.9rem' }}>
              "{scenario.advisor}"
            </div>
          )}

          {/* Main Text */}
          <div style={{ fontSize: '1.25rem', lineHeight: 1.6, color: '#fff', fontWeight: 500, minHeight: '80px', display: 'flex', alignItems: 'center' }}>
            {scenario.text}
          </div>

          {/* Choices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <motion.button
              onClick={() => makeDecision(scenario.choiceA.effects)}
              whileHover={{ scale: 1.02, background: '#2a2a2a' }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: '#222',
                border: '1px solid #444',
                padding: '1.2rem',
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: '#fff',
                cursor: 'pointer',
                transition: 'border-color 0.2s'
              }}
              onHoverStart={(e) => e.target.style.borderColor = '#81A6C6'}
              onHoverEnd={(e) => e.target.style.borderColor = '#444'}
            >
              {scenario.choiceA.label}
            </motion.button>
            
            <motion.button
              onClick={() => makeDecision(scenario.choiceB.effects)}
              whileHover={{ scale: 1.02, background: '#2a2a2a' }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: '#222',
                border: '1px solid #444',
                padding: '1.2rem',
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: '#fff',
                cursor: 'pointer',
                transition: 'border-color 0.2s'
              }}
              onHoverStart={(e) => e.target.style.borderColor = '#81A6C6'}
              onHoverEnd={(e) => e.target.style.borderColor = '#444'}
            >
              {scenario.choiceB.label}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
