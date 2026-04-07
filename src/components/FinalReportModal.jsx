import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';

export function FinalReportModal() {
  const { money, share, team, reputation, getValuation, triggerPrestige } = useGameStore();
  const valuation = getValuation();

  let persona = "The Balanced Founder";
  let endingText = "You established a balanced holding company.";
  
  if (money >= 80 && team < 40) {
    persona = "The Vulture Capitalist";
    endingText = "You cashed out ruthlessly and retired to a private island.";
  } else if (reputation >= 80) {
    persona = "The Visionary Leader";
    endingText = "You used your exit funds to establish a Global Education Foundation.";
  } else if (team >= 80) {
    persona = "The People's Champion";
    endingText = "You structured the exit to make all your early employees millionaires.";
  } else if (share >= 80) {
    persona = "The Control Freak";
    endingText = "You retained iron-clad control even post-IPO. The Board fears you.";
  }

  return (
    <div className="modal-overlay">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          background: 'var(--bg-forbes)',
          color: '#111',
          fontFamily: 'var(--font-serif)',
          padding: '3rem',
          maxWidth: '600px',
          width: '90%',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          border: '1px solid #ddd'
        }}
      >
        <div style={{ textAlign: 'center', borderBottom: '2px solid #111', paddingBottom: '1rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>
            Forbes
          </h2>
          <div style={{ fontStyle: 'italic', color: '#555' }}>Special IPO Exit Report</div>
        </div>

        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
            Founder Persona Analysis
          </div>
          <h3 style={{ fontSize: '2rem', margin: '0 0 1rem', color: '#222' }}>
            {persona}
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.5rem', borderLeft: '4px solid #111', paddingLeft: '1rem', textAlign: 'left' }}>
            {endingText}
          </p>

          <div style={{ fontSize: '1.2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
            Final Valuation: <strong><span style={{ color: '#4caf50' }}>${typeof valuation === 'number' ? Math.floor(valuation).toLocaleString() : 0}</span></strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexboxDirection: 'column', alignItems: 'center' }}>
          <button
            onClick={triggerPrestige}
            style={{
              background: '#111',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              width: '100%',
              cursor: 'pointer'
            }}
          >
            Claim Heritage & Start New Venture
          </button>
        </div>
      </motion.div>
    </div>
  );
}
