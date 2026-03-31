import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen, CheckCircle2, Lock } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import { useProgress } from '../context/ProgressContext';
import materials from '../data/materials.json';

const colorMap = {
  blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-700', badge: 'bg-blue-600' },
  violet: { bg: 'bg-violet-100 dark:bg-violet-900/30', text: 'text-violet-600 dark:text-violet-400', border: 'border-violet-200 dark:border-violet-700', badge: 'bg-violet-600' },
  emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-700', badge: 'bg-emerald-600' },
  amber: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-700', badge: 'bg-amber-600' },
  rose: { bg: 'bg-rose-100 dark:bg-rose-900/30', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-200 dark:border-rose-700', badge: 'bg-rose-600' },
};

const chapterEmojis = ['💻', '🔧', '🖱️', '⚙️', '🛠️'];

export default function MaterialPage() {
  const { progress } = useProgress();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 w-0 overflow-y-auto min-h-screen">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="font-display text-3xl font-black mb-1">Materi Pembelajaran</h1>
            <p className="text-slate-500">Pelajari komponen komputer dari dasar hingga mahir</p>
          </motion.div>

          {/* Progress overview */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="card p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-lg">Progres Materi</p>
              <p className="text-slate-500 text-sm">{progress?.completedChapters?.length || 0} dari {materials.chapters.length} bab selesai</p>
            </div>
            <div className="w-full sm:w-64">
              <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((progress?.completedChapters?.length || 0) / materials.chapters.length) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <p className="text-xs text-right text-slate-400 mt-1">
                {Math.round(((progress?.completedChapters?.length || 0) / materials.chapters.length) * 100)}%
              </p>
            </div>
          </motion.div>

          {/* Chapters grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {materials.chapters.map((ch, i) => {
              const c = colorMap[ch.color] || colorMap.blue;
              const done = progress?.completedChapters?.includes(ch.id.toString());
              return (
                <motion.div key={ch.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Link to={`/dashboard/materi/${ch.slug}`}>
                    <div className={`card p-5 h-full border ${c.border} hover:shadow-lg transition-all hover:-translate-y-1 group cursor-pointer`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${c.bg}`}>
                          {chapterEmojis[i]}
                        </div>
                        {done && (
                          <span className="flex items-center gap-1 text-xs font-semibold text-success-600 dark:text-success-400">
                            <CheckCircle2 className="w-4 h-4" /> Selesai
                          </span>
                        )}
                      </div>
                      <div className={`inline-block text-xs font-bold px-2 py-0.5 rounded-md text-white mb-2 ${c.badge}`}>
                        Bab {ch.id}
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{ch.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4">{ch.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">{ch.topics.length} topik</span>
                        <span className={`flex items-center gap-1.5 text-sm font-semibold ${c.text} group-hover:gap-2.5 transition-all`}>
                          Mulai Belajar <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
      </main>
    </div>
  );
}
