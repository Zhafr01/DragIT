import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen, CheckCircle2, Lock, Monitor, Cpu, Keyboard, CircuitBoard, Wrench, HardDrive } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import { useProgress } from '../context/ProgressContext';
import { useData } from '../context/DataContext';

const colorMap = {
  blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-700', badge: 'bg-blue-600' },
  violet: { bg: 'bg-violet-100 dark:bg-violet-900/30', text: 'text-violet-600 dark:text-violet-400', border: 'border-violet-200 dark:border-violet-700', badge: 'bg-violet-600' },
  emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-700', badge: 'bg-emerald-600' },
  amber: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-700', badge: 'bg-amber-600' },
  rose: { bg: 'bg-rose-100 dark:bg-rose-900/30', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-200 dark:border-rose-700', badge: 'bg-rose-600' },
};

const Icons = {
  Monitor, Cpu, Keyboard, CircuitBoard, Wrench, HardDrive, BookOpen
};

export default function MaterialPage() {
  const { progress } = useProgress();
  const { materials, loadingData } = useData();

  if (loadingData) return <div className="min-h-screen flex items-center justify-center">Memuat data...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 w-0 overflow-y-auto min-h-screen">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl font-black mb-1 flex items-center gap-2">📖 Materi Hardware</h1>
          <p className="text-slate-500">Pelajari komponen hardware komputer secara mendalam</p>
        </motion.div>

        {/* Progress overview */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="card p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg">Progres Materi Keseluruhan</p>
            <p className="text-slate-500 text-sm">{progress?.completedChapters?.length || 0} dari {materials.chapters.length} Modul Selesai</p>
          </div>
          <div className="w-full sm:w-64">
            <div className="h-6 bg-black/5 dark:bg-black/20 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-800 relative shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-400 to-accent-500 rounded-full border-r-2 border-accent-600 relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${((progress?.completedChapters?.length || 0) / materials.chapters.length) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/30 rounded-full" />
              </motion.div>
            </div>
            <p className="text-sm font-bold text-right text-slate-500 dark:text-slate-400 mt-2">
              {Math.round(((progress?.completedChapters?.length || 0) / materials.chapters.length) * 100)}% Selesai
            </p>
          </div>
        </motion.div>

        {/* Chapters grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {materials.chapters.map((ch, i) => {
            const c = colorMap[ch.color] || colorMap.blue;
            
            // Check completed status
            const done = progress?.completedChapters?.includes(Number(ch.id)) || progress?.completedChapters?.includes(ch.id.toString());
            
            // Local topic progress
            let localPct = 0;
            let totalSlides = 0;
            try {
              totalSlides = ch.topics.reduce((sum, t) => sum + (t.slides ? t.slides.length : 0), 0);
              const savedProgress = JSON.parse(localStorage.getItem('chapterProgress') || '{}');
              const savedIndex = savedProgress[ch.slug] || 0;
              const totalSteps = totalSlides + 1; // slides + quiz
              localPct = Math.round((savedIndex / totalSteps) * 100);
            } catch (e) {}
            
            const displayPct = done ? 100 : localPct;
            
            const IconComp = Icons[ch.icon] || BookOpen;
            return (
              <motion.div key={ch.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Link to={`/dashboard/materi/${ch.slug}`}>
                  <div className="card-hover h-full flex flex-col bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden group">

                    {/* Top Banner Image with Overlay */}
                    <div className="relative h-40 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                      {/* Image Banner */}
                      <img
                        src={ch.headerImage || `https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400&tint=${ch.color}`}
                        alt={ch.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400&tint=${ch.color}`;
                        }}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Dramatic color overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${colorMap[ch.color] ? 'from-' + ch.color + '-600/80 to-' + ch.color + '-400/40' : 'from-blue-600/80 to-blue-400/40'} mix-blend-multiply`}></div>

                      {/* Icon Box */}
                      <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-display font-black text-lg mb-2 text-slate-800 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">{ch.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-6 line-clamp-2 flex-1">{ch.description}</p>

                      {/* Stats & Progress */}
                      <div className="mt-auto">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                          <span>{totalSlides} Slide + Kuis</span>
                          <span>{displayPct}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${done ? 'bg-success-500' : 'bg-primary-500'}`}
                            style={{ width: `${Math.max(displayPct, 3)}%` }} // min 3% to show a small blip if 0
                          ></div>
                        </div>

                        {/* Footer Action */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                          <span className="text-sm font-bold text-primary-600 dark:text-primary-400">Lanjutkan</span>
                          <ChevronRight className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        </div>
                      </div>
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
