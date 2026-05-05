import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ZoomIn, ZoomOut, Maximize2, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import mermaid from 'mermaid';
import { TransformWrapper, TransformComponent, useControls } from 'react-zoom-pan-pinch';
import Sidebar from '../components/common/Sidebar';

/* ─── Zoomable Diagram Wrapper ─── */
function ZoomControls() {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="flex items-center gap-2 absolute top-3 right-3 z-20">
      <button onClick={() => zoomIn()} className="p-1.5 rounded-lg bg-white border-2 border-b-4 border-slate-200 hover:-translate-y-0.5 active:translate-y-0 active:border-b-2 transition-all shadow-sm text-slate-600 hover:text-primary-600" title="Zoom In"><ZoomIn className="w-4 h-4"/></button>
      <button onClick={() => zoomOut()} className="p-1.5 rounded-lg bg-white border-2 border-b-4 border-slate-200 hover:-translate-y-0.5 active:translate-y-0 active:border-b-2 transition-all shadow-sm text-slate-600 hover:text-primary-600" title="Zoom Out"><ZoomOut className="w-4 h-4"/></button>
      <button onClick={() => resetTransform()} className="p-1.5 rounded-lg bg-white border-2 border-b-4 border-slate-200 hover:-translate-y-0.5 active:translate-y-0 active:border-b-2 transition-all shadow-sm text-slate-600 hover:text-primary-600" title="Reset"><Maximize2 className="w-4 h-4"/></button>
    </div>
  );
}

async function downloadViaMermaid(diagramText, filename) {
  try {
    const id = `mermaid-dl-${Date.now()}`;
    const { svg } = await mermaid.render(id, diagramText);

    // Remove external font imports that cause CORS issues in canvas
    const cleanSvg = svg
      .replace(/<style>[^<]*@import[^<]*<\/style>/g, '')
      .replace(/font-family:[^;'"]*[;'"]/g, "font-family: Arial, sans-serif;")
      .replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" style="background:white;" ');

    // Encode as base64 data URI (avoids CORS blob URL restrictions)
    const encoded = btoa(unescape(encodeURIComponent(cleanSvg)));
    const dataUri = `data:image/svg+xml;base64,${encoded}`;

    const img = new Image();
    img.onload = () => {
      const scale = 2;
      const canvas = document.createElement('canvas');
      canvas.width = (img.naturalWidth || 1200) * scale;
      canvas.height = (img.naturalHeight || 800) * scale;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((pngBlob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(pngBlob);
        a.download = `${filename}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, 'image/png');
    };
    img.onerror = (e) => {
      console.error('img error', e);
      // Fallback: just download the SVG
      const blob = new Blob([cleanSvg], { type: 'image/svg+xml' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${filename}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    img.src = dataUri;
  } catch (e) {
    console.error('Download failed:', e);
    alert('Gagal men-download. Coba refresh halaman lalu klik lagi.');
  }
}

function ZoomableChart({ children, minHeight = 400, title = 'diagram', diagramText }) {
  return (
    <div className="relative bg-white rounded-xl border-2 border-b-4 border-slate-200 shadow-sm overflow-hidden mb-10" style={{ minHeight }}>
      <p className="absolute top-3 left-3 z-20 text-[10px] text-slate-400 font-bold uppercase tracking-widest select-none">
        🖱️ Scroll/Pinch = Zoom &nbsp;·&nbsp; Drag = Pan
      </p>
      {/* Download button */}
      <button
        onClick={() => downloadViaMermaid(diagramText, title)}
        className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-500 text-white text-xs font-black border-b-4 border-primary-700 hover:-translate-y-0.5 active:translate-y-0 active:border-b-2 transition-all shadow-md"
        title="Download as PNG"
      >
        <Download className="w-3.5 h-3.5" /> Download PNG
      </button>
      <TransformWrapper
        initialScale={1}
        minScale={0.3}
        maxScale={5}
        centerOnInit
        wheel={{ step: 0.1 }}
      >
        <ZoomControls />
        <TransformComponent
          wrapperStyle={{ width: '100%', height: '100%', minHeight }}
          contentStyle={{ padding: '48px 24px 24px 24px' }}
        >
          <div>
            {children}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

export default function DesignDiagrams() {
  const navigate = useNavigate();

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true, theme: 'base', themeVariables: { primaryColor: '#eff6ff', primaryTextColor: '#1e293b', primaryBorderColor: '#3b82f6', lineColor: '#3b82f6', secondaryColor: '#dbeafe', tertiaryColor: '#fff' } });
    mermaid.contentLoaded();
  }, []);

  const erdDiagram = `
erDiagram
    USERS {
        string id PK
        string full_name
        string email UK
        string password
        string role "siswa / admin"
        string avatar
        string kelas
    }
    PROGRESS {
        string user_id PK, FK
        int xp
        int current_level
        json completed_chapters
        json completed_games
        json badges_earned
    }
    GAME_HISTORY {
        string id PK
        string user_id FK
        string game_type
        int score
        int time_taken
    }
    MATERIALS {
        string id PK
        string slug UK
        string title
        string description
        string headerImage
        json topics
        json quiz
    }
    EVALUATIONS {
        string id PK
        string question
        json options
        string correct_answer
        string explanation
    }
    
    USERS ||--|| PROGRESS : "memiliki (1:1)"
    USERS ||--o{ GAME_HISTORY : "memiliki (1:N)"
  `;

  const dfdContext = `
flowchart TD
    Siswa((Siswa))
    Admin((Admin))
    System[Sistem Pembelajaran DragIT]

    Siswa -- "Data Login/Register \\n Jawaban Kuis/Evaluasi \\n Aksi Rakit PC (Game)" --> System
    System -- "Materi Hardware \\n UI Game Interaktif \\n XP, Badge & Sertifikat" --> Siswa

    System -- "Laporan Progress Siswa \\n Rekap Nilai Evaluasi" --> Admin
    Admin -- "Tambah/Edit Materi \\n Kelola Soal Evaluasi \\n Profil & Akun Siswa" --> System
  `;

  const dfdLevel1 = `
flowchart TD
    Siswa((Siswa))
    Admin((Admin))

    subgraph "Sistem DragIT"
        P1((1. Autentikasi))
        P2((2. Manajemen \\n Progress & Nilai))
        P3((3. Modul \\n Pembelajaran \\n Hardware))
        P4((4. Modul \\n Game Edukasi))
        P5((5. Dasbor \\n Admin))
        P6((6. Evaluasi \\n Akhir))
        
        DB1[(DB: Users)]
        DB2[(DB: Progress)]
        DB3[(DB: GameHistory)]
        DB4[(DB: Materials)]
        DB5[(DB: Evaluations)]
    end

    %% Siswa Flows
    Siswa -->|Login/Reg| P1
    P1 <--> DB1

    Siswa -->|Baca/Akses| P3
    P3 <--> DB4
    P3 -->|Update| DB2
    
    Siswa -->|Main| P4
    P4 -->|Update Skor| DB3
    P4 -->|Update XP| DB2
    
    Siswa -->|Kerjakan| P6
    P6 <--> DB5
    P6 -->|Catat Hasil| DB2

    DB2 -.->|Feedback XP/Level| Siswa

    %% Admin Flows
    Admin -->|Login| P1
    Admin -->|Kelola Konten| P5
    P5 <--> DB4
    P5 <--> DB5
    P5 <--> DB1
    
    %% Reports
    DB2 --> P2
    DB3 --> P2
    P2 -->|Laporan Siswa| Admin
  `;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 w-0 overflow-y-auto min-h-screen">
        <div className="max-w-7xl mx-auto pb-10">
          <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8 mb-8">
            <h1 className="font-display font-black text-3xl mb-4">Skema DFD & ERD</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Berikut adalah dokumentasi struktur *database* Entity Relationship Diagram (ERD) dan Data Flow Diagram (DFD) untuk sistem pembelajaran DragIT.
            </p>

            <h2 className="font-bold text-xl mb-4 border-b pb-2">1. Entity Relationship Diagram (ERD)</h2>
            <ZoomableChart minHeight={500} title="DragIT-ERD" diagramText={erdDiagram}>
              <pre className="mermaid">{erdDiagram}</pre>
            </ZoomableChart>

            <h2 className="font-bold text-xl mb-4 border-b pb-2 mt-10">2. DFD Level 0 (Context Diagram)</h2>
            <ZoomableChart minHeight={450} title="DragIT-DFD-Level0" diagramText={dfdContext}>
              <pre className="mermaid">{dfdContext}</pre>
            </ZoomableChart>

            <h2 className="font-bold text-xl mb-4 border-b pb-2 mt-10">3. DFD Level 1</h2>
            <ZoomableChart minHeight={600} title="DragIT-DFD-Level1" diagramText={dfdLevel1}>
              <pre className="mermaid">{dfdLevel1}</pre>
            </ZoomableChart>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
