import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, BookOpen, Gamepad2, Trophy, Flame, Edit3, Save, X } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import questions from '../data/questions.json';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { progress, BADGES, getLevelProgress, getLeaderboard } = useProgress();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.full_name || '', kelas: user?.kelas || '' });
  const lvlProg = getLevelProgress();

  const leaderboard = getLeaderboard().slice(0, 5);
  const myRank = getLeaderboard().findIndex(u => u.id === user?.id) + 1;

  const saveProfile = () => {
    updateUser({ name: form.name, kelas: form.kelas });
    setEditing(false);
  };

  const earnedBadges = BADGES.filter(b => progress?.badges?.includes(b.id));
  const recentGames = progress?.gameHistory?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 w-0 overflow-y-auto min-h-screen">
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl font-black mb-6">
            Profil Saya
          </motion.h1>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1">
              <div className="card p-6 text-center mb-4">
                <div className="text-7xl mb-3">{user?.avatar}</div>
                {editing ? (
                  <div className="space-y-3 mb-3">
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field text-center text-sm" placeholder="Nama" />
                    <input value={form.kelas} onChange={e => setForm({ ...form, kelas: e.target.value })} className="input-field text-center text-sm" placeholder="Kelas" />
                    <div className="flex gap-2">
                      <button onClick={saveProfile} className="btn-primary flex-1 text-sm py-2 flex items-center justify-center gap-1"><Save className="w-4 h-4" /> Simpan</button>
                      <button onClick={() => setEditing(false)} className="btn-secondary py-2 px-3"><X className="w-4 h-4" /></button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="font-bold text-xl mb-0.5">{user?.full_name}</h2>
                    <p className="text-slate-500 text-sm capitalize mb-1">{user?.role}</p>
                    {user?.kelas && <p className="text-slate-500 text-sm mb-3">{user.kelas}</p>}
                    <p className="text-xs text-slate-400 mb-4 flex items-center justify-center gap-1">
                      <Mail className="w-3.5 h-3.5" /> {user?.email}
                    </p>
                    <button onClick={() => setEditing(true)} className="btn-secondary text-sm py-2 flex items-center gap-2 mx-auto">
                      <Edit3 className="w-4 h-4" /> Edit Profil
                    </button>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="card p-5">
                <h3 className="font-bold mb-3">📊 Statistik</h3>
                <div className="space-y-3">
                  {[
                    { icon: '⚡', label: 'Total XP', value: progress?.xp || 0 },
                    { icon: '🎯', label: 'Level', value: progress?.level || 1 },
                    { icon: '🎮', label: 'Game Dimainkan', value: progress?.gameHistory?.length || 0 },
                    { icon: '🔥', label: 'Streak Hari', value: progress?.streak || 0 },
                    { icon: '🏆', label: 'Badge Diraih', value: progress?.badges?.length || 0 },
                    { icon: '📚', label: 'Bab Selesai', value: progress?.completedChapters?.length || 0 },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between">
                      <span className="text-slate-500 text-sm">{s.icon} {s.label}</span>
                      <span className="font-bold">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-2 space-y-6">
              {/* XP progress */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold">Level {progress?.level || 1}</h3>
                  <span className="text-sm text-slate-500">{progress?.xp || 0} / {lvlProg.next} XP</span>
                </div>
                <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                    initial={{ width: 0 }} animate={{ width: `${lvlProg.pct}%` }} transition={{ duration: 1, delay: 0.5 }} />
                </div>
                <p className="text-xs text-slate-400 mt-2">Butuh {lvlProg.next - (progress?.xp || 0)} XP lagi untuk naik level</p>
              </motion.div>

              {/* Badges */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="card p-5">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Trophy className="w-4 h-4 text-amber-500" /> Badge ({earnedBadges.length}/{BADGES.length})</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {BADGES.map((b) => {
                    const earned = progress?.badges?.includes(b.id);
                    return (
                      <div key={b.id} className={`p-3 rounded-xl border text-center transition-all ${earned ? 'border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20' : 'border-slate-200 dark:border-slate-700 opacity-40'}`}>
                        <div className="text-3xl mb-1">{earned ? b.icon : '🔒'}</div>
                        <p className="text-xs font-bold">{b.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5 leading-tight">{b.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Leaderboard */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="card p-5">
                <h3 className="font-bold mb-4 flex items-center gap-2">🏆 Leaderboard</h3>
                <div className="space-y-2 mb-3">
                  {leaderboard.map((u, i) => (
                    <div key={u.id} className={`flex items-center gap-3 p-3 rounded-xl ${u.id === user?.id ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700' : 'bg-slate-50 dark:bg-slate-800'}`}>
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-black ${i === 0 ? 'bg-amber-400 text-white' : i === 1 ? 'bg-slate-400 text-white' : i === 2 ? 'bg-amber-700 text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'}`}>
                        {i + 1}
                      </span>
                      <span className="text-xl">{u.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{u.name} {u.id === user?.id && '(Saya)'}</p>
                        <p className="text-xs text-slate-400">{u.kelas || 'Siwa'}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-primary-600 dark:text-primary-400">{u.xp} XP</p>
                        <p className="text-xs text-slate-400">Lv.{u.level}</p>
                      </div>
                    </div>
                  ))}
                  {leaderboard.length === 0 && <p className="text-slate-400 text-sm text-center py-4">Belum ada data leaderboard</p>}
                </div>
                {myRank > 5 && <p className="text-sm text-center text-slate-500">Kamu berada di peringkat #{myRank}</p>}
              </motion.div>
            </div>
          </div>
      </main>
    </div>
  );
}
