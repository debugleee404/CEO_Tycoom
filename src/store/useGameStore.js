import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getScenarioForPhase } from '../constants/ScenarioData';

const BASE_STATS = { money: 50, share: 50, team: 50, reputation: 50 };

export const useGameStore = create(
  persist(
    (set, get) => ({
      // Stats
      ...BASE_STATS,
      
      // Progression
      turn: 1,
      heritagePoints: 0,
      playedScenarios: [],
      
      // Game State
      status: 'menu', // 'menu', 'playing', 'bankrupt', 'exit'
      bankruptcyReason: null,

      currentScenario: null,

      initGame: (difficulty = 'normal') => {
        const state = get();
        
        // Base money by difficulty
        let baseMoney = 50;
        if (difficulty === 'easy') baseMoney = 80;
        if (difficulty === 'hard') baseMoney = 20;

        const startStats = {
          money: Math.min(100, baseMoney + state.heritagePoints * 2), // Buff starts
          share: 50,
          team: Math.min(100, 50 + state.heritagePoints),
          reputation: 50
        };
        
        const firstScenario = getScenarioForPhase(1, []);
        
        set({
          ...startStats,
          turn: 1,
          playedScenarios: [firstScenario.id],
          status: 'playing',
          bankruptcyReason: null,
          currentScenario: firstScenario
        });
      },

      getPhase: () => {
        const t = get().turn;
        return Math.min(5, Math.ceil(t / 10) || 1); // Turn 1-10: Phase 1. 
      },

      getValuation: () => {
        const { money, share, reputation } = get();
        // Phase 1: 100, Phase 2: 1000, Phase 3: 10k, Phase 4: 100k, Phase 5: 1M
        const phaseMult = Math.pow(10, get().getPhase() + 1); 
        return ((money * 1.2) + (share * 1.5) + (reputation * 2.0)) * phaseMult;
      },

      makeDecision: (effects) => {
        const state = get();
        if (state.status !== 'playing') return;

        // Apply Decision Effects
        let nM = state.money + effects.money;
        let nS = state.share + effects.share;
        let nT = state.team + effects.team;
        let nR = state.reputation + effects.rep;
        
        // Burn Rate logic: Fixed structural cost proportional to phase and team size
        const phase = state.getPhase();
        const burnRate = 2 + (phase * 1) + (nT * 0.05); // team of 100 adds 5 drain, phase 5 adds 5. Max ~12 per turn
        
        nM -= burnRate;

        // Cap stats at 100
        nM = Math.min(100, Math.floor(nM));
        nS = Math.min(100, Math.floor(nS));
        nT = Math.min(100, Math.floor(nT));
        nR = Math.min(100, Math.floor(nR));

        // Bankruptcy Check
        let bReason = null;
        if (nM <= 0) bReason = "Ran out of Runway (Money 0%)";
        if (nS <= 0) bReason = "Hostile Takeover (Share 0%)";
        if (nT <= 0) bReason = "Mass Exodus (Team 0%)";
        if (nR <= 0) bReason = "Public Disgrace (Reputation 0%)";

        const nextTurn = state.turn + 1;
        
        if (bReason) {
          set({ money: nM, share: nS, team: nT, reputation: nR, turn: nextTurn, status: 'bankrupt', bankruptcyReason: bReason });
          return;
        }

        if (nextTurn > 50) {
           // Successfully reached Exit
           set({ money: nM, share: nS, team: nT, reputation: nR, turn: nextTurn, status: 'exit' });
           return;
        }

        // Draw next scenario
        const newPhase = Math.min(5, Math.ceil(nextTurn / 10));
        const nextScenario = getScenarioForPhase(newPhase, state.playedScenarios);

        set({
          money: nM, share: nS, team: nT, reputation: nR, 
          turn: nextTurn, 
          playedScenarios: [...state.playedScenarios, nextScenario.id],
          currentScenario: nextScenario
        });
      },

      triggerPrestige: () => {
        // Awards points based on final Phase survived
        const finalPhase = get().getPhase();
        set(state => ({
          heritagePoints: state.heritagePoints + finalPhase,
          status: 'menu'
        }));
      },

      goHome: () => {
        set({ status: 'menu' });
      },

      resetGame: () => {
        set({ 
          ...BASE_STATS, 
          turn: 1, 
          heritagePoints: 0, 
          playedScenarios: [], 
          status: 'menu', 
          bankruptcyReason: null, 
          currentScenario: null 
        });
      }
    }),
    {
      name: 'startup-decision-tycoon',
      partialize: (state) => ({ 
        heritagePoints: state.heritagePoints,
        money: state.money, share: state.share, team: state.team, reputation: state.reputation,
        turn: state.turn, playedScenarios: state.playedScenarios,
        status: state.status, bankruptcyReason: state.bankruptcyReason,
        currentScenario: state.currentScenario
      })
    }
  )
);
