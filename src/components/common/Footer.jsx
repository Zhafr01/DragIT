import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <Monitor className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-black text-2xl text-slate-800 dark:text-white tracking-tight">
                Drag<span className="text-primary-600">IT</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Media pembelajaran interaktif untuk siswa SMK mempelajari komponen komputer melalui game drag and drop.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-slate-300">Menu</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors">Beranda</Link></li>
              <li><Link to="/dashboard/materi" className="hover:text-white transition-colors">Materi</Link></li>
              <li><Link to="/dashboard/game" className="hover:text-white transition-colors">Game Edukasi</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Masuk</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-slate-300">Kontak</h4>
            <ul className="space-y-2 text-sm text-slate-400">
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            © 2025 DragIT. Dibuat untuk siswa SMK Indonesia.
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> untuk pendidikan
          </p>
        </div>
      </div>
    </footer>
  );
}
