import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, CheckCircle2, XCircle, RotateCcw, Lightbulb, ChevronRight, BookOpen, Trophy, Timer, Star } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import { useProgress } from '../context/ProgressContext';
import evalData from '../data/evaluations.json';

const gradients = ['from-emerald-500 to-emerald-600', 'from-amber-500 to-amber-600', 'from-orange-500 to-red-500', 'from-blue-500 to-indigo-600'];

function getGrade(pct) {
  if (pct >= 90) return { label: 'Sangat Baik', color: 'text-emerald-500', emoji: '🌟' };
  if (pct >= 75) return { label: 'Baik', color: 'text-blue-500', emoji: '👍' };
  if (pct >= 60) return { label: 'Cukup', color: 'text-amber-500', emoji: '📚' };
  return { label: 'Perlu Belajar Lagi', color: 'text-rose-500', emoji: '💪' };
}

export default function EvaluasiPage() {
  const { addXP, recordGameResult } = useProgress();
  const [mode, setMode] = useState('list'); // 'list' | 'intro' | 'quiz' | 'result'
  const [selectedEval, setSelectedEval] = useState(null);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [showAllReview, setShowAllReview] = useState(false);

  const evaluations = evalData.evaluations || [];

  const handleSelectEval = (ev) => {
    setSelectedEval(ev);
    setMode('intro');
  };

  const startQuiz = () => {
    setAnswers({});
    setCurrent(0);
    setStartTime(Date.now());
    setShowAllReview(false);
    setMode('quiz');
  };

  const selectAnswer = (qIdx, optIdx) => {
    if (answers[qIdx] !== undefined) return;
    setAnswers(a => ({ ...a, [qIdx]: optIdx }));
    if (qIdx < selectedEval.questions.length - 1) {
      setTimeout(() => setCurrent(qIdx + 1), 700);
    } else {
      setTimeout(finishQuiz, 700);
    }
  };

  const finishQuiz = () => {
    const correct = selectedEval.questions.filter((q, i) => answers[i] === q.answer).length;
    const score = selectedEval.questions.length > 0 ? Math.round((correct / selectedEval.questions.length) * 100) : 0;
    const time = Math.round((Date.now() - startTime) / 1000);
    addXP(correct * 5);
    recordGameResult('eval_set_' + selectedEval.id, score, time, selectedEval.questions.length);
    setMode('result');
  };

  // Safe checks
  const currentQuestions = selectedEval?.questions || [];
  const correctCount = selectedEval ? currentQuestions.filter((q, i) => answers[i] === q.answer).length : 0;
  const pct = currentQuestions.length > 0 ? Math.round((correctCount / currentQuestions.length) * 100) : 0;
  const grade = getGrade(pct);
  const q = currentQuestions[current];
  const wrongAnswers = currentQuestions.filter((q, i) => answers[i] !== undefined && answers[i] !== q.answer);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 w-0 overflow-y-auto min-h-screen">
          <AnimatePresence mode="wait">
            
            {/* ── List Evaluations ── */}
            {mode === 'list' && (
              <motion.div key="list" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl">
                
                {/* Header Banner */}
                <div className="mb-8 card p-6 md:p-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white border-none shadow-[0_8px_0_theme(colors.purple.700)]">
                  <h1 className="font-display text-2xl md:text-3xl font-black mb-2">Uji pemahamanmu dengan berbagai kuis hardware komputer</h1>
                  <div className="flex items-center gap-6 mt-6 text-sm font-bold">
                    <span className="flex items-center gap-2"><div className="w-5 h-5 rounded-full border-[1.5px] border-white flex items-center justify-center opacity-80 text-[10px]">🎯</div> {evaluations.length} Evaluasi Tersedia</span>
                    <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> 0 Selesai</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                  <div className="card-hover p-6 rounded-2xl flex flex-col justify-between border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 border-b-8">
                    <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center mb-4 shadow-lg"><Trophy className="w-6 h-6" /></div>
                    <h3 className="font-display text-4xl font-black text-slate-800 dark:text-slate-100 mb-1">0</h3>
                    <p className="text-sm text-slate-500 font-medium">Total Percobaan</p>
                  </div>
                  <div className="card-hover p-6 rounded-2xl flex flex-col justify-between border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 border-b-8">
                    <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-4 shadow-lg"><Star className="w-6 h-6 fill-current" /></div>
                    <h3 className="font-display text-4xl font-black text-slate-800 dark:text-slate-100 mb-1">0</h3>
                    <p className="text-sm text-slate-500 font-medium">Rata-rata Nilai</p>
                  </div>
                  <div className="card-hover p-6 rounded-2xl flex flex-col justify-between border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 border-b-8">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-lg"><CheckCircle2 className="w-6 h-6" /></div>
                    <h3 className="font-display text-4xl font-black text-slate-800 dark:text-slate-100 mb-1">0</h3>
                    <p className="text-sm text-slate-500 font-medium">Soal Dikerjakan</p>
                  </div>
                </div>

                {/* Evaluation Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {evaluations.map((ev, i) => (
                    <div key={ev.id} onClick={() => handleSelectEval(ev)} className="w-full text-left card-hover border-2 border-slate-200 dark:border-slate-800 border-b-[8px] bg-white dark:bg-slate-900 rounded-2xl overflow-hidden flex flex-col group cursor-pointer transition-transform hover:-translate-y-1">
                      {/* Colored Top Header */}
                      <div className={`p-5 text-white bg-gradient-to-br ${gradients[i % gradients.length]}`}>
                        <p className="text-xs font-bold mb-1 opacity-80 uppercase tracking-widest">{ev.category || (i === 0 ? 'Dasar' : 'Lanjutan')}</p>
                        <h3 className="font-display font-black text-xl mb-1 truncate">{ev.title}</h3>
                        <p className="text-sm font-medium opacity-90 mb-2 line-clamp-2">{ev.description}</p>
                      </div>

                      {/* White Bottom Body */}
                      <div className="p-5 flex-1 flex flex-col">
                        <ul className="space-y-3 mb-6 flex-1 text-sm text-slate-600 dark:text-slate-300 font-medium">
                          <li className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                            <span className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border-[1.5px] border-slate-400 flex items-center justify-center opacity-80 text-[8px]">🎯</div> Soal</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{ev.questions.length} pertanyaan</span>
                          </li>
                          <li className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                            <span className="flex items-center gap-2"><Timer className="w-4 h-4 text-slate-400" /> Waktu</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{ev.timeLimit || 10} menit</span>
                          </li>
                          <li className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                            <span className="flex items-center gap-2"><Trophy className="w-4 h-4 text-slate-400" /> Percobaan</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">0x</span>
                          </li>
                          <li className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                            <span className="flex items-center gap-2"><Star className="w-4 h-4 text-slate-400" /> Best Score</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">-</span>
                          </li>
                        </ul>

                        {/* Difficulty Badge */}
                        <div className="mb-4">
                          <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${i === 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30' : i === 1 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30'}`}>
                            {i === 0 ? 'Mudah' : i === 1 ? 'Sedang' : 'Sulit'}
                          </span>
                        </div>

                        <button className={`w-full py-3 rounded-xl border-b-4 active:border-b-0 active:translate-y-1 font-bold flex items-center justify-center gap-2 text-white bg-gradient-to-r ${gradients[i % gradients.length]} shadow-md`}>
                          🚀 Mulai Kuis
                        </button>
                      </div>
                    </div>
                  ))}
                  {evaluations.length === 0 && (
                    <div className="col-span-3 card p-8 text-center text-slate-500 border-dashed">
                      Belum ada soal evaluasi yang ditambahkan.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── Intro ── */}
            {mode === 'intro' && selectedEval && (
              <motion.div key="intro" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <button onClick={() => setMode('list')} className="text-sm text-slate-500 mb-4 hover:text-slate-800 flex items-center">
                   ← Kembali ke daftar
                </button>
                <h1 className="font-display text-3xl font-black mb-2">{selectedEval.title} 📝</h1>
                <p className="text-slate-500 mb-8">{selectedEval.description}</p>
                <div className="max-w-md card p-8 text-center">
                  <div className="text-6xl mb-4">📋</div>
                  <h2 className="font-bold text-2xl mb-2">Soal Evaluasi</h2>
                  <p className="text-slate-500 mb-6">{currentQuestions.length} soal pilihan ganda · setiap jawaban salah ditampilkan penjelasannya</p>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl"><p className="font-bold text-lg">{currentQuestions.length}</p><p className="text-xs text-slate-500">Soal</p></div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl"><p className="font-bold text-lg">10</p><p className="text-xs text-slate-500">Poin/soal</p></div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl"><p className="font-bold text-lg">~{Math.ceil(currentQuestions.length * 0.5)}m</p><p className="text-xs text-slate-500">Estimasi</p></div>
                  </div>
                  {currentQuestions.length > 0 ? (
                    <button onClick={startQuiz} className="btn-primary w-full flex items-center justify-center gap-2">
                      <ClipboardList className="w-5 h-5" /> Mulai Evaluasi
                    </button>
                  ) : (
                    <button disabled className="btn-secondary w-full opacity-50 cursor-not-allowed">
                      Evaluasi Kosong
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── Quiz ── */}
            {mode === 'quiz' && selectedEval && q && (
              <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
                <div className="flex items-center justify-between mb-2 text-sm text-slate-500">
                  <span>Soal {current + 1} dari {currentQuestions.length}</span>
                  <span><CheckCircle2 className="w-4 h-4 text-emerald-500 inline mr-1" />{Object.keys(answers).length} dijawab</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-5 overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                    animate={{ width: `${((current + 1) / currentQuestions.length) * 100}%` }} transition={{ duration: 0.4 }} />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                    className="card p-8 border-b-[8px] border-primary-200 dark:border-slate-800">
                    <p className="font-bold text-lg mb-5">{current + 1}. {q.question}</p>
                    <div className="space-y-3">
                      {q.options.map((opt, i) => {
                        const selected = answers[current];
                        const isSelected = selected === i;
                        const isCorrect = i === q.answer;
                        const showResult = selected !== undefined;
                        return (
                          <button key={i} onClick={() => selectAnswer(current, i)}
                            disabled={selected !== undefined}
                            className={`w-full text-left p-4 rounded-2xl border-2 border-b-[4px] active:translate-y-0.5 active:border-b-2 font-bold text-base transition-all
                              ${showResult
                                ? isCorrect ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                                  : isSelected ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                                  : 'border-slate-200 dark:border-slate-600 opacity-40'
                                : 'border-slate-200 dark:border-slate-600 hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 cursor-pointer'}`}>
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold border-current shrink-0">
                                {String.fromCharCode(65 + i)}
                              </span>
                              <span className="flex-1">{opt}</span>
                              {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                              {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {answers[current] !== undefined && answers[current] !== q.answer && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 flex gap-3 text-sm text-blue-700 dark:text-blue-300">
                        <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold mb-1">Penjelasan:</p>
                          <p>{q.explanation}</p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <button onClick={finishQuiz} className="mt-4 btn-secondary text-sm py-2 px-4">Selesaikan Sekarang →</button>
              </motion.div>
            )}

            {/* ── Result ── */}
            {mode === 'result' && selectedEval && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl">
                <div className="card p-8 text-center mb-5">
                  <div className="text-6xl mb-3">{grade.emoji}</div>
                  <h2 className="font-display text-3xl font-black mb-1">{grade.label}</h2>
                  <p className={`text-6xl font-display font-black mb-2 ${grade.color}`}>{pct}%</p>
                  <p className="text-slate-500">{correctCount} dari {currentQuestions.length} soal benar</p>
                  <div className="grid grid-cols-2 gap-4 my-5">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4">
                      <p className="text-2xl font-black text-emerald-600">{correctCount * 10}</p><p className="text-xs text-slate-500">Skor</p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
                      <p className="text-2xl font-black text-amber-600">+{correctCount * 5} ⚡</p><p className="text-xs text-slate-500">XP Didapat</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={startQuiz} className="btn-primary flex-1 flex items-center justify-center gap-2">
                       <RotateCcw className="w-4 h-4" /> Coba Lagi
                    </button>
                    <button onClick={() => setMode('list')} className="btn-secondary flex-1">
                      Kembali ke Daftar
                    </button>
                  </div>
                </div>

                {wrongAnswers.length > 0 && (
                  <div className="card p-5 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-base flex items-center gap-2 text-red-600 dark:text-red-400">
                        <Lightbulb className="w-5 h-5" /> Pembahasan Jawaban Salah ({wrongAnswers.length})
                      </h3>
                      <button onClick={() => setShowAllReview(v => !v)}
                        className="text-xs text-primary-600 dark:text-primary-400 font-semibold">
                        {showAllReview ? 'Sembunyikan' : 'Tampilkan semua'}
                      </button>
                    </div>
                    <div className="space-y-4">
                      {currentQuestions.map((q, i) => {
                        const isWrong = answers[i] !== undefined && answers[i] !== q.answer;
                        if (!isWrong && !showAllReview) return null;
                        const isCorrect = answers[i] === q.answer;
                        return (
                          <div key={i} className={`p-4 rounded-xl border-l-4 ${isCorrect ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : 'border-red-400 bg-red-50 dark:bg-red-900/20'}`}>
                            <p className="font-semibold text-sm mb-2">{i + 1}. {q.question}</p>
                            <div className="space-y-0.5 text-sm mb-3">
                              {!isCorrect && answers[i] !== undefined && (
                                <p className="text-red-600 dark:text-red-400">❌ Jawabanmu: <b>{q.options[answers[i]]}</b></p>
                              )}
                              <p className="text-emerald-600 dark:text-emerald-400">✅ Jawaban benar: <b>{q.options[q.answer]}</b></p>
                            </div>
                            {!isCorrect && q.explanation && (
                              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 flex gap-2 text-xs text-blue-700 dark:text-blue-300">
                                <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                                <p>{q.explanation}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {wrongAnswers.length === 0 && (
                  <div className="card p-5 text-center text-emerald-600 dark:text-emerald-400 font-semibold">
                    🎉 Semua jawaban benar! Kamu luar biasa!
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
      </main>
    </div>
  );
}
