import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDraggable, useDroppable, DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { CheckCircle2, XCircle, RotateCcw, Trophy, Lightbulb, ChevronLeft } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import { useProgress } from '../context/ProgressContext';

/* ─── Motherboard Layout Data ─────────── */
const MOTHERBOARD_SLOTS = [
  {
    id: 'cpu-socket',
    name: 'Socket CPU',
    x: 42, y: 15, w: 16, h: 16,
    acceptsId: 'cpu',
    hint: 'Slot persegi besar di tengah atas board',
    explanation: 'CPU dipasang di Socket CPU (mis. LGA1700). Area ini dikelilingi kapasitor dan harus dipasang dengan hati-hati agar pin tidak bengkok.'
  },
  {
    id: 'dimm-1',
    name: 'Slot DIMM 1',
    x: 72, y: 12, w: 6, h: 34,
    acceptsId: 'ram',
    hint: 'Slot panjang vertikal di kanan CPU',
    explanation: 'Slot DIMM (Dual Inline Memory Module) adalah tempat RAM dipasang. Biasanya ada 2–4 slot. Pasang di slot 2 & 4 untuk dual-channel.'
  },
  {
    id: 'pcie-x16',
    name: 'Slot PCIe x16',
    x: 10, y: 55, w: 60, h: 7,
    acceptsId: 'vga',
    hint: 'Slot panjang horizontal di tengah board',
    explanation: 'Slot PCIe x16 adalah slot terpanjang, digunakan untuk VGA Card. Memberikan bandwidth tinggi hingga 64 GB/s untuk render grafis.'
  },
  {
    id: 'm2-slot',
    name: 'Slot M.2',
    x: 20, y: 70, w: 22, h: 4,
    acceptsId: 'ssd',
    hint: 'Slot horizontal kecil di bawah PCIe',
    explanation: 'Slot M.2 digunakan untuk SSD NVMe. SSD M.2 jauh lebih cepat dari SATA karena langsung terhubung ke jalur PCIe CPU.'
  },
  {
    id: 'atx-power',
    name: 'Konektor ATX 24-pin',
    x: 82, y: 48, w: 8, h: 18,
    acceptsId: 'psu',
    hint: 'Konektor besar di sisi kanan board',
    explanation: 'Konektor ATX 24-pin menghubungkan PSU ke motherboard untuk menyuplai daya ke semua komponen melalui jalur power di PCB.'
  },
];

const COMPONENTS = [
  { id: 'cpu', label: 'Processor (CPU)', image: '/components/cpu.png', color: 'bg-blue-100 border-blue-400 text-blue-700', desc: 'Intel/AMD processor' },
  { id: 'ram', label: 'RAM DDR4 8GB', image: '/components/ram.png', color: 'bg-violet-100 border-violet-400 text-violet-700', desc: 'Memory module' },
  { id: 'vga', label: 'VGA Card RTX', image: '/components/vga.png', color: 'bg-red-100 border-red-400 text-red-700', desc: 'Graphics card' },
  { id: 'ssd', label: 'SSD NVMe 512GB', image: '/components/ssd.png', color: 'bg-emerald-100 border-emerald-400 text-emerald-700', desc: 'Storage drive' },
  { id: 'psu', label: 'Kabel ATX PSU', image: '/components/psu.png', color: 'bg-yellow-100 border-yellow-400 text-yellow-700', desc: 'Power connector' },
];

/* ─── Draggable Component Card ─────── */
function DragComponent({ id, label, image, color, desc, wrongFlash }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = transform ? { transform: `translate(${transform.x}px,${transform.y}px)`, zIndex: 50 } : {};
  return (
    <motion.div ref={setNodeRef} style={style} {...listeners} {...attributes}
      animate={wrongFlash ? { x: [0, -8, 8, -6, 6, 0] } : {}}
      transition={{ duration: 0.35 }}
      className={`drag-item flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 bg-white dark:bg-slate-800 ${color.replace(/bg-\w+-\d+/, '')} ${wrongFlash ? 'ring-2 ring-red-400' : ''} cursor-grab shadow-sm`}>
      <img src={image} alt={label} className="w-12 h-12 object-contain mix-blend-multiply dark:mix-blend-normal bg-white rounded-md p-1" />
      <div>
        <p className="font-bold text-sm">{label}</p>
        <p className="text-xs opacity-70">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ─── Motherboard Slot Zone ─────────── */
function SlotZone({ slot, placed, isOver, isCorrect, isWrong }) {
  const { setNodeRef } = useDroppable({ id: slot.id });
  return (
    <div ref={setNodeRef}
      style={{ left: `${slot.x}%`, top: `${slot.y}%`, width: `${slot.w}%`, height: `${slot.h}%`, position: 'absolute' }}
      className={`rounded border-2 transition-all flex items-center justify-center text-[9px] font-bold overflow-hidden
        ${isCorrect ? 'bg-green-400/30 border-green-400' :
          isWrong ? 'bg-red-400/30 border-red-400 animate-shake' :
          isOver ? 'bg-primary-300/40 border-primary-400 scale-[1.03]' :
          'border-dashed border-amber-400/60 bg-amber-50/20'}`}>
      {placed ? (
        <div className="flex flex-col items-center justify-center w-full h-full p-1 bg-white/10 backdrop-blur-sm rounded">
          <img src={placed.image} alt={placed.label} className="w-full h-full object-contain drop-shadow-md" />
          <div className="absolute top-1 right-1 bg-white rounded-full shadow-sm">
            {isCorrect && <CheckCircle2 className="w-4 h-4 text-green-500" />}
            {isWrong && <XCircle className="w-4 h-4 text-red-500" />}
          </div>
        </div>
      ) : (
        <span className="text-amber-600 dark:text-amber-400 text-center px-1 leading-tight">{slot.name}</span>
      )}
    </div>
  );
}

/* ─── Main MotherboardGame ─────────────── */
export default function MotherboardGame() {
  const { addXP, recordGameResult } = useProgress();
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }), useSensor(TouchSensor));
  const [drops, setDrops] = useState({});
  const [wrongAttempts, setWrongAttempts] = useState({});
  const [wrongFlash, setWrongFlash] = useState(null);
  const [phase, setPhase] = useState('intro'); // intro | playing | result
  const [showReview, setShowReview] = useState(false);
  const [overSlot, setOverSlot] = useState(null);
  const [penalty, setPenalty] = useState(0);

  const handleDragOver = ({ over }) => setOverSlot(over?.id || null);

  const handleDragEnd = ({ active, over }) => {
    setOverSlot(null);
    if (!over) return;
    const comp = COMPONENTS.find(c => c.id === active.id);
    const slot = MOTHERBOARD_SLOTS.find(s => s.id === over.id);
    if (!comp || !slot) return;

    if (comp.id === slot.acceptsId) {
      setDrops(d => ({ ...d, [slot.id]: comp }));
      const newDrops = { ...drops, [slot.id]: comp };
      if (MOTHERBOARD_SLOTS.every(s => newDrops[s.id]?.id === s.acceptsId)) {
        setTimeout(() => finishGame(newDrops), 500);
      }
    } else {
      // Wrong — bounce back
      setWrongFlash(active.id);
      setWrongAttempts(prev => ({ ...prev, [slot.id]: (prev[slot.id] || 0) + 1 }));
      setPenalty(p => p + 3);
      setTimeout(() => setWrongFlash(null), 400);
    }
  };

  const finishGame = (finalDrops = drops) => {
    const correct = MOTHERBOARD_SLOTS.filter(s => finalDrops[s.id]?.id === s.acceptsId).length;
    const score = correct * 10 - penalty;
    const xp = Math.max(0, Math.round(50 * (score / 50)));
    addXP(xp);
    recordGameResult('motherboard', Math.max(0, score), 0, MOTHERBOARD_SLOTS.length);
    setPhase('result');
  };

  const reset = () => {
    setDrops({});
    setWrongAttempts({});
    setWrongFlash(null);
    setPenalty(0);
    setShowReview(false);
    setPhase('playing');
  };

  const correct = MOTHERBOARD_SLOTS.filter(s => drops[s.id]?.id === s.acceptsId).length;
  const pct = Math.round((correct / MOTHERBOARD_SLOTS.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <Sidebar />
      <main className="flex-1 p-5 md:p-8 w-0 overflow-y-auto min-h-screen">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <button onClick={() => window.history.back()} className="btn-secondary py-2 px-3 flex items-center gap-1 text-sm">
              <ChevronLeft className="w-4 h-4" /> Kembali
            </button>
            <div>
              <h1 className="font-display text-2xl font-black">🖥️ Rakit Motherboard</h1>
              <p className="text-slate-500 text-sm">Seret komponen ke posisi yang tepat di motherboard</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* ── Intro ── */}
            {phase === 'intro' && (
              <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md card p-8 text-center">
                <div className="text-6xl mb-4">🖥️</div>
                <h2 className="font-bold text-2xl mb-2">Game Motherboard</h2>
                <p className="text-slate-500 mb-2">Pasang {COMPONENTS.length} komponen ke slot yang benar pada diagram motherboard.</p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mb-6">⚠️ Jawaban salah = -3 poin dan komponen kembali ke tempatnya</p>
                <button onClick={() => setPhase('playing')} className="btn-primary w-full">Mulai Game</button>
              </motion.div>
            )}

            {/* ── Playing ── */}
            {phase === 'playing' && (
              <motion.div key="play" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                {penalty > 0 && (
                  <div className="text-sm text-red-500 flex items-center gap-1">
                    ⚠️ Total penalti: -{penalty} poin
                  </div>
                )}
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
                  <div className="flex flex-col lg:flex-row gap-5">
                    {/* Motherboard Board */}
                    <div className="flex-1">
                      <div className="relative w-full rounded-2xl border-4 border-emerald-800/40 bg-gradient-to-br from-emerald-950 to-emerald-900 overflow-hidden shadow-2xl"
                        style={{ paddingTop: '75%' }}>
                        {/* Board traces decoration */}
                        <div className="absolute inset-0 opacity-20"
                          style={{ backgroundImage: 'repeating-linear-gradient(0deg, #4ade80 0, #4ade80 1px, transparent 0, transparent 20px), repeating-linear-gradient(90deg, #4ade80 0, #4ade80 1px, transparent 0, transparent 20px)' }} />

                        {/* Board label */}
                        <div className="absolute top-2 left-3 text-emerald-400/70 text-xs font-mono">DRAGIT-X570 ATX v1.0</div>

                        {/* Slots */}
                        {MOTHERBOARD_SLOTS.map(slot => {
                          const placed = drops[slot.id];
                          const isCorrect = placed?.id === slot.acceptsId;
                          const isWrong = placed && placed.id !== slot.acceptsId;
                          return (
                            <SlotZone
                              key={slot.id}
                              slot={slot}
                              placed={placed || null}
                              isOver={overSlot === slot.id}
                              isCorrect={isCorrect}
                              isWrong={isWrong}
                            />
                          );
                        })}

                        {/* Hint labels */}
                        {MOTHERBOARD_SLOTS.filter(s => !drops[s.id]).map(slot => (
                          <div key={`hint-${slot.id}`}
                            style={{ left: `${slot.x + slot.w + 0.5}%`, top: `${slot.y}%`, position: 'absolute' }}
                            className="text-[8px] text-emerald-400/60 max-w-[80px] leading-tight hidden lg:block">
                            {slot.hint}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Component Panel */}
                    <div className="w-full lg:w-64 shrink-0">
                      <div className="card p-4">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">🫴 Komponen — Seret ke Board</p>
                        <div className="space-y-2">
                          {COMPONENTS.filter(c => !Object.values(drops).find(d => d.id === c.id)).map(comp => (
                            <DragComponent
                              key={comp.id}
                              id={comp.id}
                              label={comp.label}
                              image={comp.image}
                              color={comp.color}
                              desc={comp.desc}
                              wrongFlash={wrongFlash === comp.id}
                            />
                          ))}
                          {COMPONENTS.every(c => Object.values(drops).find(d => d.id === c.id)) && (
                            <p className="text-center text-sm text-slate-400 py-3">Semua terpasang ✅</p>
                          )}
                        </div>

                        <button onClick={() => finishGame()} className="btn-primary w-full mt-4 flex items-center justify-center gap-2 text-sm py-2.5">
                          <Trophy className="w-4 h-4" /> Selesai & Nilai
                        </button>
                      </div>
                    </div>
                  </div>
                </DndContext>
              </motion.div>
            )}

            {/* ── Result ── */}
            {phase === 'result' && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl">
                <div className="card p-8 text-center mb-5">
                  <div className="text-5xl mb-3">{pct >= 80 ? '🎉' : '📚'}</div>
                  <h2 className="font-display text-2xl font-black mb-1">{pct >= 80 ? 'Luar Biasa!' : 'Perlu Latihan Lagi'}</h2>
                  <p className={`font-black text-5xl mb-1 ${pct >= 80 ? 'text-emerald-500' : 'text-amber-500'}`}>{pct}%</p>
                  <p className="text-slate-400 text-sm">{correct}/{MOTHERBOARD_SLOTS.length} komponen benar · -{penalty} poin penalti</p>
                  <button onClick={reset} className="btn-primary flex items-center justify-center gap-2 w-full mt-5">
                    <RotateCcw className="w-4 h-4" /> Main Lagi
                  </button>
                </div>

                {/* Review */}
                <div className="card p-5">
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Lightbulb className="w-5 h-5" /> Pembahasan Slot Motherboard
                  </h3>
                  <div className="space-y-3">
                    {MOTHERBOARD_SLOTS.map(slot => {
                      const placed = drops[slot.id];
                      const correctComp = COMPONENTS.find(c => c.id === slot.acceptsId);
                      const isCorrect = placed?.id === slot.acceptsId;
                      const attempts = wrongAttempts[slot.id] || 0;
                      return (
                        <div key={slot.id} className={`p-4 rounded-xl border-l-4 ${isCorrect ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : 'border-red-400 bg-red-50 dark:bg-red-900/20'}`}>
                          <div className="flex items-start gap-3">
                            {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />}
                            <div className="flex-1">
                              <p className="font-bold text-sm">{slot.name}</p>
                              {!isCorrect && placed && <p className="text-red-600 text-xs mt-1">❌ Kamu pasang: {placed.label}</p>}
                              <p className="text-emerald-600 text-xs font-medium">✅ Seharusnya: {correctComp?.label}</p>
                              {attempts > 0 && <p className="text-amber-500 text-xs">⚠️ Salah {attempts}x ({attempts * 3} poin dikurangi)</p>}
                              <div className="mt-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2.5 text-xs text-blue-700 dark:text-blue-300 flex gap-1.5">
                                <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                <span>{slot.explanation}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
      </main>
    </div>
  );
}
