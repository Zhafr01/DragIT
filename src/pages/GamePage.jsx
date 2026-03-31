import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext, DragOverlay, useDraggable, useDroppable, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors
} from '@dnd-kit/core';
import {
  SortableContext, verticalListSortingStrategy, useSortable, arrayMove
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Timer, Trophy, RotateCcw, ChevronRight, Star, CheckCircle2, XCircle, AlertCircle, Lightbulb
} from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import { useProgress } from '../context/ProgressContext';
import questions from '../data/questions.json';

/* ─── Constants ───────────────────────── */
const WRONG_PENALTY = 3; // points deducted per wrong drop

/* ─── Draggable Item ───────────────────── */
function DragItem({ id, label, emoji, color, wrongFlash }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)`, zIndex: 999 }
    : {};

  const colorMap = {
    blue: 'bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300',
    violet: 'bg-violet-100 dark:bg-violet-900/40 border-violet-300 dark:border-violet-600 text-violet-700 dark:text-violet-300',
    green: 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300',
    orange: 'bg-orange-100 dark:bg-orange-900/40 border-orange-300 dark:border-orange-600 text-orange-700 dark:text-orange-300',
    red: 'bg-red-100 dark:bg-red-900/40 border-red-300 dark:border-red-600 text-red-700 dark:text-red-300',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/40 border-yellow-300 dark:border-yellow-600 text-yellow-700 dark:text-yellow-300',
    cyan: 'bg-cyan-100 dark:bg-cyan-900/40 border-cyan-300 dark:border-cyan-600 text-cyan-700 dark:text-cyan-300',
    gray: 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-500 text-slate-700 dark:text-slate-300',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300',
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      animate={wrongFlash ? { x: [0, -10, 10, -8, 8, 0], backgroundColor: ['#fef2f2', '#fef2f2', '#fef2f2', '#fef2f2'] } : {}}
      transition={{ duration: 0.4 }}
      className={`drag-item flex items-center gap-3 p-3 rounded-xl border-2 ${colorMap[color] || colorMap.blue} select-none cursor-grab active:cursor-grabbing transition-shadow hover:shadow-md ${wrongFlash ? 'ring-2 ring-red-400' : ''}`}
    >
      <span className="text-2xl">{emoji}</span>
      <span className="font-semibold text-sm leading-tight">{label}</span>
    </motion.div>
  );
}

/* ─── Drop Zone ─────────────────────────── */
function DropZoneTarget({ id, label, description, emoji, filledBy, isCorrect, isWrong, isOver }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef}
      className={`drop-zone min-h-16 p-3 rounded-xl transition-all border-2 border-dashed
        ${isCorrect ? 'border-green-400 bg-green-50 dark:bg-green-900/20' :
          isWrong ? 'border-red-400 bg-red-50 dark:bg-red-900/20 animate-shake' :
          isOver ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20 scale-[1.02]' :
          'border-slate-300 dark:border-slate-600'}`}>
      {filledBy ? (
        <div className="flex items-center gap-3 p-2 rounded-lg bg-white/80 dark:bg-slate-700/80">
          <span className="text-2xl">{filledBy.emoji}</span>
          <span className="font-semibold text-sm flex-1">{filledBy.label}</span>
          {isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />}
          {isWrong && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
        </div>
      ) : (
        <div className="text-center py-1">
          {emoji && <div className="text-xl mb-1">{emoji}</div>}
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
        </div>
      )}
    </div>
  );
}

/* ─── Sortable Item (Level 4) ─────────── */
function SortableItem({ id, label, emoji, color, idx }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 };
  const colorMap = {
    blue: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200', violet: 'bg-violet-50 dark:bg-violet-900/30 border-violet-200',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200', green: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200',
    cyan: 'bg-cyan-50 dark:bg-cyan-900/30 border-cyan-200', orange: 'bg-orange-50 dark:bg-orange-900/30 border-orange-200',
    gray: 'bg-slate-50 dark:bg-slate-800 border-slate-200', emerald: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200',
  };
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}
      className={`drag-item flex items-center gap-3 p-3 rounded-xl border-2 ${colorMap[color] || colorMap.blue} cursor-grab`}>
      <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs font-bold shrink-0">{idx + 1}</span>
      <span className="text-xl">{emoji}</span>
      <span className="font-medium text-sm flex-1">{label}</span>
      <span className="text-slate-300 dark:text-slate-500 shrink-0">⠿</span>
    </div>
  );
}

/* ─── Level Selector ─────────────────── */
function LevelSelector({ onSelect, progress }) {
  const gradients = ['from-blue-500 to-blue-700', 'from-violet-500 to-violet-700', 'from-amber-500 to-amber-700', 'from-rose-500 to-rose-700'];
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-display text-3xl font-black mb-1">Game Edukasi 🎮</h1>
        <p className="text-slate-500">Pilih level dan uji pemahamanmu tentang komponen komputer!</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 gap-5">
        {questions.levels.map((level, i) => {
          const best = progress?.gameHistory?.filter(g => g.levelId === level.id)
            .reduce((max, g) => Math.max(max, g.score), 0) || 0;
          const done = progress?.completedLevels?.includes(level.id);
          return (
            <motion.button key={level.id} onClick={() => onSelect(level.id)}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="w-full text-left card p-5 hover:shadow-xl transition-all hover:-translate-y-1 group">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[i]} flex items-center justify-center text-white text-xl font-display font-black shadow-lg`}>
                  {level.id}
                </div>
                <div className="flex flex-col items-end gap-1">
                  {done && <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-semibold">✓ Selesai</span>}
                  <span className="text-xs text-slate-400">{level.xpReward} XP</span>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{level.title}</h3>
              <p className="text-slate-500 text-sm mb-4">{level.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>⏱ {level.timeLimit}s</span>
                  {best > 0 && <span className="text-amber-500 font-semibold">🏆 Best: {best}</span>}
                </div>
                <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Mulai <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
      {/* Bonus: Motherboard Game */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-5">
        <Link to="/dashboard/game/motherboard"
          className="w-full card p-5 hover:shadow-xl transition-all hover:-translate-y-1 group flex items-center gap-4 border-2 border-dashed border-emerald-400 dark:border-emerald-600">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-2xl shadow-lg shrink-0">🖥️</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-bold text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Bonus: Rakit Motherboard</h3>
              <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-semibold">BARU!</span>
            </div>
            <p className="text-slate-500 text-sm">Seret gambar komponen ke slot yang tepat pada diagram motherboard visual</p>
          </div>
          <ChevronRight className="w-5 h-5 text-primary-500 shrink-0 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}

/* ─── Review Section (shown after game) ─────── */
function ReviewSection({ drops, question, level, wrongAttempts }) {
  if (!question?.targets) return null;
  const wrongs = question.targets.filter(t => {
    const placed = drops[t.id];
    return !placed || placed.id !== t.acceptsId;
  });
  if (wrongs.length === 0) return (
    <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 font-semibold text-center">
      🎉 Semua jawaban benar! Luar biasa!
    </div>
  );
  return (
    <div className="mt-4">
      <h3 className="font-bold text-base mb-3 flex items-center gap-2 text-red-600 dark:text-red-400">
        <Lightbulb className="w-5 h-5" /> Pembahasan Jawaban Salah
      </h3>
      <div className="space-y-3">
        {wrongs.map(target => {
          const placed = drops[target.id];
          const correctItem = question.items.find(it => it.id === target.acceptsId);
          const attempts = wrongAttempts[target.id] || 0;
          return (
            <div key={target.id} className="card p-4 border-l-4 border-red-400">
              <p className="font-semibold text-sm mb-2 text-slate-700 dark:text-slate-200">📍 {target.label}</p>
              <div className="flex flex-col gap-1 text-sm mb-3">
                {placed ? (
                  <span className="text-red-600 dark:text-red-400">❌ Jawabanmu: <b>{placed.label}</b></span>
                ) : (
                  <span className="text-slate-400">❌ Tidak dijawab</span>
                )}
                <span className="text-emerald-600 dark:text-emerald-400">✅ Jawaban benar: <b>{correctItem?.label}</b></span>
                {attempts > 0 && <span className="text-amber-500 text-xs">⚠️ Salah {attempts}x · -{attempts * WRONG_PENALTY} poin</span>}
              </div>
              {target.explanation && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-xs text-blue-700 dark:text-blue-300 flex gap-2">
                  <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>{target.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Result Modal ─────────────────────── */
function ResultModal({ score, total, time, xpEarned, onRetry, onNext, showReview, setShowReview, drops, question, level, wrongAttempts }) {
  const pct = Math.round((score / Math.max(total * 10, 1)) * 100);
  const grade = pct >= 90 ? { label: 'Sangat Baik! 🌟', color: 'text-emerald-500' }
    : pct >= 75 ? { label: 'Baik! 👍', color: 'text-blue-500' }
    : pct >= 60 ? { label: 'Cukup 📚', color: 'text-amber-500' }
    : { label: 'Perlu Belajar Lagi 💪', color: 'text-rose-500' };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto pt-10">
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.4 }}
        className="card p-6 max-w-lg w-full mb-10">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{pct >= 75 ? '🎉' : '😅'}</div>
          <h2 className="font-display text-2xl font-black mb-1">{grade.label}</h2>
          <p className={`font-black text-5xl mb-1 ${grade.color}`}>{pct}%</p>
          <p className="text-slate-400 text-sm">{score} poin · {time}s</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-emerald-600">{score}</p>
            <p className="text-xs text-slate-500">Skor</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-amber-600">+{xpEarned} ⚡</p>
            <p className="text-xs text-slate-500">XP Didapat</p>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <button onClick={onRetry} className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm py-2.5">
            <RotateCcw className="w-4 h-4" /> Ulang
          </button>
          <button onClick={onNext} className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm py-2.5">
            Pilih Level <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <button onClick={() => setShowReview(v => !v)}
          className="w-full flex items-center justify-center gap-2 text-sm text-primary-600 dark:text-primary-400 font-semibold py-2 hover:underline">
          <AlertCircle className="w-4 h-4" /> {showReview ? 'Sembunyikan' : 'Lihat'} Pembahasan Jawaban
        </button>

        {showReview && <ReviewSection drops={drops} question={question} level={level} wrongAttempts={wrongAttempts} />}
      </motion.div>
    </motion.div>
  );
}

/* ─── Main GamePage ────────────────────── */
export default function GamePage() {
  const { progress, recordGameResult, addXP } = useProgress();
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }), useSensor(TouchSensor));

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [gameState, setGameState] = useState('idle');
  const [drops, setDrops] = useState({});
  const [wrongAttempts, setWrongAttempts] = useState({}); // targetId -> count
  const [wrongFlashItem, setWrongFlashItem] = useState(null); // itemId that should flash/return
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [sortItems, setSortItems] = useState([]);
  const [orderChecked, setOrderChecked] = useState(false);
  const [orderResult, setOrderResult] = useState(null);
  const [penalty, setPenalty] = useState(0); // total penalty points
  const [showReview, setShowReview] = useState(false);
  const [shuffledTargets, setShuffledTargets] = useState([]);
  const finishedRef = useRef(false);

  const level = selectedLevel ? questions.levels.find(l => l.id === selectedLevel) : null;
  const question = level?.questions?.[0];

  useEffect(() => {
    if (gameState !== 'playing') return;
    if (timeLeft <= 0) { finishGame(); return; }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [gameState, timeLeft]);

  const startGame = (levelId) => {
    setSelectedLevel(levelId);
    const lv = questions.levels.find(l => l.id === levelId);
    setDrops({});
    setWrongAttempts({});
    setWrongFlashItem(null);
    setPenalty(0);
    setOrderChecked(false);
    setOrderResult(null);
    setShowReview(false);
    finishedRef.current = false;
    if (lv.type === 'assembly-order') {
      setSortItems([...lv.questions[0].items].sort(() => Math.random() - 0.5));
    } else {
      setShuffledTargets([...lv.questions[0].targets].sort(() => Math.random() - 0.5));
    }
    setTimeLeft(lv.timeLimit);
    setTimeTaken(0);
    setGameState('playing');
  };

  const finishGame = useCallback(() => {
    if (finishedRef.current || !level || !question) return;
    finishedRef.current = true;
    const taken = level.timeLimit - timeLeft;
    setTimeTaken(taken);

    let score = 0;
    if (level.type === 'assembly-order') {
      score = orderResult?.score || 0;
    } else {
      question.targets.forEach(t => {
        if (drops[t.id]?.id === t.acceptsId) score += 10;
      });
    }
    // Speed bonus: if finished in under half the time
    const bonus = taken < level.timeLimit / 2 ? 5 : 0;
    const total = score + bonus - penalty;
    const finalScore = Math.max(0, total);
    const xpEarned = Math.round(level.xpReward * (finalScore / Math.max(question.targets?.length || question.items?.length, 1) / 10));

    addXP(Math.max(0, xpEarned));
    recordGameResult(level.id, finalScore, taken, question.targets?.length || question.items?.length);
    setGameState('result');
  }, [level, question, drops, timeLeft, orderResult, penalty]);

  const handleDragEnd = ({ active, over }) => {
    if (!over || !level || level.type === 'assembly-order') {
      // If sortable, handle below
      return;
    }

    // Find dragged item in question items
    const dragged = question.items.find(it => it.id === active.id);
    if (!dragged) return;

    // Find target
    const target = question.targets.find(t => t.id === over.id);
    if (!target) return;

    const isCorrect = dragged.id === target.acceptsId;

    if (isCorrect) {
      setDrops(d => ({ ...d, [over.id]: dragged }));
      // Check if all placed correctly — auto-finish
      const newDrops = { ...drops, [over.id]: dragged };
      const allCorrect = question.targets.every(t => newDrops[t.id]?.id === t.acceptsId);
      if (allCorrect) setTimeout(finishGame, 600);
    } else {
      // Wrong answer: flash item, record penalty, do NOT place in target
      setWrongFlashItem(active.id);
      setWrongAttempts(prev => ({ ...prev, [target.id]: (prev[target.id] || 0) + 1 }));
      setPenalty(p => p + WRONG_PENALTY);
      setTimeout(() => setWrongFlashItem(null), 500);
    }
  };

  const handleSortEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    setSortItems(items => {
      const from = items.findIndex(i => i.id === active.id);
      const to = items.findIndex(i => i.id === over.id);
      return arrayMove(items, from, to);
    });
  };

  const checkOrder = () => {
    const items = question.items;
    let correct = 0;
    sortItems.forEach((item, idx) => {
      const found = items.find(it => it.id === item.id);
      if (found && found.correctOrder === idx + 1) correct++;
    });
    const score = correct * 10;
    setOrderResult({ score, correct, total: items.length });
    setOrderChecked(true);
    setTimeout(finishGame, 800);
  };

  const currentScore = level?.type === 'assembly-order'
    ? (orderResult?.score || 0)
    : question?.targets?.filter(t => drops[t.id]?.id === t.acceptsId).length * 10 - penalty;

  const resultTotal = question?.targets?.length || question?.items?.length || 1;
  const resultScore = Math.max(0, currentScore || 0);
  const xpEarned = level ? Math.max(0, Math.round(level.xpReward * (resultScore / (resultTotal * 10)))) : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <Sidebar />
      <main className="flex-1 p-5 md:p-8 w-0 overflow-y-auto min-h-screen">
          <AnimatePresence mode="wait">
            {/* ── Level selector ── */}
            {!selectedLevel && (
              <motion.div key="selector" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <LevelSelector onSelect={startGame} progress={progress} />
              </motion.div>
            )}

            {/* ── Game Playing ── */}
            {selectedLevel && gameState === 'playing' && level && question && (
              <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* HUD */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div>
                    <h1 className="font-display text-2xl font-black">{level.title}</h1>
                    <p className="text-slate-500 text-sm">{question.instruction}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-amber-600 font-bold text-sm">
                      <Star className="w-4 h-4" />
                      {Math.max(0, currentScore)}
                    </div>
                    {penalty > 0 && (
                      <div className="px-3 py-2 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-500 font-bold text-xs">
                        -{penalty} hukuman
                      </div>
                    )}
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-sm ${timeLeft < 20 ? 'bg-red-100 dark:bg-red-900/30 text-red-600 animate-pulse' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                      <Timer className="w-4 h-4" />
                      {timeLeft}s
                    </div>
                    <button onClick={() => { setSelectedLevel(null); setGameState('idle'); }} className="btn-secondary text-xs py-2 px-3">× Keluar</button>
                  </div>
                </div>

                {/* Wrong hint */}
                {penalty > 0 && (
                  <div className="mb-3 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Jawaban salah akan dikembalikan dan mengurangi -{WRONG_PENALTY} poin per percobaan
                  </div>
                )}

                {/* Assembly Order Game */}
                {level.type === 'assembly-order' ? (
                  <div className="max-w-xl">
                    <div className="card p-4 mb-4">
                      <p className="text-sm font-semibold text-slate-500 mb-3">Seret untuk mengurutkan langkah merakit:</p>
                      <DndContext collisionDetection={closestCenter} sensors={sensors} onDragEnd={handleSortEnd}>
                        <SortableContext items={sortItems.map(i => i.id)} strategy={verticalListSortingStrategy}>
                          <div className="space-y-2">
                            {sortItems.map((item, idx) => (
                              <SortableItem key={item.id} id={item.id} label={item.label} emoji={item.emoji} color={item.color} idx={idx} />
                            ))}
                          </div>
                        </SortableContext>
                      </DndContext>
                    </div>
                    {!orderChecked ? (
                      <button onClick={checkOrder} className="btn-primary w-full flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Cek Jawaban
                      </button>
                    ) : (
                      <div className={`mt-2 p-4 rounded-xl text-center font-bold ${orderResult?.correct === orderResult?.total ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {orderResult?.correct} / {orderResult?.total} urutan benar!
                      </div>
                    )}
                    {/* Assembly explanation */}
                    {question.explanation && orderChecked && (
                      <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-sm text-blue-700 dark:text-blue-300 flex gap-2">
                        <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" />
                        <p>{question.explanation}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Drag & Drop Game */
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="grid md:grid-cols-2 gap-5">
                      {/* Items to drag */}
                      <div className="card p-4">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">🫴 Seret ke target:</p>
                        <div className="space-y-2">
                          {question.items
                            .filter(item => !Object.values(drops).find(d => d.id === item.id))
                            .map(item => (
                              <DragItem
                                key={item.id}
                                id={item.id}
                                label={item.label}
                                emoji={item.emoji}
                                color={item.color}
                                wrongFlash={wrongFlashItem === item.id}
                              />
                            ))
                          }
                          {question.items.every(item => Object.values(drops).find(d => d.id === item.id)) && (
                            <p className="text-center py-4 text-slate-400 text-sm">Semua item sudah ditempatkan ✅</p>
                          )}
                        </div>
                      </div>

                      {/* Drop targets */}
                      <div className="card p-4">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">📍 Target:</p>
                        <div className="space-y-2.5">
                          {shuffledTargets.map(target => {
                            const placed = drops[target.id];
                            const isCorrect = placed && placed.id === target.acceptsId;
                            const isWrong = placed && placed.id !== target.acceptsId;
                            return (
                              <DropZoneTarget
                                key={target.id}
                                id={target.id}
                                label={target.label}
                                description={target.description}
                                emoji={target.emoji}
                                filledBy={placed || null}
                                isCorrect={isCorrect}
                                isWrong={isWrong}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button onClick={finishGame} className="btn-primary flex items-center gap-2">
                        <Trophy className="w-4 h-4" /> Selesai & Lihat Nilai
                      </button>
                    </div>
                  </DndContext>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result Modal */}
          {gameState === 'result' && (
            <ResultModal
              score={resultScore}
              total={resultTotal}
              time={timeTaken}
              xpEarned={xpEarned}
              levelId={level?.id}
              showReview={showReview}
              setShowReview={setShowReview}
              drops={drops}
              question={question}
              level={level}
              wrongAttempts={wrongAttempts}
              onRetry={() => startGame(selectedLevel)}
              onNext={() => { setSelectedLevel(null); setGameState('idle'); }}
            />
          )}
      </main>
    </div>
  );
}
