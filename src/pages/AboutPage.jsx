import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Code2, BookOpen, Gamepad2, GraduationCap, Zap, Monitor } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';

const team = [
  { name: 'Reva Aliya Putri Purwanto', role: 'UI/UX Designer', coverImage: '/avatars/reva_cover.png', image: '/Reva.png', desc: 'Merancang desain antarmuka, ilustrasi komponen, dan sistem gamifikasi belajar.' },
  { name: 'Muhammad Zhafier Ardine Yudhistira', role: 'Lead Developer', coverImage: '/avatars/zhafier_cover.jpeg', image: '/Zhafier.png', desc: 'Mengelola pengembangan aplikasi dan menulis sistem Drag & Drop platform.' },
  { name: 'Yopin Winda Holimatus Syadiya', role: 'Kurikulum & Materi', coverImage: '/avatars/yopin_cover.jpeg', image: '/Yopin.png', desc: 'Menyusun seluruh materi pembelajaran dan soal kuis khusus untuk anak SMK TKJ.' },
];

const features = [
  { icon: BookOpen, color: 'from-blue-500 to-blue-600', title: 'Materi Visual', desc: 'Materi pembelajaran komponen komputer yang disajikan secara visual dan mudah dipahami.' },
  { icon: Gamepad2, color: 'from-violet-500 to-violet-600', title: 'Game Drag & Drop', desc: 'Belajar sambil bermain dengan game interaktif yang mengasyikkan.' },
  { icon: Zap, color: 'from-amber-500 to-amber-600', title: 'Sistem XP & Badge', desc: 'Raih pengalaman dan lencana untuk setiap pencapaian belajarmu.' },
  { icon: GraduationCap, color: 'from-emerald-500 to-emerald-600', title: 'Evaluasi Komprehensif', desc: 'Uji pemahamanmu dengan kuis per bab dan ujian akhir komprehensif.' },
];

const techStack = ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Laravel', 'MySQL', '@dnd-kit'];

function TeamCard({ member, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 + index * 0.1 }}
      className="cursor-pointer"
      style={{ height: '340px', position: 'relative' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* ── DEFAULT COVER ── */}
      <div
        style={{
          position: 'absolute', inset: 0,
          opacity: open ? 0 : 1,
          filter: open ? 'blur(14px)' : 'blur(0px)',
          transform: open ? 'scale(0.93)' : 'scale(1)',
          transition: 'opacity 1s ease, filter 1s ease, transform 1s ease',
          pointerEvents: open ? 'none' : 'auto',
        }}
        className="card flex flex-col items-center justify-center gap-5 p-8"
      >
        {/* DragIT logo */}
        <div className="flex items-center gap-2">
          <span className="font-display font-black text-2xl text-slate-800 dark:text-white tracking-tight">
            Drag<span className="text-primary-600">IT</span>
          </span>
        </div>
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30 overflow-hidden">
          <img
            src={member.coverImage}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <p className="font-bold text-base text-slate-800 dark:text-slate-100">{member.name}</p>
          <p className="text-primary-600 dark:text-primary-400 font-semibold text-xs uppercase tracking-wider mt-1">{member.role}</p>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 italic">Hover untuk lihat foto ✨</p>
      </div>

      {/* ── REVEAL ── */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, top: '-120px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'flex-end',
          opacity: open ? 1 : 0,
          filter: open ? 'blur(0px)' : 'blur(18px)',
          transform: open ? 'translateY(0)' : 'translateY(18px) scale(0.95)',
          transition: 'opacity 1s ease, filter 1s ease, transform 1s ease',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <div className="w-full h-72 flex items-end justify-center">
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            style={{
              width: '100%', height: '100%',
              objectFit: 'contain', objectPosition: 'bottom',
              transform: open ? 'scale(1.28)' : 'scale(0.95)',
              transition: 'transform 1.1s ease',
              transformOrigin: 'bottom center',
            }}
          />
        </div>
        <div
          className="relative z-10 w-full card p-6 bg-white/95 dark:bg-slate-800/95 shadow-2xl backdrop-blur-md"
          style={{
            marginTop: '-2rem',
            transform: open ? 'translateY(0)' : 'translateY(14px)',
            transition: 'transform 1s ease 0.1s',
          }}
        >
          <h3 className="font-bold text-lg mb-1 text-center">{member.name}</h3>
          <p className="text-primary-600 dark:text-primary-400 font-semibold text-xs uppercase tracking-wider mb-3 text-center">{member.role}</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed text-center">{member.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 w-0 overflow-y-auto min-h-screen">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="card p-8 md:p-12 bg-gradient-to-br from-primary-600 to-primary-800 border-0 text-white text-center mb-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-7xl mb-4">🖥️</motion.div>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-3">
              Drag<span className="text-accent-400">IT</span>
            </h1>
            <p className="text-primary-200 text-lg max-w-xl mx-auto">
              Platform Media Pembelajaran Interaktif Komponen Komputer untuk Siswa SMK
            </p>
          </div>
        </motion.div>

        {/* Tentang */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-8 mb-8">
          <h2 className="font-display text-2xl font-black mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500" /> Tentang Kami
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base mb-4">
            <strong className="text-slate-800 dark:text-slate-100">DragIT</strong> adalah platform media pembelajaran interaktif yang dirancang khusus untuk siswa SMK jurusan Teknik Komputer dan Jaringan (TKJ). Platform ini hadir untuk mempermudah pemahaman siswa tentang <em>komponen-komponen komputer</em> melalui pendekatan yang menyenangkan dan berbasis gamifikasi.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
            Dengan menggabungkan <strong>materi visual</strong>, <strong>game drag and drop</strong>, dan <strong>sistem evaluasi yang cerdas</strong>, DragIT menjadikan proses belajar lebih efektif, interaktif, dan tidak membosankan.
          </p>
        </motion.div>

        {/* Fitur */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <h2 className="font-display text-2xl font-black mb-5">✨ Fitur Unggulan</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06 }}
                className="card p-5 flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center shrink-0`}>
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1">{f.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tim Kami */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-10">
          <h2 className="font-display text-2xl font-black mb-5 text-center">👨‍💻 Tim Pengembang DragIT</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="card p-8 mb-8">
          <h2 className="font-display text-2xl font-black mb-5 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-primary-500" /> Teknologi yang Digunakan
          </h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold text-sm border border-primary-100 dark:border-primary-800/50">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Visi & Misi */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card p-6 border-l-4 border-primary-500">
            <h3 className="font-bold text-lg mb-3 text-primary-600 dark:text-primary-400">🎯 Visi</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Menjadi platform media pembelajaran digital terdepan yang membuat proses belajar komponen komputer menjadi pengalaman yang menyenangkan, mudah, dan efektif bagi seluruh siswa SMK di Indonesia.
            </p>
          </div>
          <div className="card p-6 border-l-4 border-accent-500">
            <h3 className="font-bold text-lg mb-3 text-accent-600 dark:text-accent-400">🚀 Misi</h3>
            <ul className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-2">
              <li>• Menyediakan materi visual yang mudah dipahami</li>
              <li>• Menghadirkan game edukasi yang meningkatkan minat belajar</li>
              <li>• Mendorong siswa berprestasi melalui sistem gamifikasi</li>
              <li>• Mempersiapkan siswa SMK untuk dunia kerja teknologi</li>
            </ul>
          </div>
        </motion.div>

        {/* Redirect to Diagrams */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="card p-8 mb-8 text-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-slate-800 dark:to-slate-900 border-primary-200 dark:border-primary-800">
          <h2 className="font-display text-2xl font-black mb-3">Arsitektur & Basis Data</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
            Ingin tahu lebih dalam mengenai struktur *database* yang kami gunakan atau alur kerja sistem drag-and-drop ini?
          </p>
          <button onClick={() => window.location.href = '/dashboard/diagrams'} className="btn-primary shadow-xl shadow-primary-500/20">
            Lihat Skema DFD & ERD
          </button>
        </motion.div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-center text-slate-400 text-sm py-6 border-t border-slate-100 dark:border-slate-800">
          <p>Dibuat dengan <span className="text-rose-500">❤️</span> untuk siswa SMK Indonesia</p>
          <p className="mt-1">© {new Date().getFullYear()} DragIT — All rights reserved.</p>
        </motion.div>
      </main>
    </div>
  );
}
