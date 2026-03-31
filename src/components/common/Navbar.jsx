import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Sun, Moon, Menu, X, LogOut, User, BookOpen, Gamepad2, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useProgress } from '../../context/ProgressContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useTheme();
  const { progress } = useProgress();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  const navLinks = user
    ? user.role === 'guru'
      ? [{ to: '/admin', label: 'Dashboard Guru', icon: LayoutDashboard }]
      : [
          { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/dashboard/materi', label: 'Materi', icon: BookOpen },
          { to: '/dashboard/game', label: 'Game', icon: Gamepad2 },
        ]
    : [
        { to: '/#features', label: 'Fitur', icon: null },
        { to: '/#about', label: 'Tentang', icon: null },
      ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20 dark:border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display font-black text-3xl md:text-4xl text-slate-800 dark:text-white tracking-tight">
              Drag<span className="text-primary-600">IT</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 font-medium transition-all text-sm">
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* XP badge */}
            {user && progress && (
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-semibold">
                <span>⚡</span>
                <span>{progress.xp} XP</span>
              </div>
            )}

            {/* Theme toggle */}
            <button onClick={toggle} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-500" />}
            </button>

            {/* User menu */}
            {user ? (
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                  <span className="text-xl">{user.avatar}</span>
                  <span className="hidden md:block text-sm font-medium text-slate-700 dark:text-slate-200">{(user.full_name || '').split(' ')[0]}</span>
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 mt-2 w-52 card shadow-xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                        <p className="font-semibold text-sm text-slate-800 dark:text-slate-100">{user.full_name}</p>
                        <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                      </div>
                      <Link to="/dashboard/profil" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                        <User className="w-4 h-4" /> Profil Saya
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-900/20 transition-all">
                        <LogOut className="w-4 h-4" /> Keluar
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-sm py-2 px-4">Masuk</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">Daftar</Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-700">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-primary-50 hover:text-primary-600 font-medium transition-all text-sm">
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              ))}
              {!user && (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="block btn-secondary text-sm py-2 text-center">Masuk</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="block btn-primary text-sm py-2 text-center">Daftar</Link>
                </>
              )}
              {user && (
                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-danger-500 hover:bg-danger-50 rounded-xl transition-all">
                  <LogOut className="w-4 h-4" /> Keluar
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
