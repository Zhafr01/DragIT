import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Users, ClipboardList, LogOut,
  Plus, Pencil, Trash2, Eye, BarChart3, ChevronRight, Monitor, TrendingUp,
  X, Save, Loader2, CircuitBoard, Cpu, HardDrive, Keyboard, Wrench, AlertTriangle, List, FileQuestion, ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { Sun, Moon } from 'lucide-react';

function AdminSidebar({ active, setActive }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const links = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'materi', label: 'Kelola Materi', icon: BookOpen },
    { id: 'evaluasi', label: 'Soal Evaluasi', icon: ClipboardList },
    { id: 'siswa', label: 'Data Siswa', icon: Users },
    { id: 'laporan', label: 'Hasil Belajar', icon: BarChart3 },
  ];
  return (
    <aside className="sticky top-0 h-screen hidden md:flex flex-col w-64 shrink-0 bg-white dark:bg-slate-900 border-r-4 border-slate-200 dark:border-slate-800 relative z-10 shadow-xl">
      <div className="p-6 border-b-4 border-slate-100 dark:border-slate-800 flex flex-col items-center">
        <Link to="/" className="flex items-center justify-center px-2 mb-2 hover:scale-105 transition-transform active:scale-95">
          <span className="font-display font-black text-4xl text-slate-800 dark:text-white tracking-tight drop-shadow-sm">
            Drag<span className="text-primary-500">IT</span>
          </span>
        </Link>
        <div className="flex justify-center"><span className="badge bg-slate-800 dark:bg-slate-700 text-white font-black tracking-widest text-[10px] px-3">PANEL ADMIN</span></div>
      </div>
      <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
        {links.map(l => (
          <button key={l.id} onClick={() => setActive(l.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-black transition-all active:scale-95 ${active === l.id ? 'bg-primary-500 text-white border-b-4 border-primary-700 shadow-md translate-y-0.5' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-2 border-b-4 border-slate-200 dark:border-slate-700 hover:bg-slate-50 hover:-translate-y-1'}`}>
            <l.icon className="w-5 h-5 shrink-0" />{l.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t-4 border-slate-100 dark:border-slate-800 space-y-3 bg-slate-50 dark:bg-slate-900/50">
        <Link to="/dashboard" className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl text-slate-600 bg-white border-2 border-b-4 border-slate-200 hover:bg-slate-50 hover:-translate-y-1 font-black transition-all active:scale-95 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
          <ArrowLeft className="w-5 h-5" /> Kembali
        </Link>
        <button onClick={toggle} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl text-slate-600 bg-white border-2 border-b-4 border-slate-200 hover:bg-slate-50 hover:-translate-y-1 font-black transition-all active:scale-95 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />} {isDark ? 'Terang' : 'Gelap'}
        </button>
        <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl text-white bg-rose-500 border-b-4 border-rose-700 hover:bg-rose-400 hover:-translate-y-1 font-black transition-all active:scale-95">
          <LogOut className="w-5 h-5" /> Keluar
        </button>
      </div>
    </aside>
  );
}

function DashboardTab({ data, loading }) {
  const { materials } = useData();
  if (loading) return <div className="text-slate-500 animate-pulse">Memuat data...</div>;
  if (!data) return null;
  
  const { students, totalXP } = data;
  return (
    <div>
      <h2 className="font-display text-4xl font-black mb-8 text-slate-800 dark:text-white">Dashboard <span className="text-primary-500">Admin</span></h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Siswa', value: students.length, icon: '🧑‍🎓', bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
          { label: 'Total Bab', value: materials.chapters?.length || 0, icon: '📚', bg: 'bg-violet-100', text: 'text-violet-600', border: 'border-violet-300' },
          { label: 'Level Game', value: 4, icon: '🎮', bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-300' },
          { label: 'XP Siswa', value: totalXP, icon: '⚡', bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-300' },
        ].map((s) => (
          <div key={s.label} className={`card p-6 flex flex-col items-center text-center ${s.bg} border-${s.border} shadow-[0_6px_0_theme(colors.${s.border.split('-')[1]}.300)] dark:border-${s.border.split('-')[1]}-800 dark:bg-${s.border.split('-')[1]}-900/30`}>
            <div className="text-5xl mb-3 drop-shadow-md">{s.icon}</div>
            <p className={`font-display font-black text-4xl ${s.text} dark:text-${s.border.split('-')[1]}-400 mb-1`}>{s.value}</p>
            <p className="text-slate-600 dark:text-slate-400 font-bold text-sm uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="card p-6 border-2 border-slate-200 dark:border-slate-700 border-b-8">
        <h3 className="font-display font-black text-3xl mb-6 flex items-center gap-3"><TrendingUp className="w-8 h-8 text-primary-500" /> Overview Materi</h3>
        <div className="flex flex-col gap-5">
          {materials.chapters?.map((ch) => (
            <div key={ch.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 border-b-8 hover:-translate-y-1 hover:shadow-lg transition-all">
              <div className="flex items-center gap-5">
                <span className="w-14 h-14 bg-primary-100 dark:bg-primary-900/50 text-primary-500 rounded-2xl flex items-center justify-center font-black text-2xl border-4 border-primary-200 dark:border-primary-800 shadow-inner">{ch.id}</span>
                <div>
                  <p className="font-display font-black text-xl text-slate-800 dark:text-white mb-1">{ch.title}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{ch.topics.length} Topik Pembelajaran</p>
                </div>
              </div>
              <span className="badge bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-black px-4 py-2 border-2 border-slate-300 dark:border-slate-600 shadow-sm">{ch.topics.length} TOPIK</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MateriTab() {
  const { materials, setMaterials } = useData();
  const [chapters, setChapters] = useState(materials.chapters || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [form, setForm] = useState({
    title: '', description: '', icon: 'BookOpen', color: 'blue', headerImage: ''
  });

  const [isTopicsModalOpen, setIsTopicsModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [managingChapter, setManagingChapter] = useState(null);
  const [topicsForm, setTopicsForm] = useState([]);
  const [quizzesForm, setQuizzesForm] = useState([]);

  const openTopicsModal = (ch) => {
    setManagingChapter(ch);
    setTopicsForm(JSON.parse(JSON.stringify(ch.topics || [])));
    setIsTopicsModalOpen(true);
  };
  
  const openQuizModal = (ch) => {
    setManagingChapter(ch);
    setQuizzesForm(JSON.parse(JSON.stringify(ch.quiz || [])));
    setIsQuizModalOpen(true);
  };

  const handleSaveSubContent = (type) => {
    let newChapters = [...chapters];
    newChapters = newChapters.map(c => 
      c.id === managingChapter.id ? { 
        ...c, 
        topics: type === 'topics' ? topicsForm : c.topics,
        quiz: type === 'quiz' ? quizzesForm : c.quiz
      } : c
    );
    handleSaveToAPI(newChapters);
    if (type === 'topics') setIsTopicsModalOpen(false);
    if (type === 'quiz') setIsQuizModalOpen(false);
  };

  const addTopic = () => setTopicsForm([...topicsForm, { id: Date.now().toString(), title: '', content: '', image: '', keyPoints: [] }]);
  const updateTopic = (index, field, value) => {
    const arr = [...topicsForm];
    arr[index][field] = value;
    setTopicsForm(arr);
  };
  const updateKeyPoint = (tIdx, kpIdx, value) => {
    const arr = [...topicsForm];
    arr[tIdx].keyPoints[kpIdx] = value;
    setTopicsForm(arr);
  };
  const addKeyPoint = (tIdx) => {
    const arr = [...topicsForm];
    if(!arr[tIdx].keyPoints) arr[tIdx].keyPoints = [];
    arr[tIdx].keyPoints.push('');
    setTopicsForm(arr);
  };
  const removeKeyPoint = (tIdx, kpIdx) => {
    const arr = [...topicsForm];
    arr[tIdx].keyPoints = arr[tIdx].keyPoints.filter((_, i) => i !== kpIdx);
    setTopicsForm(arr);
  };
  const deleteTopic = (index) => setTopicsForm(topicsForm.filter((_, i) => i !== index));

  const addQuest = () => setQuizzesForm([...quizzesForm, { question: '', options: ['', '', '', ''], answer: 0, explanation: '' }]);
  const updateQuest = (idx, field, value) => {
    const arr = [...quizzesForm];
    arr[idx][field] = value;
    setQuizzesForm(arr);
  };
  const updateQuestOpt = (qIdx, oIdx, val) => {
    const arr = [...quizzesForm];
    arr[qIdx].options[oIdx] = val;
    setQuizzesForm(arr);
  };
  const deleteQuest = (idx) => setQuizzesForm(quizzesForm.filter((_, i) => i !== idx));

  const availableIcons = ['Monitor', 'Cpu', 'Keyboard', 'CircuitBoard', 'Wrench', 'HardDrive', 'BookOpen'];
  const availableColors = ['blue', 'violet', 'emerald', 'amber', 'rose', 'orange'];

  const handleSaveToAPI = async (newChapters) => {
    try {
      setIsSaving(true);
      await fetch('https://dragit-dogl.onrender.com/api/admin/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ chapters: newChapters })
      });
      setChapters(newChapters);
      setMaterials({ chapters: newChapters });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save materials', error);
      alert('Gagal menyimpan materi ke server.');
    } finally {
      setIsSaving(false);
    }
  };

  const openAddModal = () => {
    setEditingChapter(null);
    setForm({ title: '', description: '', icon: 'BookOpen', color: 'blue', headerImage: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (ch) => {
    setEditingChapter(ch);
    setForm({ title: ch.title, description: ch.description, icon: ch.icon || 'BookOpen', color: ch.color || 'blue', headerImage: ch.headerImage || '' });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus materi ini? Data tidak bisa dikembalikan.')) {
      const newChapters = chapters.filter(c => c.id !== id);
      handleSaveToAPI(newChapters);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) return;
    
    let newChapters = [...chapters];
    if (editingChapter) {
      // Edit existing
      newChapters = newChapters.map(c => 
        c.id === editingChapter.id ? { ...c, ...form, slug: form.title.toLowerCase().replace(/\s+/g, '-') } : c
      );
    } else {
      // Add new
      const newId = newChapters.length > 0 ? Math.max(...newChapters.map(c => c.id)) + 1 : 1;
      newChapters.push({
        id: newId,
        slug: `bab-${newId}-${form.title.toLowerCase().replace(/\s+/g, '-')}`,
        ...form,
        topics: [],
        quiz: []
      });
    }
    handleSaveToAPI(newChapters);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="font-display text-4xl font-black flex items-center gap-3"><BookOpen className="w-8 h-8 text-primary-500"/> Kelola Materi</h2>
        <button onClick={openAddModal} className="btn-primary flex items-center gap-2 py-3 px-6 shadow-sm shadow-primary-500/30">
          <Plus className="w-5 h-5" /> TAMBAH MATERI
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {chapters.map(ch => (
          <div key={ch.id} className="card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-800 hover:-translate-y-1 hover:shadow-xl border-2 border-slate-200 dark:border-slate-700 border-b-8 transition-all">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-primary-100 dark:bg-primary-900/50 text-primary-500 border-4 border-primary-200 dark:border-primary-800 flex items-center justify-center text-3xl font-black shadow-inner">
                {ch.id}
              </div>
              <div>
                <h3 className="font-display text-2xl font-black text-slate-800 dark:text-white mb-2">{ch.title}</h3>
                <div className="flex items-center gap-3 text-xs font-black text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg border-2 border-slate-200 dark:border-slate-600"><List className="w-4 h-4"/> {ch.topics?.length || 0} TOPIK</span>
                  <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg border-2 border-slate-200 dark:border-slate-600"><FileQuestion className="w-4 h-4"/> {ch.quiz?.length || 0} KUIS</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Link to={`/dashboard/materi/${ch.slug}`} className="btn-secondary !p-3 !rounded-xl !border-b-4 !border-blue-300 bg-blue-100 text-blue-700 hover:!bg-blue-200 hover:-translate-y-1 active:translate-y-0" title="Lihat Bab"><Eye className="w-5 h-5" /></Link>
              <button onClick={() => openTopicsModal(ch)} className="btn-secondary !p-3 !rounded-xl !border-b-4 !border-emerald-300 bg-emerald-100 text-emerald-700 hover:!bg-emerald-200 hover:-translate-y-1 active:translate-y-0" title="Kelola Topik"><List className="w-5 h-5" /></button>
              <button onClick={() => openQuizModal(ch)} className="btn-secondary !p-3 !rounded-xl !border-b-4 !border-violet-300 bg-violet-100 text-violet-700 hover:!bg-violet-200 hover:-translate-y-1 active:translate-y-0" title="Kelola Kuis"><FileQuestion className="w-5 h-5" /></button>
              <button onClick={() => openEditModal(ch)} className="btn-secondary !p-3 !rounded-xl !border-b-4 !border-amber-300 bg-amber-100 text-amber-700 hover:!bg-amber-200 hover:-translate-y-1 active:translate-y-0" title="Edit Metadata"><Pencil className="w-5 h-5" /></button>
              <button onClick={() => handleDelete(ch.id)} className="btn-secondary !p-3 !rounded-xl !border-b-4 !border-rose-300 bg-rose-100 text-rose-700 hover:!bg-rose-200 hover:-translate-y-1 active:translate-y-0" title="Hapus Materi"><Trash2 className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
        {chapters.length === 0 && (
          <div className="card p-12 flex flex-col items-center justify-center text-center border-dashed border-4 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
            <BookOpen className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="font-display font-black text-2xl text-slate-400">Belum ada materi</h3>
            <p className="font-bold text-slate-400 mt-2">Klik tombol "Tambah Materi" untuk mulai membuat.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-lg card shadow-2xl p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-2xl font-black">{editingChapter ? 'Edit Materi' : 'Tambah Materi Baru'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Judul Materi</label>
                  <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input-field" placeholder="Masukkan judul..." required />
                </div>
                
                <div>
                  <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Deskripsi Singkat</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input-field resize-none h-32" placeholder="Jelaskan isi materi..." required />
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Gambar Banner</label>
                  <div className="flex flex-col gap-3">
                    <input type="text" value={form.headerImage?.startsWith('data:') ? '' : form.headerImage || ''} onChange={e => setForm({...form, headerImage: e.target.value})} className="input-field" placeholder="Tempel URL gambar (https://...) atau unggah dari komputer 👇" />
                    <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/30 p-2 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                      <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setForm({...form, headerImage: reader.result});
                          reader.readAsDataURL(file);
                        }
                      }} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-primary-100 file:text-primary-700 hover:file:bg-primary-200 dark:file:bg-primary-900/40 dark:file:text-primary-400 cursor-pointer text-slate-500" />
                      {form.headerImage && (
                        <div className="w-12 h-12 shrink-0 rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-sm relative group bg-white">
                          <img src={form.headerImage} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100?text=Error'; }} />
                          <button type="button" onClick={() => setForm({...form, headerImage: ''})} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" title="Hapus Gambar">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">*Masukkan kombinasi tautan/teks bergaya atau file JPG/PNG dari komputer.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Nama Ikon (Statis)</label>
                    <select value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className="input-field">
                      {availableIcons.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Warna Tema</label>
                    <select value={form.color} onChange={e => setForm({...form, color: e.target.value})} className="input-field">
                      {availableColors.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="pt-4 mt-6 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary px-6 py-2.5">Batal</button>
                  <button type="submit" disabled={isSaving} className="btn-primary px-6 py-2.5 flex items-center gap-2">
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Simpan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Topics Modal */}
      <AnimatePresence>
        {isTopicsModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto card shadow-2xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4 sticky top-0 bg-white dark:bg-slate-900 z-10 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-display text-2xl font-black">Kelola Topik</h3>
                  <p className="text-sm text-slate-500">Bab: {managingChapter?.title}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={addTopic} className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1"><Plus className="w-3 h-3"/> Tambah Topik</button>
                  <button onClick={() => setIsTopicsModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"><X className="w-5 h-5" /></button>
                </div>
              </div>
              
              <div className="space-y-6 overflow-y-auto pr-2 pb-20">
                {topicsForm.map((t, tIdx) => (
                  <div key={tIdx} className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/20 relative group">
                    <button onClick={() => deleteTopic(tIdx)} className="absolute top-4 right-4 p-1.5 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/30 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                    <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Topik {tIdx + 1}</p>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold">Judul Topik</label>
                        <input className="input-field py-1.5 text-sm" placeholder="Judul Topik" value={t.title} onChange={e => updateTopic(tIdx, 'title', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-xs font-semibold">Konten</label>
                        <textarea className="input-field py-1.5 text-sm h-20" placeholder="Isi paragraf konten..." value={t.content} onChange={e => updateTopic(tIdx, 'content', e.target.value)} />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-semibold">Key Points</label>
                          <button onClick={() => addKeyPoint(tIdx)} className="text-xs text-primary-500 hover:text-primary-600 font-medium">+ Tambah Point</button>
                        </div>
                        {t.keyPoints?.map((kp, kpIdx) => (
                          <div key={kpIdx} className="flex items-center gap-2 mb-2">
                            <input className="input-field py-1 text-sm flex-1" placeholder="Point penting..." value={kp} onChange={e => updateKeyPoint(tIdx, kpIdx, e.target.value)} />
                            <button onClick={() => removeKeyPoint(tIdx, kpIdx)} className="p-1 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-500 rounded"><X className="w-4 h-4"/></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                {topicsForm.length === 0 && <p className="text-center py-10 text-slate-400">Belum ada topik.</p>}
              </div>

              <div className="pt-4 mt-auto flex justify-end gap-3 sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                <button onClick={() => setIsTopicsModalOpen(false)} className="btn-secondary px-6 py-2.5">Batal</button>
                <button onClick={() => handleSaveSubContent('topics')} disabled={isSaving} className="btn-primary px-6 py-2.5 flex items-center gap-2">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Simpan Topik
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quiz Modal */}
      <AnimatePresence>
        {isQuizModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto card shadow-2xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4 sticky top-0 bg-white dark:bg-slate-900 z-10 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-display text-2xl font-black">Kelola Kuis Bab</h3>
                  <p className="text-sm text-slate-500">Bab: {managingChapter?.title}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={addQuest} className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1"><Plus className="w-3 h-3"/> Tambah Soal</button>
                  <button onClick={() => setIsQuizModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"><X className="w-5 h-5" /></button>
                </div>
              </div>
              
              <div className="space-y-6 overflow-y-auto pr-2 pb-20">
                {quizzesForm.map((q, qIdx) => (
                  <div key={qIdx} className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/20 relative group">
                    <button onClick={() => deleteQuest(qIdx)} className="absolute top-4 right-4 p-1.5 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/30 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                    <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Soal #{qIdx + 1}</p>
                    
                    <input className="input-field mb-3 py-1.5 text-sm" placeholder="Pertanyaan..." value={q.question} onChange={e => updateQuest(qIdx, 'question', e.target.value)} />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} className="flex flex-col gap-1">
                          <label className="text-xs text-slate-500 font-semibold flex items-center gap-2">
                            <input type="radio" name={`quiz-${qIdx}`} checked={q.answer === oIdx} onChange={() => updateQuest(qIdx, 'answer', oIdx)} className="accent-primary-500" /> Opsi {String.fromCharCode(65+oIdx)} {q.answer === oIdx && <span className="text-emerald-500 text-xs">(Benar)</span>}
                          </label>
                          <input className="input-field text-sm py-1.5" placeholder={`Jawaban ${String.fromCharCode(65+oIdx)}`} value={opt} onChange={e => updateQuestOpt(qIdx, oIdx, e.target.value)} />
                        </div>
                      ))}
                    </div>
                    
                    <input className="input-field text-sm py-1.5" placeholder="Penjelasan (opsional)..." value={q.explanation} onChange={e => updateQuest(qIdx, 'explanation', e.target.value)} />
                  </div>
                ))}
                {quizzesForm.length === 0 && <p className="text-center py-10 text-slate-400">Belum ada Kuis Bab.</p>}
              </div>

              <div className="pt-4 mt-auto flex justify-end gap-3 sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                <button onClick={() => setIsQuizModalOpen(false)} className="btn-secondary px-6 py-2.5">Batal</button>
                <button onClick={() => handleSaveSubContent('quiz')} disabled={isSaving} className="btn-primary px-6 py-2.5 flex items-center gap-2">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Simpan Kuis
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EvaluasiTab() {
  const { evaluations, setEvaluations } = useData();
  const [evals, setEvals] = useState(evaluations.evaluations || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEval, setEditingEval] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', questions: [] });

  const handleSaveToAPI = async (newEvals) => {
    try {
      setIsSaving(true);
      await fetch('https://dragit-dogl.onrender.com/api/admin/evaluations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ evaluations: newEvals })
      });
      setEvals(newEvals);
      setEvaluations({ evaluations: newEvals });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save evaluations', error);
      alert('Gagal menyimpan evaluasi ke server.');
    } finally {
      setIsSaving(false);
    }
  };

  const openAddModal = () => {
    setEditingEval(null);
    setForm({ title: '', description: '', questions: [] });
    setIsModalOpen(true);
  };

  const openEditModal = (ev) => {
    setEditingEval(ev);
    setForm({ title: ev.title, description: ev.description, questions: ev.questions || [] });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus evaluasi ini?')) {
      const newEvals = evals.filter(e => e.id !== id);
      handleSaveToAPI(newEvals);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) return;
    
    let newEvals = [...evals];
    if (editingEval) {
      newEvals = newEvals.map(ev => ev.id === editingEval.id ? { ...ev, ...form } : ev);
    } else {
      const newId = newEvals.length > 0 ? Math.max(...newEvals.map(ev => ev.id)) + 1 : 1;
      newEvals.push({ id: newId, ...form });
    }
    handleSaveToAPI(newEvals);
  };

  const addQuestion = () => setForm({ ...form, questions: [...form.questions, { question: '', options: ['', '', '', ''], answer: 0, explanation: '' }] });
  const updateQuestion = (idx, field, value) => {
    const arr = [...form.questions];
    arr[idx][field] = value;
    setForm({ ...form, questions: arr });
  };
  const updateOption = (qIdx, oIdx, value) => {
    const arr = [...form.questions];
    arr[qIdx].options[oIdx] = value;
    setForm({ ...form, questions: arr });
  };
  const deleteQuestion = (idx) => {
    const arr = form.questions.filter((_, i) => i !== idx);
    setForm({ ...form, questions: arr });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="font-display text-4xl font-black flex items-center gap-3"><ClipboardList className="w-8 h-8 text-primary-500"/> Kelola Evaluasi</h2>
        <button onClick={openAddModal} className="btn-primary flex items-center gap-2 py-3 px-6 shadow-sm shadow-primary-500/30">
          <Plus className="w-5 h-5" /> TAMBAH EVALUASI
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {evals.map(ev => (
          <div key={ev.id} className="card p-6 relative overflow-hidden group border-2 border-slate-200 dark:border-slate-700 border-b-8 hover:-translate-y-1 hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500 rounded-2xl mb-5 flex items-center justify-center border-4 border-indigo-200 dark:border-indigo-800 shadow-inner">
               <ClipboardList className="w-7 h-7" />
            </div>
            <h3 className="font-display font-black text-2xl mb-2 text-slate-800 dark:text-white">{ev.title}</h3>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-6 line-clamp-2">{ev.description}</p>
            <div className="flex items-center gap-2">
              <span className="badge bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 font-black px-3 py-1.5"><FileQuestion className="w-4 h-4 mr-1 inline" /> {ev.questions.length} SOAL</span>
            </div>
            {/* Actions overlay */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
              <button onClick={() => openEditModal(ev)} className="p-3 bg-amber-100 text-amber-700 rounded-xl border-b-4 border-amber-300 hover:bg-amber-200 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-sm"><Pencil className="w-5 h-5" /></button>
              <button onClick={() => handleDelete(ev.id)} className="p-3 bg-rose-100 text-rose-700 rounded-xl border-b-4 border-rose-300 hover:bg-rose-200 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-sm"><Trash2 className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
        {evals.length === 0 && (
          <div className="col-span-2 card p-12 flex flex-col items-center justify-center text-center border-dashed border-4 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
            <ClipboardList className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
            <p className="font-display font-black text-2xl text-slate-400">Belum ada evaluasi.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto card shadow-2xl p-6">
              <div className="flex items-center justify-between mb-6 sticky top-0 bg-white dark:bg-slate-900 py-2 z-10 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-display text-2xl font-black">{editingEval ? 'Edit Evaluasi' : 'Tambah Evaluasi Baru'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"><X className="w-5 h-5" /></button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Judul</label>
                    <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input-field" placeholder="Judul evaluasi" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Deskripsi</label>
                    <input type="text" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input-field" placeholder="Mengenai apa evaluasi ini" required />
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold border-b border-slate-200 dark:border-slate-700 pb-1">Daftar Soal ({form.questions.length})</h4>
                    <button type="button" onClick={addQuestion} className="text-xs btn-secondary px-3 py-1 flex items-center gap-1"><Plus className="w-3 h-3"/> Tambah Soal</button>
                  </div>
                  
                  <div className="space-y-6">
                    {form.questions.map((q, qIdx) => (
                      <div key={qIdx} className="card p-5 !border-4 !border-indigo-200 dark:!border-indigo-900 bg-indigo-50/50 dark:bg-indigo-900/20 relative group">
                        <button type="button" onClick={() => deleteQuestion(qIdx)} className="absolute top-4 right-4 p-2 bg-rose-100 text-rose-500 hover:bg-rose-200 dark:bg-rose-900/50 dark:hover:bg-rose-900 border-2 border-rose-200 dark:border-rose-800 rounded-xl transition-colors"><Trash2 className="w-5 h-5"/></button>
                        <p className="text-sm font-black text-indigo-500 mb-3 bg-indigo-100 w-max px-3 py-1 rounded-xl">SOAL #{qIdx+1}</p>
                        
                        <input className="input-field mb-4 text-lg" placeholder="Tuliskan pertanyaan di sini..." value={q.question} onChange={e => updateQuestion(qIdx, 'question', e.target.value)} required />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          {q.options.map((opt, oIdx) => (
                            <div key={oIdx} className="flex flex-col gap-2 p-3 rounded-2xl border-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                              <label className="text-sm font-black flex items-center gap-2 cursor-pointer">
                                <input type="radio" name={`answer-${qIdx}`} checked={q.answer === oIdx} onChange={() => updateQuestion(qIdx, 'answer', oIdx)} className="w-5 h-5 accent-emerald-500" /> Opsi {String.fromCharCode(65+oIdx)} {q.answer === oIdx && <span className="bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-md text-xs">(Jawaban Benar)</span>}
                              </label>
                              <input className="input-field text-md py-2 border-2 border-slate-200 dark:border-slate-700" placeholder={`Teks Pilihan ${String.fromCharCode(65+oIdx)}`} value={opt} onChange={e => updateOption(qIdx, oIdx, e.target.value)} required />
                            </div>
                          ))}
                        </div>
                        
                        <input className="input-field text-sm" placeholder="Penjelasan (opsional)..." value={q.explanation} onChange={e => updateQuestion(qIdx, 'explanation', e.target.value)} />
                      </div>
                    ))}
                    {form.questions.length === 0 && (
                      <div className="card p-10 flex flex-col items-center justify-center text-center border-dashed border-4 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
                         <FileQuestion className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
                         <p className="font-bold text-slate-400">Belum ada soal ditambahkan.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 mt-6 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800 sticky bottom-0 bg-white dark:bg-slate-900 py-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary px-6 py-2.5">Batal</button>
                  <button type="submit" disabled={isSaving} className="btn-primary px-6 py-2.5 flex items-center gap-2">
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Simpan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SiswaTab({ data, loading }) {
  if (loading) return <div className="text-slate-500 animate-pulse font-bold">Memuat data...</div>;
  const students = data?.students || [];
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-4xl font-black text-slate-800 dark:text-white">Data <span className="text-primary-500">Siswa</span></h2>
        <span className="badge bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-black text-sm md:text-lg px-4 py-2 border-2 border-primary-200 dark:border-primary-800">{students.length} Terdaftar</span>
      </div>
      <div className="flex flex-col gap-5">
        {students.map((s) => (
          <div key={s.id} className="card p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 border-b-8 hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/40 rounded-2xl flex flex-col overflow-hidden items-center justify-center text-4xl shadow-inner border-2 border-amber-200 dark:border-amber-800">
                {s.avatar?.startsWith('data:image') || s.avatar?.startsWith('http') ? (
                  <img src={s.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  s.avatar || '🎓'
                )}
              </div>
              <div>
                <p className="font-black font-display text-2xl text-slate-800 dark:text-white">{s.name}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-md">{s.email}</span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-md">Kelas {s.kelas || '-'}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6 md:gap-10 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800">
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Level</p>
                <span className="badge bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-black text-lg border-2 border-amber-200 dark:border-amber-800 px-3">Lv.{s.level || 1}</span>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Total XP</p>
                <span className="font-black text-2xl text-primary-500 flex items-center gap-1 justify-center drop-shadow-sm"><TrendingUp className="w-5 h-5"/> {s.xp || 0}</span>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Main Game</p>
                <span className="font-black text-slate-600 dark:text-slate-300 text-xl">{s.gameCount || 0}x</span>
              </div>
            </div>
          </div>
        ))}
        {students.length === 0 && (
          <div className="card p-12 text-center border-4 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
            <p className="font-display font-black text-2xl text-slate-400">Belum ada siswa.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function LaporanTab({ data, loading }) {
  if (loading) return <div className="text-slate-500 animate-pulse font-bold">Memuat data...</div>;
  const allResults = data?.laporan || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-4xl font-black text-slate-800 dark:text-white">Hasil <span className="text-primary-500">Belajar</span></h2>
      </div>
      <div className="flex flex-col gap-4">
        {allResults.map((r, i) => {
          const pct = r.total > 0 ? Math.round((r.score / (r.total * 10)) * 100) : 0;
          const isGood = pct >= 75;
          return (
             <div key={i} className={`card p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 border-l-8 ${isGood ? 'border-l-success-500' : 'border-l-danger-500'} hover:-translate-y-1 hover:shadow-lg transition-all`}>
               <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden flex items-center justify-center text-3xl border-4 border-slate-200 dark:border-slate-600 shadow-sm">
                    {r.student.avatar?.startsWith('data:image') || r.student.avatar?.startsWith('http') ? (
                       <img src={r.student.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                       r.student.avatar || '🎓'
                    )}
                  </div>
                  <div>
                    <p className="font-black font-display text-xl">{r.student.name}</p>
                    <p className="text-xs font-bold text-slate-400 mt-1">{new Date(r.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit'})}</p>
                  </div>
               </div>

               <div className="flex flex-wrap items-center gap-4 md:gap-8 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800">
                 <div className="text-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Materi Bab</p>
                   <span className="font-black text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border-2 border-slate-200 dark:border-slate-700 shadow-sm">Bab {r.levelId}</span>
                 </div>
                 <div className="text-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Waktu</p>
                   <span className="font-black text-slate-600 dark:text-slate-300">{r.timeTaken} detik</span>
                 </div>
                 <div className="text-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Skor Kuis</p>
                   <span className={`badge font-black text-xl px-4 py-1.5 border-2 shadow-sm ${isGood ? 'bg-success-100 text-success-700 border-success-200 dark:bg-success-900/30 dark:border-success-800 dark:text-success-400' : 'bg-danger-100 text-danger-700 border-danger-200 dark:bg-danger-900/30 dark:border-danger-800 dark:text-danger-400'}`}>
                     {r.score} <span className="text-sm opacity-80 ml-1">({pct}%)</span>
                   </span>
                 </div>
               </div>
             </div>
          );
        })}
        {allResults.length === 0 && (
          <div className="card p-12 text-center border-4 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
            <p className="font-display font-black text-2xl text-slate-400">Belum ada data hasil belajar.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { user } = useAuth();
  const [active, setActive] = useState('dashboard');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dragit-dogl.onrender.com/api/admin/dashboard', {
      headers: { 'Accept': 'application/json' }
    })
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch admin data', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex">
        <AdminSidebar active={active} setActive={setActive} />
        <main className="flex-1 p-6 md:p-8">
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {active === 'dashboard' && <DashboardTab data={data} loading={loading} />}
            {active === 'materi' && <MateriTab />}
            {active === 'evaluasi' && <EvaluasiTab />}
            {active === 'siswa' && <SiswaTab data={data} loading={loading} />}
            {active === 'laporan' && <LaporanTab data={data} loading={loading} />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
