import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProgressContext = createContext(null);
const API_URL = 'https://dragit-dogl.onrender.com/api';

const BADGES = [
  { id: 'first-game', name: 'Pemula', desc: 'Selesaikan game pertamamu', icon: '🎮', xpNeeded: 0 },
  { id: 'ram-expert', name: 'Ahli RAM', desc: 'Jawab semua soal RAM dengan benar', icon: '🔋', xpNeeded: 100 },
  { id: 'cpu-master', name: 'Master Processor', desc: 'Capai skor sempurna di level CPU', icon: '🧠', xpNeeded: 200 },
  { id: 'mb-wizard', name: 'Master Motherboard', desc: 'Kuasai semua slot motherboard', icon: '🖥️', xpNeeded: 350 },
  { id: 'technician', name: 'Teknisi Komputer', desc: 'Selesaikan semua level dengan skor ≥ 80', icon: '🔧', xpNeeded: 500 },
  { id: 'speed-demon', name: 'Speed Demon', desc: 'Selesaikan game dalam setengah waktu', icon: '⚡', xpNeeded: 150 },
  { id: 'perfectionist', name: 'Perfeksionis', desc: 'Raih skor 100 di setiap level', icon: '⭐', xpNeeded: 600 },
  { id: 'scholar', name: 'Pelajar Teladan', desc: 'Baca semua materi pembelajaran', icon: '📚', xpNeeded: 300 },
];

const LEVEL_THRESHOLDS = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200];

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchProgress = async () => {
    if (!user) return setProgress(null);
    try {
      const res = await fetch(`${API_URL}/progress/${user.id}`);
      if (res.ok) {
        const data = await res.json();
        const initial = {
          xp: data.xp,
          level: data.level,
          completedChapters: data.completedChapters || [],
          completedLevels: data.completedLevels || [],
          gameHistory: data.gameHistory || [],
          badges: [], // computed locally for now
        };
        // Update local badges based on XP and games
        const earnedBadges = [];
        BADGES.forEach((b) => {
          if (initial.xp >= b.xpNeeded && b.xpNeeded > 0) earnedBadges.push(b.id);
        });
        if (initial.gameHistory.length > 0) earnedBadges.push('first-game');
        
        initial.badges = earnedBadges;
        setProgress(initial);
      }
    } catch (err) {
      console.error('Failed to fetch progress:', err);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`${API_URL}/progress/leaderboard/all`);
      if (res.ok) {
        const data = await res.json();
        setLeaderboard(data);
      }
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    }
  };

  useEffect(() => {
    fetchProgress();
    fetchLeaderboard();
  }, [user]);

  const addXP = async (amount) => {
    if (!progress || !user) return;
    try {
      // Optimistic Update
      const newXP = progress.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      setProgress({ ...progress, xp: newXP, level: newLevel });
      
      // Send to server
      await fetch(`${API_URL}/progress/${user.id}/xp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ amount })
      });
      fetchLeaderboard(); // refresh leaderboard
    } catch (err) {
      console.error('Failed to add XP', err);
    }
  };

  const completeChapter = async (chapterId) => {
    if (!progress || !user || progress.completedChapters.includes(chapterId)) return;
    try {
      // Optimistic
      setProgress({ ...progress, completedChapters: [...progress.completedChapters, chapterId] });
      addXP(30);

      await fetch(`${API_URL}/progress/${user.id}/complete-chapter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ chapterId })
      });
    } catch (err) {
      console.error('Failed to mark chapter complete', err);
    }
  };

  const recordGameResult = async (levelId, score, timeTaken, total) => {
    if (!progress || !user) return;
    try {
      // Optimistic DB update
      const historyEntry = { levelId, score, timeTaken, totalItems: total, timestamp: new Date().toISOString() };
      const completedLevels = progress.completedLevels.includes(levelId) ? progress.completedLevels : [...progress.completedLevels, levelId];
      const badges = progress.badges.includes('first-game') ? progress.badges : ['first-game', ...progress.badges];
      
      setProgress({
        ...progress, 
        gameHistory: [historyEntry, ...progress.gameHistory],
        completedLevels,
        badges
      });

      await fetch(`${API_URL}/progress/${user.id}/game-result`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ levelId, score, timeTaken, totalItems: total })
      });
      fetchLeaderboard(); // refresh leaderboard
    } catch (err) {
      console.error('Failed to record game', err);
    }
  };

  const getLevelProgress = () => {
    if (!progress) return { current: 0, next: 100, pct: 0 };
    const maxLevel = LEVEL_THRESHOLDS.length - 1;
    const currentLevelIdx = Math.min(progress.level - 1, maxLevel);
    const nextLevelIdx = Math.min(progress.level, maxLevel);

    const currentReq = LEVEL_THRESHOLDS[currentLevelIdx] || 0;
    const nextReq = LEVEL_THRESHOLDS[nextLevelIdx] || LEVEL_THRESHOLDS[maxLevel] + 1000;
    
    // Fall back to simple +100 per level if XP exceeds defined thresholds
    const current = currentReq > 0 ? currentReq : (progress.level - 1) * 100;
    const next = nextReq > 0 ? nextReq : progress.level * 100;

    const pct = Math.min(((progress.xp - current) / (next - current)) * 100, 100);
    return { current, next, pct: isNaN(pct) || pct < 0 ? 0 : pct };
  };

  const getLeaderboard = () => {
    return leaderboard;
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      addXP,
      completeChapter,
      recordGameResult,
      getLevelProgress,
      getLeaderboard,
      BADGES,
      LEVEL_THRESHOLDS,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
};
