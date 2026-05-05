import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Gamepad2, Trophy, Zap, ChevronRight, Flame, Clock, Target } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import materials from '../data/materials.json';
import questions from '../data/questions.json';

function StatCard({ icon: Icon, value, label, color, delay }) {
  const colorMap = {
    blue: 'from-blue-500 to-blue-600',
    violet: 'from-violet-500 to-violet-600',
    amber: 'from-amber-500 to-amber-600',
    emerald: 'from-emerald-500 to-emerald-600',
  };
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="card-hover p-4 sm:p-5 flex flex-col justify-between">
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center mb-3 shadow-inner`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="font-display font-black text-3xl">{value}</p>
        <p className="text-slate-500 font-bold text-sm tracking-tight">{label}</p>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const { progress, getLevelProgress, BADGES } = useProgress();
  const lvlProg = getLevelProgress();

  const completedChapters = progress?.completedChapters?.length || 0;
  const completedLevels = progress?.completedLevels?.length || 0;
  const recentGames = [...(progress?.gameHistory || [])]
    .sort((a, b) => new Date(b.date || b.timestamp) - new Date(a.date || a.timestamp))
    .slice(0, 4);

  const earnedBadges = BADGES.filter(b => progress?.badges?.includes(b.id));

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Selamat Pagi' : hour < 17 ? 'Selamat Siang' : 'Selamat Malam';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 max-w-6xl w-0 overflow-y-auto min-h-screen">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <p className="text-slate-500 text-sm mb-1">{greeting}! 👋</p>
            <h1 className="font-display text-3xl font-black">{user?.full_name}</h1>
            {user?.kelas && <p className="text-slate-500 text-sm mt-1">{user.kelas}</p>}
          </motion.div>

          {/* XP + Level banner */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="card p-6 md:p-8 mb-8 bg-gradient-to-r from-primary-500 to-primary-700 text-white border-primary-800 shadow-[0_8px_0_theme(colors.primary.800)] dark:border-primary-900 dark:shadow-[0_8px_0_theme(colors.primary.900)]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-primary-100 text-sm sm:text-base font-bold uppercase tracking-wider mb-1">Level Karakter</p>
                <p className="font-display font-black text-5xl flex items-center gap-2 drop-shadow-md">
                  {progress?.level || 1} <span className="text-4xl">⚡</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-primary-100 text-sm sm:text-base font-bold uppercase tracking-wider mb-1">Total XP</p>
                <p className="font-display font-black text-4xl drop-shadow-md">{progress?.xp || 0}</p>
              </div>
            </div>
            
            {/* Chunky Video Game Progress Bar */}
            <div className="h-6 bg-black/20 rounded-full overflow-hidden border-4 border-black/10 relative shadow-inner">
              <motion.div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full border-r-4 border-emerald-500 relative overflow-hidden"
                initial={{ width: 0 }} animate={{ width: `${lvlProg.pct}%` }}
                transition={{ duration: 1, delay: 0.5 }}>
                {/* Shine effect inside the bar */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/30 rounded-full" />
              </motion.div>
            </div>
            <div className="flex justify-between text-sm text-primary-100 font-bold mt-2 px-1">
              <span>{lvlProg.current} XP (Sekarang)</span>
              <span>{lvlProg.next} XP (Naik Level)</span>
            </div>
          </motion.div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard icon={BookOpen} value={completedChapters} label="Materi Selesai" color="blue" delay={0.15} />
            <StatCard icon={Gamepad2} value={completedLevels} label="Level Selesai" color="violet" delay={0.2} />
            <StatCard icon={Trophy} value={earnedBadges.length} label="Badge Diraih" color="amber" delay={0.25} />
            <StatCard icon={Flame} value={progress?.streak || 0} label="Hari Berturut" color="emerald" delay={0.3} />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Quick actions */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} className="card p-5">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-primary-500" /> Aksi Cepat</h2>
              <div className="space-y-3">
                <Link to="/dashboard/materi" className="flex items-center justify-between p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-700 border-b-4 hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-600 active:translate-y-0.5 active:border-b-2 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white dark:bg-blue-800 rounded-xl flex items-center justify-center text-2xl shadow-sm border-2 border-blue-100 dark:border-blue-600">📚</div>
                    <div>
                      <p className="font-black text-base text-blue-900 dark:text-blue-100">Lanjut Belajar</p>
                      <p className="text-sm font-semibold text-blue-600/80 dark:text-blue-400">Bab {completedChapters + 1} menunggumu</p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </Link>
                <Link to="/dashboard/game" className="flex items-center justify-between p-4 rounded-2xl bg-violet-50 dark:bg-violet-900/30 border-2 border-violet-200 dark:border-violet-700 border-b-4 hover:-translate-y-1 hover:border-violet-300 dark:hover:border-violet-600 active:translate-y-0.5 active:border-b-2 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white dark:bg-violet-800 rounded-xl flex items-center justify-center text-2xl shadow-sm border-2 border-violet-100 dark:border-violet-600">🎮</div>
                    <div>
                      <p className="font-black text-base text-violet-900 dark:text-violet-100">Main Game</p>
                      <p className="text-sm font-semibold text-violet-600/80 dark:text-violet-400">Level {completedLevels + 1} tersedia</p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-violet-400 group-hover:text-violet-600 group-hover:translate-x-1 transition-all" />
                </Link>
                <Link to="/dashboard/evaluasi" className="flex items-center justify-between p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/30 border-2 border-amber-200 dark:border-amber-700 border-b-4 hover:-translate-y-1 hover:border-amber-300 dark:hover:border-amber-600 active:translate-y-0.5 active:border-b-2 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white dark:bg-amber-800 rounded-xl flex items-center justify-center text-2xl shadow-sm border-2 border-amber-100 dark:border-amber-600">📝</div>
                    <div>
                      <p className="font-black text-base text-amber-900 dark:text-amber-100">Evaluasi</p>
                      <p className="text-sm font-semibold text-amber-600/80 dark:text-amber-400">Uji pemahamanmu</p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-amber-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </motion.div>

            {/* Progress materi */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="card p-5">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary-500" /> Progress Materi</h2>
              <div className="space-y-3">
                {materials.chapters.map((ch) => {
                  const done = progress?.completedChapters?.includes(ch.id.toString());
                  const colorMap = { blue: 'bg-blue-500', violet: 'bg-violet-500', emerald: 'bg-emerald-500', amber: 'bg-amber-500', rose: 'bg-rose-500' };
                  return (
                    <Link key={ch.id} to={`/dashboard/materi/${ch.slug}`} className={`flex items-center gap-4 p-3 rounded-2xl border-2 border-b-4 hover:-translate-y-1 active:translate-y-0.5 active:border-b-2 transition-all ${done ? 'bg-success-50 border-success-200 dark:bg-success-900/20 dark:border-success-700' : 'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700'}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-base font-black shrink-0 shadow-inner ${done ? 'bg-success-500' : colorMap[ch.color]}`}>
                        {done ? '⭐' : ch.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-base font-black truncate ${done ? 'text-success-800 dark:text-success-300' : 'text-slate-800 dark:text-slate-200'}`}>{ch.title}</p>
                        <p className="text-sm font-bold text-slate-400">{ch.topics.length} Topik</p>
                      </div>
                      {done && <span className="text-success-600 bg-success-100 px-3 py-1 rounded-lg text-xs font-black dark:bg-success-900/50 dark:text-success-400">Tuntas!</span>}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Badges */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="card p-5 mb-6">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Trophy className="w-5 h-5 text-amber-500" /> Badge Pencapaian</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {BADGES.map((badge) => {
                const earned = progress?.badges?.includes(badge.id);
                return (
                  <div key={badge.id} className={`p-3 rounded-xl text-center transition-all ${earned ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700' : 'bg-slate-50 dark:bg-slate-800 opacity-50'}`}>
                    <div className="text-3xl mb-1">{earned ? badge.icon : '🔒'}</div>
                    <p className="text-xs font-semibold">{badge.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{badge.desc.substring(0, 30)}...</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent games */}
          {recentGames.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card p-5">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-primary-500" /> Riwayat Game</h2>
              <div className="space-y-2">
                {recentGames.map((g, i) => {
                  const level = questions.levels.find(l => l.id === g.levelId);
                  const pct = Math.round((g.score / (g.total * 10)) * 100);
                  return (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🎮</span>
                        <div>
                          <p className="text-sm font-medium">{level?.title || `Level ${g.levelId}`}</p>
                          <p className="text-xs text-slate-400">{new Date(g.date).toLocaleDateString('id-ID')}</p>
                        </div>
                      </div>
                      <div className={`badge ${pct >= 75 ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400' : 'bg-danger-100 dark:bg-danger-900/30 text-danger-700 dark:text-danger-400'}`}>
                        {g.score} / {g.total * 10}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
      </main>
    </div>
  );
}
