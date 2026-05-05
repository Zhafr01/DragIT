import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Monitor, Gamepad2, BookOpen, Trophy, Users, Star, ChevronRight, Cpu, HardDrive, Keyboard, Zap, Target, BarChart3 } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import heroImage from '../assets/hero.png';
import heroDarkImage from '../assets/hero_dark.png';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

function AnimatedSection({ children, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'} transition={{ duration: 0.6 }} className={className}>
      {children}
    </motion.div>
  );
}

const features = [
  { icon: BookOpen, title: '5 Bab Materi', desc: 'Dari pengenalan komputer hingga cara merakit, terstruktur dan mudah dipahami.', color: 'blue', emoji: '📚' },
  { icon: Gamepad2, title: '4 Level Game', desc: 'Game drag and drop seru dari mengenal nama komponen hingga merakit komputer lengkap.', color: 'violet', emoji: '🎮' },
  { icon: Trophy, title: 'Sistem Poin & Badge', desc: 'Kumpulkan XP, naik level, dan raih badge keren untuk setiap pencapaian belajar.', color: 'amber', emoji: '🏆' },
  { icon: BarChart3, title: 'Pantau Progres', desc: 'Admin dapat memantau perkembangan belajar setiap siswa secara real-time.', color: 'emerald', emoji: '📊' },
  { icon: Target, title: 'Evaluasi Mandiri', desc: 'Ujian mandiri untuk mengukur pemahaman dengan sistem penilaian otomatis.', color: 'rose', emoji: '✅' },
  { icon: Zap, title: 'Mode Gelap/Terang', desc: 'Tampilan nyaman baik siang maupun malam, dilengkapi animasi yang menarik.', color: 'orange', emoji: '🌙' },
];

const stats = [
  { value: '5', label: 'Bab Materi', icon: BookOpen },
  { value: '4', label: 'Level Game', icon: Gamepad2 },
  { value: '14+', label: 'Komponen', icon: Cpu },
  { value: '7', label: 'Badge Pencapaian', icon: Trophy },
];

const colorMap = {
  blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  violet: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400',
  amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
  rose: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
  orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-10 overflow-hidden bg-white dark:bg-slate-950">
        <div className="relative w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="z-10 mt-10 md:mt-0">
            <h1 className="font-display text-[3.5rem] sm:text-6xl lg:text-[5.5rem] font-black leading-[1.1] mb-6 text-slate-900 dark:text-white tracking-tight">
              DragIT:<br/>
              Belajar<br/>
              Hardware<br/>
              Jadi Seru!
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-bold leading-snug mb-10 md:w-4/5">
              Platform LMS Gamifikasi<br/>
              untuk Siswa SMK
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="btn-primary text-lg gap-2 flex items-center py-4 px-8">
                Mulai Belajar Beneran! <ChevronRight className="w-6 h-6" />
              </Link>
              <Link to="/login" className="btn-secondary text-lg flex items-center py-4 px-8">
                Masuk
              </Link>
            </div>
          </motion.div>

          {/* Hero illustration */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex justify-center xl:justify-end relative order-first md:order-last">
            <img src={heroImage} alt="DragIT Boy holding computer parts" className="w-[120%] md:w-full max-w-lg lg:max-w-xl xl:max-w-2xl drop-shadow-md object-contain dark:hidden" />
            <img src={heroDarkImage} alt="DragIT Boy holding computer parts" className="w-[120%] md:w-full max-w-lg lg:max-w-xl xl:max-w-2xl drop-shadow-lg object-contain hidden dark:block" />
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-primary-600 dark:bg-primary-700 py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center text-white">
              <s.icon className="w-6 h-6 mx-auto mb-2 opacity-80" />
              <p className="font-display font-black text-3xl">{s.value}</p>
              <p className="text-primary-100 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-14">
          <span className="badge bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">✨ Fitur Unggulan</span>
          <h2 className="font-display text-4xl font-black mb-4">Kenapa Belajar di <span className="text-gradient">DragIT?</span></h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">Platform yang dirancang khusus untuk membuat belajar hardware komputer jadi mudah, menyenangkan, dan efektif.</p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <AnimatedSection key={f.title}>
              <motion.div whileHover={{ y: -4, scale: 1.02 }} className="card p-6 h-full cursor-default">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 ${colorMap[f.color]}`}>
                  {f.emoji}
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <h2 className="font-display text-4xl font-black mb-4">Cara <span className="text-gradient">Mulai Belajar</span></h2>
            <p className="text-slate-500 dark:text-slate-400">4 langkah mudah untuk mulai perjalanan belajarmu</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Daftar Akun', desc: 'Buat akun siswa gratis dalam hitungan detik', emoji: '📝' },
              { step: '02', title: 'Pilih Materi', desc: 'Baca materi komponen komputer yang menarik', emoji: '📚' },
              { step: '03', title: 'Main Game', desc: 'Uji pengetahuan dengan game drag and drop seru', emoji: '🎮' },
              { step: '04', title: 'Raih Badge', desc: 'Kumpulkan poin, naik level, dan raih pencapaian', emoji: '🏆' },
            ].map((s) => (
              <AnimatedSection key={s.step}>
                <div className="text-center">
                  <div className="w-14 h-14 bg-primary-600 text-white rounded-2xl flex items-center justify-center font-display font-black text-xl mx-auto mb-3">{s.step}</div>
                  <div className="text-3xl mb-2">{s.emoji}</div>
                  <h3 className="font-bold mb-1">{s.title}</h3>
                  <p className="text-slate-500 text-sm">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white text-center">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-4">Siap Jadi Ahli Komputer? 🚀</h2>
          <p className="text-primary-200 text-lg mb-8 max-w-xl mx-auto">Bergabung dengan ribuan siswa SMK yang sudah belajar komponen komputer dengan cara yang menyenangkan.</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-primary-700 hover:bg-primary-50 font-bold text-lg px-8 py-4 rounded-2xl transition-all hover:scale-105 shadow-xl">
            Mulai Sekarang – Gratis! <ChevronRight className="w-5 h-5" />
          </Link>
          <p className="text-primary-300 text-sm mt-4">Tidak perlu kartu kredit • Gratis selamanya</p>
        </AnimatedSection>
      </section>

      <Footer />
    </div>
  );
}
