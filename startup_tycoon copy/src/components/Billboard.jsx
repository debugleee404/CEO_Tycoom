import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { RollingNumber } from './RollingNumber';
import { Home } from 'lucide-react';

export function Billboard() {
  const valuation = useGameStore((state) => state.getValuation());
  const phase = useGameStore((state) => state.getPhase());
  const turn = useGameStore((state) => state.turn);
  const goHome = useGameStore((state) => state.goHome);
  const controls = useAnimation();

  useEffect(() => {
    // Shake effect on significant valuation increases could be added,
    // but right now just a soft bounce when valuation updates.
    controls.start({
      scale: [1, 1.05, 1],
      textShadow: [
        '0 0 10px rgba(129, 166, 198, 0.4)', 
        '0 0 30px rgba(129, 166, 198, 1)', 
        '0 0 10px rgba(129, 166, 198, 0.4)'
      ],
      transition: { duration: 0.5 }
    });
  }, [valuation, controls]);

  return (
    <header style={{
      background: '#090909',
      padding: '1.5rem',
      borderBottom: '2px solid #222',
      textAlign: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      boxShadow: '0 5px 20px rgba(0,0,0,0.5)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'left', flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={goHome}
            style={{
              background: '#222', border: '1px solid #444', borderRadius: '50%', width: '40px', height: '40px',
              display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: '#888'
            }}
            title="Return to Main Menu"
          >
            <Home size={20} />
          </button>
          <div>
            <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Unicorn Founder
            </div>
            <motion.h1 
              animate={controls}
              className="neon-text" 
              style={{ margin: 0, fontSize: '3rem', fontWeight: 900, fontFamily: 'monospace' }}
            >
              <RollingNumber value={valuation} prefix="$" />
            </motion.h1>
          </div>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>
            Phase {phase} <span style={{ color: '#555', fontSize: '1rem', fontWeight: 'normal' }}>/ 5</span>
          </div>
          <div style={{ color: '#aaa', marginTop: '4px', fontFamily: 'monospace' }}>
            Turn {turn} / 50
          </div>
        </div>
      </div>
    </header>
  );
}
