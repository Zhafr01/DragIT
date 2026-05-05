import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Eye, EyeOff, UserPlus, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPw: '', role: 'siswa', kelas: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPw) { setError('Password tidak cocok!'); return; }
    if (form.password.length < 6) { setError('Password minimal 6 karakter!'); return; }
    setLoading(true);
    try {
      const user = await register(form.name, form.email, form.password, form.role, form.kelas);
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
              Pendaftaran berhasil! Memuat dashboard...
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
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative text-white text-center max-w-sm">
          <div className="text-7xl mb-6 animate-float">🎓</div>
          <h2 className="font-display text-4xl font-black mb-4">Bergabung Sekarang!</h2>
          <p className="text-primary-200 leading-relaxed">Daftar gratis dan mulai perjalanan belajar komponen komputer yang seru dan interaktif bersama DragIT.</p>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto relative">
        {/* Playful background particles (optional, but adds to the fun theme) */}
        <div className="absolute top-10 right-10 text-4xl opacity-20 animate-float">🎮</div>
        <div className="absolute bottom-10 left-10 text-4xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🚀</div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md card p-8 sm:p-10 my-8 z-10">
          <div className="flex items-center mb-6">
            <span className="font-display font-black text-5xl md:text-6xl text-slate-800 dark:text-white tracking-tight">
              Drag<span className="text-primary-600">IT</span>
            </span>
          </div>

          <h1 className="font-display text-3xl font-black mb-1">Buat Akun Baru</h1>
          <p className="text-slate-500 mb-6">Sudah punya akun? <Link to="/login" className="text-primary-600 font-semibold hover:underline">Masuk di sini</Link></p>

          {error && (
            <div className="mb-4 p-3 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-700 rounded-xl text-danger-600 dark:text-danger-400 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Daftar sebagai:</label>
              <div className="grid grid-cols-2 gap-3">
                {['siswa', 'admin'].map((r) => (
                  <button key={r} type="button" onClick={() => setForm({ ...form, role: r })}
                    className={`py-3 rounded-2xl border-4 font-black border-b-[6px] active:translate-y-1 active:border-b-[4px] text-sm transition-all flex items-center justify-center gap-2
                      ${form.role === r
                        ? 'border-primary-500 bg-primary-100 dark:border-primary-400 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                        : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300 dark:hover:border-slate-600'}`}>
                    {r === 'siswa' ? <><span>👨‍💻</span> Siswa</> : <><span>👨‍🏫</span> Admin</>}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nama Lengkap</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="input-field" placeholder="Nama kamu" required />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="input-field" placeholder="nama@email.com" required />
            </div>

            {form.role === 'siswa' && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Kelas</label>
                <input type="text" value={form.kelas} onChange={e => setForm({ ...form, kelas: e.target.value })}
                  className="input-field" placeholder="Contoh: X TKJ 1" />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="input-field pr-10" placeholder="Min. 6 karakter" required />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Konfirmasi Password</label>
              <input type="password" value={form.confirmPw} onChange={e => setForm({ ...form, confirmPw: e.target.value })}
                className="input-field" placeholder="Ulangi password" required />
            </div>

            <button type="submit" disabled={loading || success} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
              {loading ? 'Membuat akun...' : 'Buat Akun'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
