import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';

const StatBar = ({ label, value, color }) => {
  const prevValue = useRef(value);
  const flashVariant = {
    flashUp: { background: ['#222', '#4caf50', '#222'], transition: { duration: 0.5 } },
    flashDown: { background: ['#222', '#ff4444', '#222'], transition: { duration: 0.5 } },
    idle: { background: '#222' }
  };

  let animState = 'idle';
  if (value > prevValue.current) animState = 'flashUp';
  else if (value < prevValue.current) animState = 'flashDown';

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#ccc', fontWeight: 'bold' }}>
        <span>{label}</span>
        <span>{label === 'Money' ? `$${(value * 100).toLocaleString()}` : `${value}%`}</span>
      </div>
      <motion.div 
        variants={flashVariant}
        animate={animState}
        style={{ height: '12px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #333' }}
      >
        <motion.div 
          animate={{ width: `${value}%` }} 
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          style={{ height: '100%', background: color }}
        />
      </motion.div>
    </div>
  );
};

export function StatBars() {
  const { money, share, team, reputation } = useGameStore();

  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '1rem 2rem', background: '#151515', borderBottom: '1px solid #333' }}>
      <StatBar label="Money" value={money} color="#4caf50" />
      <StatBar label="Share" value={share} color="#2196f3" />
      <StatBar label="Team" value={team} color="#ff9800" />
      <StatBar label="Reputation" value={reputation} color="#9c27b0" />
    </div>
  );
}
