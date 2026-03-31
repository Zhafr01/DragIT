import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, Lightbulb, BookOpen, Gamepad2, Volume2 } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import { useProgress } from '../context/ProgressContext';
import materials from '../data/materials.json';

const componentEmojis = {
  'Motherboard': '🖥️', 'Processor (CPU)': '🧠', 'RAM (Random Access Memory)': '🔋',
  'Harddisk / SSD': '💾', 'VGA Card (GPU)': '🎮', 'Power Supply (PSU)': '⚡',
  'Heatsink & Fan': '❄️', 'Monitor': '🖵', 'Keyboard': '⌨️', 'Mouse': '🖱️',
  'Printer': '🖨️', 'Speaker': '🔊',
};

const colorMap = {
  blue: 'from-blue-500 to-blue-700',
  violet: 'from-violet-500 to-violet-700',
  emerald: 'from-emerald-500 to-emerald-700',
  amber: 'from-amber-500 to-amber-700',
  rose: 'from-rose-500 to-rose-700',
};

function ChapterQuiz({ quiz, onComplete, isDone }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showReview, setShowReview] = useState(false);

  if (!quiz || quiz.length === 0) return null;

  const q = quiz[current];
  const allAnswered = Object.keys(answers).length === quiz.length;
  const score = quiz.reduce((sum, q, i) => sum + (answers[i] === q.answer ? 1 : 0), 0);

  const handleAnswer = (optIdx) => {
    if (answers[current] !== undefined) return;
    setAnswers({ ...answers, [current]: optIdx });
    if (current < quiz.length - 1) setTimeout(() => setCurrent(current + 1), 800);
  };

  if (allAnswered && showReview) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6 md:col-span-5 bg-white dark:bg-slate-900 border-2 border-primary-200 dark:border-primary-800">
        <h2 className="font-display text-2xl font-black mb-4">Hasil Kuis Bab</h2>
        <p className="text-lg mb-6 text-slate-600 dark:text-slate-300">
          Benar <span className="font-bold text-emerald-500">{score}</span> dari {quiz.length} soal.
        </p>
        <div className="space-y-4 mb-6">
          {quiz.map((q, i) => (
             <div key={i} className={`p-4 rounded-xl border-l-4 ${answers[i] === q.answer ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : 'border-red-400 bg-red-50 dark:bg-red-900/20'}`}>
                <p className="font-semibold text-sm mb-2">{i + 1}. {q.question}</p>
                <div className="space-y-0.5 text-sm mb-3">
                  {answers[i] !== q.answer && <p className="text-red-600 dark:text-red-400">❌ Jawabanmu: <b>{q.options[answers[i]]}</b></p>}
                  <p className="text-emerald-600 dark:text-emerald-400">✅ Jawaban benar: <b>{q.options[q.answer]}</b></p>
                </div>
                {answers[i] !== q.answer && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 flex gap-2 text-xs text-blue-700 dark:text-blue-300">
                    <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>{q.explanation}</p>
                  </div>
                )}
             </div>
          ))}
        </div>
        {!isDone ? (
          <button onClick={onComplete} className="btn-primary w-full flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Selesaikan Bab Ini (+30 XP)
          </button>
        ) : (
           <p className="text-center text-success-500 font-bold flex items-center justify-center gap-2"><CheckCircle2 className="w-5 h-5 inline" /> Bab Sudah Selesai</p>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6 md:col-span-5 border-2 border-amber-200 dark:border-amber-800/50 bg-amber-50/30 dark:bg-amber-900/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-black flex items-center gap-2">
          <span>🤖</span> Kuis Evaluasi Bab
        </h2>
        <span className="text-xs font-semibold bg-amber-100 dark:bg-amber-900/30 text-amber-700 px-3 py-1 rounded-full">
          Soal {current + 1} dari {quiz.length}
        </span>
      </div>
      <p className="font-bold text-lg mb-4">{current + 1}. {q.question}</p>
      
      <div className="space-y-3 mb-6">
        {q.options.map((opt, i) => {
          const isSelected = answers[current] === i;
          const isCorrect = i === q.answer;
          const showResult = answers[current] !== undefined;
          
          let btnClass = 'border-slate-200 dark:border-slate-700 hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20';
          if (showResult) {
            if (isCorrect) btnClass = 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 ring-2 ring-emerald-400';
            else if (isSelected) btnClass = 'border-red-400 bg-red-50 dark:bg-red-900/20 ring-2 ring-red-400';
            else btnClass = 'border-slate-200 dark:border-slate-700 opacity-50';
          }

          return (
            <button key={i} onClick={() => handleAnswer(i)} disabled={showResult}
              className={`w-full text-left p-4 rounded-xl border-2 font-medium text-sm transition-all ${btnClass}`}>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold border-current shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
                {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>

      {answers[current] !== undefined && answers[current] !== q.answer && (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-sm text-blue-700 dark:text-blue-300 flex gap-3">
             <Lightbulb className="w-5 h-5 shrink-0" />
             <p><b>Penjelasan:</b> {q.explanation}</p>
          </motion.div>
        </AnimatePresence>
      )}

      {allAnswered && (
        <button onClick={() => setShowReview(true)} className="btn-primary w-full mt-4">Lihat Hasil Akhir →</button>
      )}
    </motion.div>
  );
}

export default function ChapterPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { progress, completeChapter, addXP } = useProgress();
  const [topicIndex, setTopicIndex] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const chapter = materials.chapters.find(c => c.slug === slug);
  if (!chapter) return <div className="flex items-center justify-center min-h-screen"><p>Bab tidak ditemukan.</p></div>;

  const isQuizMode = topicIndex === chapter.topics.length;
  const isLast = isQuizMode;
  const topic = isQuizMode ? { title: 'Kuis Evaluasi Bab', content: '', keyPoints: [] } : chapter.topics[topicIndex];
  const isDone = progress?.completedChapters?.includes(chapter.id.toString());

  const handleNext = () => {
    if (isQuizMode) {
      if (!isDone && !isSubmitting) { 
        setIsSubmitting(true);
        completeChapter(chapter.id.toString()); 
        addXP(30); 
        setTimeout(() => navigate('/dashboard/materi'), 1500); // Auto-redirect setelah 1.5 detik
      } else if (isDone) {
        navigate('/dashboard/materi');
      }
    } else {
      setTopicIndex(i => i + 1);
    }
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      setSpeaking(true);
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'id-ID';
      utter.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utter);
    }
  };

  const gradient = colorMap[chapter.color] || colorMap.blue;

  // Get emoji based on topic
  const topicEmoji = Object.entries(componentEmojis).find(([k]) => topic.title.includes(k.split(' ')[0]))?.[1] || '💻';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 w-0 overflow-y-auto min-h-screen">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <Link to="/dashboard/materi" className="hover:text-primary-600 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> Materi
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-700 dark:text-slate-200 font-medium">{chapter.title}</span>
          </div>

          <div className="max-w-4xl">
            {/* Chapter header */}
            <motion.div key={topicIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className={`card p-6 mb-6 bg-gradient-to-br ${gradient} border-0 text-white`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">Bab {chapter.id} • Topik {topicIndex + 1}/{chapter.topics.length}</span>
                  </div>
                  <h1 className="font-display text-2xl md:text-3xl font-black">{topic.title}</h1>
                </div>
                <span className="text-5xl">{topicEmoji}</span>
              </div>

              <div className="flex gap-2 mt-4">
                {[...chapter.topics, { quiz: true }].map((_, i) => (
                  <button key={i} onClick={() => setTopicIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${i === topicIndex ? 'bg-white w-8' : 'bg-white/40 w-4'}`} />
                ))}
              </div>
            </motion.div>

            {!isQuizMode ? (
              <div className="grid md:grid-cols-5 gap-6">
                {/* Content */}
                <motion.div key={`content-${topicIndex}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }} className="md:col-span-3 card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg">📖 Penjelasan</h2>
                    <button onClick={() => speak(topic.content)} disabled={speaking}
                      className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-all ${speaking ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500'}`}>
                      <Volume2 className="w-4 h-4" /> {speaking ? 'Memutar...' : 'Dengarkan'}
                    </button>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">{topic.content}</p>
                </motion.div>
  
                {/* Key points */}
                <motion.div key={`keys-${topicIndex}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }} className="md:col-span-2 card p-6">
                  <h2 className="font-bold text-lg mb-4">✅ Poin Penting</h2>
                  <ul className="space-y-2.5">
                    {topic.keyPoints.map((point, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.07 }}
                        className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-success-500 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ) : (
              <ChapterQuiz quiz={chapter.quiz} onComplete={handleNext} isDone={isDone} />
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-6">
              <button onClick={() => setTopicIndex(i => Math.max(0, i - 1))} disabled={topicIndex === 0}
                className="btn-secondary flex items-center gap-2 disabled:opacity-30">
                <ChevronLeft className="w-4 h-4" /> Sebelumnya
              </button>

              {isLast ? (
                <div className="flex gap-3">
                  {/* Dihapus tombol Tandai Selesai yang dobel di nav bar */}
                  {isDone && (
                    <span className="flex items-center gap-2 text-success-600 font-semibold px-2">
                       <CheckCircle2 className="w-5 h-5" />
                    </span>
                  )}
                  <Link to="/dashboard/materi" className="btn-secondary flex flex-wrap items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 hidden sm:block" /> Materi
                  </Link>
                  <Link to="/dashboard/game" className="btn-accent flex items-center gap-2 text-sm">
                    <Gamepad2 className="w-4 h-4 hidden sm:block" /> Main Game!
                  </Link>
                </div>
              ) : (
                <button onClick={handleNext} className="btn-primary flex items-center gap-2">
                  Selanjutnya <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
      </main>
    </div>
  );
}
