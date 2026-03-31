import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Users, ClipboardList, LogOut,
  Plus, Pencil, Trash2, Eye, BarChart3, ChevronRight, Monitor, TrendingUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import materials from '../data/materials.json';

function AdminSidebar({ active, setActive }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const links = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'materi', label: 'Kelola Materi', icon: BookOpen },
    { id: 'siswa', label: 'Data Siswa', icon: Users },
    { id: 'laporan', label: 'Hasil Belajar', icon: ClipboardList },
  ];
  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 bg-slate-900 text-white min-h-screen pt-16">
      <div className="p-5 border-b border-slate-700">
        <div className="flex items-center justify-center px-2 mb-8">
          <span className="font-display font-black text-3xl text-white tracking-tight">
            Drag<span className="text-primary-400">IT</span>
          </span>
        </div>
        <p className="text-slate-400 text-xs">Panel Guru</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {links.map(l => (
          <button key={l.id} onClick={() => setActive(l.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active === l.id ? 'bg-primary-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <l.icon className="w-5 h-5 shrink-0" />{l.label}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-slate-700 space-y-1">
        <button onClick={toggle} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white text-sm font-medium transition-all">
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />} {isDark ? 'Mode Terang' : 'Mode Gelap'}
        </button>
        <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-900/30 text-sm font-medium transition-all">
          <LogOut className="w-5 h-5" /> Keluar
        </button>
      </div>
    </aside>
  );
}

function DashboardTab() {
  const { getAllUsers } = useAuth();
  const users = getAllUsers().filter(u => u.role === 'siswa');
  const totalProgress = users.reduce((sum, u) => {
    const p = JSON.parse(localStorage.getItem(`dragit_progress_${u.id}`) || '{}');
    return sum + (p.xp || 0);
  }, 0);
  return (
    <div>
      <h2 className="font-display text-2xl font-black mb-6">Dashboard Guru</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Siswa', value: users.length, icon: '👥', color: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Total Bab', value: materials.chapters.length, icon: '📚', color: 'bg-violet-50 dark:bg-violet-900/20' },
          { label: 'Level Game', value: 4, icon: '🎮', color: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Total XP Siswa', value: totalProgress, icon: '⚡', color: 'bg-amber-50 dark:bg-amber-900/20' },
        ].map((s) => (
          <div key={s.label} className={`card p-4 ${s.color}`}>
            <div className="text-2xl mb-2">{s.icon}</div>
            <p className="font-display font-black text-2xl">{s.value}</p>
            <p className="text-slate-500 text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="card p-5">
        <h3 className="font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary-500" /> Overview Materi</h3>
        <div className="space-y-2">
          {materials.chapters.map((ch) => (
            <div key={ch.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg flex items-center justify-center font-bold text-sm">{ch.id}</span>
                <div>
                  <p className="font-medium text-sm">{ch.title}</p>
                  <p className="text-xs text-slate-400">{ch.topics.length} topik</p>
                </div>
              </div>
              <span className="text-xs text-slate-400">{ch.topics.length} topik</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MateriTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-black">Kelola Materi</h2>
        <button className="btn-primary flex items-center gap-2 text-sm py-2"><Plus className="w-4 h-4" /> Tambah Materi</button>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Bab</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Judul</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Topik</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {materials.chapters.map(ch => (
              <tr key={ch.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                <td className="px-4 py-3 font-bold text-primary-600">{ch.id}</td>
                <td className="px-4 py-3 font-medium text-sm">{ch.title}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{ch.topics.length} topik</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link to={`/dashboard/materi/${ch.slug}`} className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500 transition-all"><Eye className="w-4 h-4" /></Link>
                    <button className="p-1.5 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 text-amber-500 transition-all"><Pencil className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-danger-50 dark:hover:bg-danger-900/20 text-danger-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SiswaTab() {
  const { getAllUsers } = useAuth();
  const students = getAllUsers().filter(u => u.role === 'siswa');
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-black">Data Siswa</h2>
        <span className="badge bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">{students.length} siswa</span>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Siswa</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Kelas</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">XP</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Level</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Game</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {students.map(s => {
              const p = JSON.parse(localStorage.getItem(`dragit_progress_${s.id}`) || '{}');
              return (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{s.avatar}</span>
                      <div>
                        <p className="font-medium text-sm">{s.name}</p>
                        <p className="text-xs text-slate-400">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">{s.kelas || '-'}</td>
                  <td className="px-4 py-3 font-bold text-primary-600">{p.xp || 0}</td>
                  <td className="px-4 py-3"><span className="badge bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300">Lv.{p.level || 1}</span></td>
                  <td className="px-4 py-3 text-sm text-slate-500">{p.gameHistory?.length || 0}x</td>
                </tr>
              );
            })}
            {students.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400 text-sm">Belum ada siswa terdaftar</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LaporanTab() {
  const { getAllUsers } = useAuth();
  const students = getAllUsers().filter(u => u.role === 'siswa');
  const allResults = students.flatMap(s => {
    const p = JSON.parse(localStorage.getItem(`dragit_progress_${s.id}`) || '{}');
    return (p.gameHistory || []).map(g => ({ ...g, student: s }));
  }).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 20);

  return (
    <div>
      <h2 className="font-display text-2xl font-black mb-6">Hasil Belajar</h2>
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Siswa</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Level</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Skor</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Waktu</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Tanggal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {allResults.map((r, i) => {
              const pct = Math.round((r.score / (r.total * 10)) * 100);
              return (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span>{r.student.avatar}</span>
                      <span className="font-medium text-sm">{r.student.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">Level {r.levelId}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${pct >= 75 ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400' : 'bg-danger-100 dark:bg-danger-900/30 text-danger-600 dark:text-danger-400'}`}>
                      {r.score} ({pct}%)
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">{r.timeTaken}s</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{new Date(r.date).toLocaleDateString('id-ID')}</td>
                </tr>
              );
            })}
            {allResults.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400 text-sm">Belum ada data hasil belajar</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { user } = useAuth();
  const [active, setActive] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Navbar - simple */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-700 h-16 flex items-center px-6 justify-between">
        <div className="flex items-center gap-2">
          <span className="font-display font-black text-2xl text-white tracking-tight">
            Drag<span className="text-primary-400">IT</span>
          </span>
          <span className="badge bg-primary-700 text-primary-200 text-xs ml-2">Guru</span>
        </div>
        <span className="text-slate-300 text-sm">{user?.full_name}</span>
      </nav>

      <div className="flex pt-16">
        <AdminSidebar active={active} setActive={setActive} />
        <main className="flex-1 p-6 md:p-8">
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {active === 'dashboard' && <DashboardTab />}
            {active === 'materi' && <MateriTab />}
            {active === 'siswa' && <SiswaTab />}
            {active === 'laporan' && <LaporanTab />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
