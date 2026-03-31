import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, CheckCircle2, XCircle, RotateCcw, Lightbulb } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import { useProgress } from '../context/ProgressContext';

const evalQuestions = [
  {
    id: 1,
    question: 'Komponen apa yang berfungsi sebagai otak utama komputer?',
    options: ['RAM', 'Motherboard', 'Processor (CPU)', 'Harddisk'],
    answer: 2,
    explanation: 'CPU (Central Processing Unit) dijuluki "otak komputer" karena bertugas memproses SEMUA instruksi program — mulai dari logika, matematika, hingga koordinasi antar komponen. RAM bukan otak; ia hanya penyimpanan sementara.'
  },
  {
    id: 2,
    question: 'Apa singkatan dari RAM dalam komputer?',
    options: ['Read Access Memory', 'Random Access Memory', 'Regular Application Memory', 'Rapid Action Memory'],
    answer: 1,
    explanation: 'RAM = Random Access Memory. "Random Access" berarti CPU bisa mengakses data di RAM secara acak (tidak harus berurutan), sangat cepat, sehingga cocok untuk menyimpan data sementara saat program berjalan.'
  },
  {
    id: 3,
    question: 'Komponen mana yang menyimpan data secara permanen meski komputer mati?',
    options: ['RAM', 'CPU Cache', 'Harddisk/SSD', 'Register CPU'],
    answer: 2,
    explanation: 'HDD/SSD bersifat non-volatile — data tetap tersimpan walau listrik dimatikan. RAM, CPU cache, dan register CPU bersifat volatile (data hilang saat mati). Itulah kenapa OS dan file kamu tersimpan di HDD/SSD, bukan di RAM.'
  },
  {
    id: 4,
    question: 'Fungsi utama Power Supply (PSU) adalah...',
    options: ['Mengolah grafis komputer', 'Mengubah arus AC menjadi DC', 'Menghubungkan semua komponen', 'Menyimpan data sementara'],
    answer: 1,
    explanation: 'PSU mengkonversi tegangan AC (220V dari PLN) menjadi tegangan DC yang dibutuhkan komponen: +12V untuk motor dan CPU, +5V untuk USB dan storage, +3.3V untuk RAM dan komponen digital.'
  },
  {
    id: 5,
    question: 'Slot apa yang digunakan untuk memasang VGA Card pada motherboard?',
    options: ['Slot DIMM', 'Slot M.2', 'Slot PCIe x16', 'Socket LGA'],
    answer: 2,
    explanation: 'VGA Card dipasang di slot PCIe x16 (PCI Express) — slot terpanjang di motherboard yang menyediakan bandwidth tertinggi (hingga 64 GB/s) untuk transfer data dari CPU ke GPU. DIMM untuk RAM, M.2 untuk SSD, LGA untuk CPU.'
  },
  {
    id: 6,
    question: 'Heatsink berfungsi untuk...',
    options: ['Mempercepat processor', 'Menyerap dan membuang panas dari CPU', 'Menambah kapasitas memori', 'Menghubungkan perangkat USB'],
    answer: 1,
    explanation: 'Heatsink adalah pendingin pasif (logam dengan sirip) yang dipasang di atas CPU untuk menyerap panas. Panas dialirkan dari permukaan CPU ke sirip heatsink, lalu dibuang oleh kipas ke udara sekitar.'
  },
  {
    id: 7,
    question: 'Perangkat output apa yang menghasilkan suara dari komputer?',
    options: ['Monitor', 'Printer', 'Scanner', 'Speaker'],
    answer: 3,
    explanation: 'Speaker adalah perangkat output audio. Monitor (output visual), Printer (output cetak), Scanner (perangkat INPUT yang membaca dokumen fisik ke digital).'
  },
  {
    id: 8,
    question: 'Langkah pertama yang benar saat merakit komputer adalah...',
    options: ['Memasang PSU ke casing', 'Menghubungkan kabel power', 'Memasang CPU ke socket motherboard', 'Memasang RAM ke slot DIMM'],
    answer: 2,
    explanation: 'CPU dipasang PERTAMA karena lebih mudah dilakukan saat motherboard belum masuk casing. Setelah CPU, pasang heatsink, lalu RAM — semuanya di meja sebelum motherboard dipasang ke casing.'
  },
  {
    id: 9,
    question: 'SSD lebih unggul dari HDD karena...',
    options: ['Harganya lebih murah', 'Kapasitasnya lebih besar', 'Kecepatannya jauh lebih tinggi', 'Lebih berat dan tahan lama'],
    answer: 2,
    explanation: 'SSD menggunakan flash memory (seperti USB) tanpa komponen mekanik bergerak, sehingga kecepatannya 5–10x lebih tinggi dari HDD. HDD lebih murah per GB dan kapasitasnya lebih besar, tapi lambat karena piringan mekanisnya.'
  },
  {
    id: 10,
    question: 'Komponen mana yang berfungsi menghubungkan semua komponen komputer?',
    options: ['RAM', 'CPU', 'Motherboard', 'VGA Card'],
    answer: 2,
    explanation: 'Motherboard adalah "papan induk" yang menyediakan slot, socket, dan jalur komunikasi (bus) untuk semua komponen. Tanpa motherboard, CPU tidak bisa mengakses RAM dan storage tidak bisa mengirim data ke CPU.'
  },
  {
    id: 11,
    question: 'Jika kamu menyalakan komputer dan layar tidak menampilkan apa-apa, padahal mesin hidup, kemungkinan perangkat apa yang bermasalah?',
    options: ['VGA Card / RAM', 'Harddisk', 'Sound Card', 'Casing'],
    answer: 0,
    explanation: 'Tidak ada tampilan (No Display) atau blank screen paling sering disebabkan oleh RAM yang kotor/longgar atau VGA Card yang bermasalah. Keduanya terkait langsung dengan pengiriman sinyal visual saat komputer POST (Power-On Self-Test).'
  },
  {
    id: 12,
    question: 'Kabel yang menghubungkan monitor modern beresolusi tinggi (4K) dengan VGA Card biasanya disebut...',
    options: ['Kabel USB', 'Kabel LAN', 'Kabel Power', 'Kabel HDMI / DisplayPort'],
    answer: 3,
    explanation: 'HDMI dan DisplayPort adalah standar kabel digital canggih saat ini yang mampu menghantar video 4K+FPS tinggi sekaligus dengan audio dari PC (VGA Card) ke Monitor.'
  },
  {
    id: 13,
    question: 'Untuk komputer spesifikasi gaming berat yang memakai VGA tingkat ekstrem dan Prosesor besar, besaran PSU apa yang paling direkomendasikan?',
    options: ['300 Watt', '450 Watt', '750 Watt atau lebih', 'Bebas, Watt tidak penting'],
    answer: 2,
    explanation: 'Hardware kelas atas menyedot daya besar (VGA bisa >300W sendiri, CPU >150W), sehingga dibutuhkan Power Supply kapastias besar minimal 750 Watt agar suplai daya tidak drop saat bermain game.'
  },
  {
    id: 14,
    question: 'Saat meng-install ulang atau merakit dari 0, ke manakah sistem operasi Windows biasanya dipasang agar komputer bisa booting dengan cepat?',
    options: ['Flashdisk penyimpan data', 'Ke dalam SSD utama', 'Ke dalam RAM', 'Ke dalam VGA Card'],
    answer: 1,
    explanation: 'Windows harus diinstal ke dalam penyimpanan permanen utama (sebaiknya SSD agar sangat kencang). Meng-install di SSD membuat proses boot-up jauh lebih cepat ketimbang di Harddisk kuno.'
  },
  {
    id: 15,
    question: 'Motherboard memiliki chip utama yang mengatur pembagian dan komunikasi lalu lintas data ke berbagai slot (seperti ke USB, SATA, audio). Namanya adalah?',
    options: ['Chipset', 'BIOS', 'Processor Socket', 'Bluetooth'],
    answer: 0,
    explanation: 'Chipset adalah sekumpulan sirkuit pembantu processor yang mengendalikan lalu lintas I/O (Input/Output) perangkat sekunder di sekitar Motherboard.'
  }
];

function getGrade(pct) {
  if (pct >= 90) return { label: 'Sangat Baik', color: 'text-emerald-500', emoji: '🌟' };
  if (pct >= 75) return { label: 'Baik', color: 'text-blue-500', emoji: '👍' };
  if (pct >= 60) return { label: 'Cukup', color: 'text-amber-500', emoji: '📚' };
  return { label: 'Perlu Belajar Lagi', color: 'text-rose-500', emoji: '💪' };
}

export default function EvaluasiPage() {
  const { addXP, recordGameResult } = useProgress();
  const [mode, setMode] = useState('intro');
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [showAllReview, setShowAllReview] = useState(false);

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
    if (qIdx < evalQuestions.length - 1) {
      setTimeout(() => setCurrent(qIdx + 1), 700);
    } else {
      setTimeout(finishQuiz, 700);
    }
  };

  const finishQuiz = () => {
    const correct = evalQuestions.filter((q, i) => answers[i] === q.answer).length;
    const score = correct * 10;
    const time = Math.round((Date.now() - startTime) / 1000);
    addXP(correct * 5);
    recordGameResult('eval', score, time, evalQuestions.length);
    setMode('result');
  };

  const correct = evalQuestions.filter((q, i) => answers[i] === q.answer).length;
  const pct = Math.round((correct / evalQuestions.length) * 100);
  const grade = getGrade(pct);
  const q = evalQuestions[current];
  const wrongAnswers = evalQuestions.filter((q, i) => answers[i] !== undefined && answers[i] !== q.answer);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 w-0 overflow-y-auto min-h-screen">
          <AnimatePresence mode="wait">
            {/* ── Intro ── */}
            {mode === 'intro' && (
              <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="font-display text-3xl font-black mb-2">Evaluasi Belajar 📝</h1>
                <p className="text-slate-500 mb-8">Uji pemahamanmu tentang komponen komputer</p>
                <div className="max-w-md card p-8 text-center">
                  <div className="text-6xl mb-4">📋</div>
                  <h2 className="font-bold text-2xl mb-2">Soal Evaluasi</h2>
                  <p className="text-slate-500 mb-6">{evalQuestions.length} soal pilihan ganda · setiap jawaban salah ditampilkan penjelasannya</p>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl"><p className="font-bold text-lg">{evalQuestions.length}</p><p className="text-xs text-slate-500">Soal</p></div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl"><p className="font-bold text-lg">10</p><p className="text-xs text-slate-500">Poin/soal</p></div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl"><p className="font-bold text-lg">~5m</p><p className="text-xs text-slate-500">Estimasi</p></div>
                  </div>
                  <button onClick={startQuiz} className="btn-primary w-full flex items-center justify-center gap-2">
                    <ClipboardList className="w-5 h-5" /> Mulai Evaluasi
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Quiz ── */}
            {mode === 'quiz' && (
              <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
                <div className="flex items-center justify-between mb-2 text-sm text-slate-500">
                  <span>Soal {current + 1} dari {evalQuestions.length}</span>
                  <span><CheckCircle2 className="w-4 h-4 text-emerald-500 inline mr-1" />{Object.keys(answers).length} dijawab</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-5 overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                    animate={{ width: `${((current + 1) / evalQuestions.length) * 100}%` }} transition={{ duration: 0.4 }} />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                    className="card p-6">
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
                            className={`w-full text-left p-4 rounded-xl border-2 font-medium text-sm transition-all
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

                    {/* Show explanation right after answering wrong */}
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
            {mode === 'result' && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl">
                <div className="card p-8 text-center mb-5">
                  <div className="text-6xl mb-3">{grade.emoji}</div>
                  <h2 className="font-display text-3xl font-black mb-1">{grade.label}</h2>
                  <p className={`text-6xl font-display font-black mb-2 ${grade.color}`}>{pct}%</p>
                  <p className="text-slate-500">{correct} dari {evalQuestions.length} soal benar</p>
                  <div className="grid grid-cols-2 gap-4 my-5">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4">
                      <p className="text-2xl font-black text-emerald-600">{correct * 10}</p><p className="text-xs text-slate-500">Skor</p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
                      <p className="text-2xl font-black text-amber-600">+{correct * 5} ⚡</p><p className="text-xs text-slate-500">XP Didapat</p>
                    </div>
                  </div>
                  <button onClick={startQuiz} className="btn-primary flex items-center justify-center gap-2 w-full">
                    <RotateCcw className="w-4 h-4" /> Coba Lagi
                  </button>
                </div>

                {/* Wrong answers with explanation */}
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
                      {evalQuestions.map((q, i) => {
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
