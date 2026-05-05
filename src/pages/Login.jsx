import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, LogIn, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      const route = user.role === 'admin' ? '/admin' : '/dashboard';
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate(route), 2800);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const demoLogin = async (role) => {
    setError('');
    setLoading(true);
    try {
      const creds = role === 'admin'
        ? { email: 'admin@dragit.id', password: 'admin123' }
        : { email: 'andi@dragit.id', password: 'siswa123' };
      setForm(creds);
      const user = await login(creds.email, creds.password);
      const route = user.role === 'admin' ? '/admin' : '/dashboard';
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate(route), 2800);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 relative overflow-hidden">

      {/* ── Success overlay ── */}
      <AnimatePresence>
        {success && (
          <motion.div
            key="success-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0f172a 100%)' }}
          >
            {/* Expanding pulse rings */}
            <motion.div
              initial={{ scale: 0, opacity: 0.7 }}
              animate={{ scale: 9, opacity: 0 }}
              transition={{ duration: 2.6, ease: 'easeOut' }}
              className="absolute w-36 h-36 rounded-full border-4 border-primary-300"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 2.6, delay: 0.25, ease: 'easeOut' }}
              className="absolute w-36 h-36 rounded-full border-2 border-blue-400"
            />

            {/* Check icon */}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
              className="mb-6"
            >
              <CheckCircle2 className="w-24 h-24 text-emerald-400 drop-shadow-2xl" strokeWidth={1.5} />
            </motion.div>

            {/* Brand */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-display text-5xl font-black text-white mb-2"
            >
              Drag<span className="text-accent-400">IT</span>
            </motion.h2>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-primary-200 text-lg font-medium"
            >
              Login berhasil! Memuat dashboard...
            </motion.p>

            {/* Progress bar */}
            <div className="mt-8 w-52 h-1.5 rounded-full bg-white/20 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, delay: 0.3, ease: 'linear' }}
                className="h-full rounded-full bg-emerald-400"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative text-white text-center max-w-sm">
          <div className="text-7xl mb-6 animate-float">🖥️</div>
          <h2 className="font-display text-4xl font-black mb-4">Selamat Datang di DragIT!</h2>
          <p className="text-primary-200 leading-relaxed">Platform pembelajaran komponen komputer terbaik untuk siswa SMK. Belajar sambil bermain!</p>
          <div className="mt-8 flex justify-center gap-4">
            <div className="card bg-white/10 backdrop-blur px-4 py-3 text-center">
              <p className="font-bold text-2xl">5</p>
              <p className="text-xs text-primary-200">Bab Materi</p>
            </div>
            <div className="card bg-white/10 backdrop-blur px-4 py-3 text-center">
              <p className="font-bold text-2xl">4</p>
              <p className="text-xs text-primary-200">Level Game</p>
            </div>
            <div className="card bg-white/10 backdrop-blur px-4 py-3 text-center">
              <p className="font-bold text-2xl">7</p>
              <p className="text-xs text-primary-200">Badge</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
        {/* Playful background particles (optional, but adds to the fun theme) */}
        <div className="absolute top-10 right-10 text-4xl opacity-20 animate-float">🎮</div>
        <div className="absolute bottom-10 left-10 text-4xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🚀</div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md card p-8 sm:p-10 bg-white dark:bg-slate-900 border-b-[8px] z-10">
          <div className="flex items-center mb-6">
            <span className="font-display font-black text-5xl md:text-6xl text-slate-800 dark:text-white tracking-tight">
              Drag<span className="text-primary-600">IT</span>
            </span>
          </div>

          <h1 className="font-display text-3xl font-black mb-1">Masuk ke Akun</h1>
          <p className="text-slate-500 mb-6">Belum punya akun? <Link to="/register" className="text-primary-600 font-semibold hover:underline">Daftar di sini</Link></p>

          {error && (
            <div className="mb-4 p-3 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-700 rounded-xl text-danger-600 dark:text-danger-400 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="input-field" placeholder="nama@email.com" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="input-field pr-10" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading || success} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          {/* Demo logins */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className="text-center text-sm text-slate-500 mb-3">Coba dengan akun demo:</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => demoLogin('siswa')} disabled={loading || success} className="btn-secondary text-sm py-2.5 flex items-center justify-center gap-2">
                <span>👨‍💻</span> Demo Siswa
              </button>
              <button onClick={() => demoLogin('admin')} disabled={loading || success} className="btn-secondary text-sm py-2.5 flex items-center justify-center gap-2">
                <span>👨‍🏫</span> Demo Admin
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
