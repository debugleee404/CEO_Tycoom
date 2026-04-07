import { useEffect } from 'react';
import { Billboard } from './Billboard';
import { StatBars } from './StatBars';
import { DecisionCard } from './DecisionCard';
import { VisualEvolution } from './VisualEvolution';
import { GameOverModal } from './GameOverModal';
import { FinalReportModal } from './FinalReportModal';
import { MainMenu } from './MainMenu';
import { useGameStore } from '../store/useGameStore';

export function Layout() {
  const status = useGameStore((state) => state.status);
  const initGame = useGameStore((state) => state.initGame);
  const currentScenario = useGameStore((state) => state.currentScenario);

  useEffect(() => {
    // We don't auto-init game anymore unless desired, but we can leave it handled by MainMenu now.
  }, []);

  if (status === 'menu') {
    return <MainMenu />;
  }

  return (
    <div className="app-container" style={{ position: 'relative', overflow: 'hidden' }}>
      <VisualEvolution />

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Billboard />
        <StatBars />
        
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          {status === 'playing' && <DecisionCard />}
        </main>
      </div>

      {status === 'bankrupt' && <GameOverModal />}
      {status === 'exit' && <FinalReportModal />}
    </div>
  );
}
