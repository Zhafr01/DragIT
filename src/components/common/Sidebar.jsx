import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, Gamepad2, ClipboardList,
  User, LogOut, ChevronRight, Zap, Trophy, Sun, Moon,
  PanelLeftClose, PanelLeft, Info
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { useTheme } from '../../context/ThemeContext';

const studentLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/dashboard/materi', label: 'Materi', icon: BookOpen },
  { to: '/dashboard/game', label: 'Game Edukasi', icon: Gamepad2 },
  { to: '/dashboard/evaluasi', label: 'Evaluasi', icon: ClipboardList },
  { to: '/dashboard/profil', label: 'Profil', icon: User },
  { to: '/dashboard/about', label: 'Tentang Kami', icon: Info, separator: true },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { progress, getLevelProgress } = useProgress();
  const { isDark, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Safe calls for context if missing
  const lvlProg = getLevelProgress ? getLevelProgress() : { pct: 0 };

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isMinimized ? 88 : 280 }}
      transition={{ duration: 0.3, type: 'spring', bounce: 0, damping: 20 }}
      className="hidden md:flex flex-col shrink-0 h-screen sticky top-0 relative z-40"
    >
      {/* 
        To prevent the floating toggle button from being clipped, 
        we put overflow-hidden on an inner container. 
      */}
      
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsMinimized(!isMinimized)}
        className="absolute -right-3.5 top-8 w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-full z-50 text-slate-400 hover:text-primary-600 hover:border-primary-400 dark:hover:border-primary-500 shadow-sm transition-colors"
      >
        {isMinimized ? <PanelLeft className="w-3.5 h-3.5" /> : <PanelLeftClose className="w-3.5 h-3.5" />}
      </button>

      {/* Inner Scrollable Container with overflowing content hidden */}
      <div className="w-full flex-1 flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-800/60 overflow-x-hidden overflow-y-auto scrollbar-none">
        
        {/* Logo Area */}
        <div className="h-24 flex flex-col justify-center px-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <Link to="/dashboard" className={`flex items-center gap-2 group w-full ${isMinimized ? 'justify-center mx-auto pr-2' : ''}`}>
            {isMinimized ? (
               <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex justify-center shrink-0 w-10">
                  <span className="text-3xl font-black text-primary-600 dark:text-primary-500">D<span className="text-accent-500">I</span></span>
               </motion.div>
            ) : (
               <AnimatePresence mode="popLayout">
                 <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex w-full items-center justify-start whitespace-nowrap">
                   <span className="font-display font-black text-3xl text-slate-800 dark:text-white tracking-tight">
                     Drag<span className="text-primary-600 dark:text-primary-500">IT</span>
                   </span>
                 </motion.div>
               </AnimatePresence>
            )}
          </Link>
        </div>

        {/* User info */}
        <div className={`py-6 border-b border-slate-100 dark:border-slate-800 shrink-0 ${isMinimized ? 'px-4 flex flex-col items-center' : 'px-6'}`}>
          <div className={`flex items-center ${isMinimized ? 'flex-col gap-0' : 'gap-4'}`}>
            <div className={`shrink-0 rounded-full bg-primary-50 dark:bg-primary-900/40 text-primary-600 flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-sm transition-all ${isMinimized ? 'w-10 h-10 text-xl' : 'w-12 h-12 text-2xl'}`}>
               <span className="drop-shadow-sm">{user?.avatar || '👤'}</span>
            </div>
            {!isMinimized && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-w-0 flex-1 flex flex-col justify-center">
                <p className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate w-40 leading-tight">{user?.full_name}</p>
                <p className="text-xs text-slate-500 capitalize mt-0.5">{user?.kelas || user?.role}</p>
              </motion.div>
            )}
          </div>

          {/* XP bar */}
          {!isMinimized && progress && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 16 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="overflow-hidden bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 w-full">
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-md">
                  <Zap className="w-3.5 h-3.5" /> Lvl {progress.level}
                </div>
                <span className="text-primary-600 dark:text-primary-400">{progress.xp} XP</span>
              </div>
              <div className="h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden w-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${lvlProg.pct}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-none shrink-0 border-b border-transparent">
          {studentLinks.map((link) => {
            const active = location.pathname === link.to ||
              (link.to !== '/dashboard' && location.pathname.startsWith(link.to));
            return (
              <React.Fragment key={link.to}>
                {link.separator && !isMinimized && (
                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-2" />
                )}
                <Link to={link.to}
                  title={isMinimized ? link.label : ""}
                  className={`flex items-center rounded-xl transition-all whitespace-nowrap overflow-hidden ${
                    isMinimized ? 'w-14 mx-auto p-3 justify-center aspect-square' : 'px-4 py-3 gap-3 w-full'
                  } ${active ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-bold shadow-sm ring-1 ring-primary-100 dark:ring-primary-900/50' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-200 font-medium'}`}>
                  <link.icon className="shrink-0 w-5 h-5" />
                  {!isMinimized && (
                    <>
                       <span className="flex-1">{link.label}</span>
                       {active && <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />}
                    </>
                  )}
                </Link>
              </React.Fragment>
            );
          })}
        </nav>



        {/* Theme and Logout toggles */}
        <div className="px-4 py-4 border-t border-slate-100 dark:border-slate-800 space-y-2 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
          <button onClick={toggle} title={isMinimized ? (isDark ? 'Mode Terang' : 'Mode Gelap') : ""}
            className={`flex items-center rounded-xl text-slate-500 hover:bg-white hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-200 font-medium transition-all whitespace-nowrap overflow-hidden ${
              isMinimized ? 'w-12 h-12 mx-auto justify-center p-0 shadow-sm border border-slate-200/50 dark:border-slate-700/50' : 'w-full px-4 py-3 gap-3 hover:shadow-sm'
            }`}>
            {isDark ? <Sun className={`shrink-0 text-amber-500 ${isMinimized ? 'w-5 h-5' : 'w-5 h-5'}`} /> : <Moon className={`shrink-0 ${isMinimized ? 'w-5 h-5' : 'w-5 h-5'}`} />} 
            {!isMinimized && <span className="flex-1 text-left">{isDark ? 'Mode Terang' : 'Mode Gelap'}</span>}
          </button>
          
          <button onClick={handleLogout} title={isMinimized ? "Keluar" : ""}
            className={`flex items-center rounded-xl text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-900/20 font-medium transition-all whitespace-nowrap overflow-hidden ${
              isMinimized ? 'w-12 h-12 mx-auto justify-center p-0 shadow-sm border border-danger-100 dark:border-danger-900/50' : 'w-full px-4 py-3 gap-3 hover:shadow-sm'
            }`}>
            <LogOut className={`shrink-0 ${isMinimized ? 'w-5 h-5' : 'w-5 h-5'}`} /> 
            {!isMinimized && <span className="flex-1 text-left">Keluar</span>}
          </button>
        </div>
        
      </div>
    </motion.aside>
  );
}
