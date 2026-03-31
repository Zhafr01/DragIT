import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Monitor, Eye, EyeOff, UserPlus, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPw: '', role: 'siswa', kelas: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPw) { setError('Password tidak cocok!'); return; }
    if (form.password.length < 6) { setError('Password minimal 6 karakter!'); return; }
    setLoading(true);
    try {
      const user = await register(form.name, form.email, form.password, form.role, form.kelas);
      navigate(user.role === 'guru' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative text-white text-center max-w-sm">
          <div className="text-7xl mb-6 animate-float">🎓</div>
          <h2 className="font-display text-4xl font-black mb-4">Bergabung Sekarang!</h2>
          <p className="text-primary-200 leading-relaxed">Daftar gratis dan mulai perjalanan belajar komponen komputer yang seru dan interaktif bersama DragIT.</p>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md py-8">
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
                {['siswa', 'guru'].map((r) => (
                  <button key={r} type="button" onClick={() => setForm({ ...form, role: r })}
                    className={`py-3 rounded-xl border-2 font-semibold text-sm transition-all flex items-center justify-center gap-2
                      ${form.role === r
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        : 'border-slate-200 dark:border-slate-600 text-slate-500 hover:border-slate-300'}`}>
                    {r === 'siswa' ? <><span>👨‍💻</span> Siswa</> : <><span>👨‍🏫</span> Guru</>}
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

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
              {loading ? 'Membuat akun...' : 'Buat Akun'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
