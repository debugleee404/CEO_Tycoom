import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { Home, Coffee, Users, Building2, Globe2 } from 'lucide-react';

const PHASE_VISUALS = {
  1: { icon: Home, title: "Garage Phase", bg: "radial-gradient(circle, #2a2a2a 0%, #111 70%)" },
  2: { icon: Coffee, title: "Co-working Space", bg: "radial-gradient(circle, #1a2a3a 0%, #111 70%)" },
  3: { icon: Users, title: "Private Office", bg: "radial-gradient(circle, #2a1a3a 0%, #111 70%)" },
  4: { icon: Building2, title: "Corporate HQ", bg: "radial-gradient(circle, #3a2a1a 0%, #111 70%)" },
  5: { icon: Globe2, title: "Global Enterprise", bg: "radial-gradient(circle, #1a3a2a 0%, #111 70%)" },
};

export function VisualEvolution() {
  const phase = useGameStore((state) => state.getPhase());
  const visual = PHASE_VISUALS[phase] || PHASE_VISUALS[1];
  const Icon = visual.icon;

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      background: visual.bg,
      zIndex: 1, // Behind the decision card
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '3rem',
      opacity: 0.8,
      transition: 'background 1s ease'
    }}>
      <motion.div
        key={phase}
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{
          width: '120px', height: '120px',
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.5)',
          border: '2px solid #81A6C6',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          boxShadow: '0 0 20px rgba(129, 166, 198, 0.3)',
          marginBottom: '1rem'
        }}>
          <Icon size={64} className="neon-text" />
        </div>
        <div style={{ color: '#aaa', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
          {visual.title}
        </div>
      </motion.div>
    </div>
  );
}
