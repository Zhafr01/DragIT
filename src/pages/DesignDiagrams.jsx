import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import mermaid from 'mermaid';
import Sidebar from '../components/common/Sidebar';

export default function DesignDiagrams() {
  const navigate = useNavigate();

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true, theme: 'base', themeVariables: { primaryColor: '#eff6ff', primaryTextColor: '#1e293b', primaryBorderColor: '#3b82f6', lineColor: '#3b82f6', secondaryColor: '#dbeafe', tertiaryColor: '#fff' } });
    mermaid.contentLoaded();
  }, []);

  const erdDiagram = `
erDiagram
    USERS {
        bigint id PK
        string full_name
        string email UK
        string password
        enum role "siswa / guru"
        string avatar
        string kelas
    }
    PROGRESS {
        bigint id PK
        bigint user_id FK
        int xp
        int level
        int current_chapter
        json completed_chapters
        json completed_levels
    }
    GAME_HISTORY {
        bigint id PK
        bigint user_id FK
        string level_id
        int score
        int time_taken
        int total_items
    }
    USERS ||--|| PROGRESS : "memiliki (1:1)"
    USERS ||--o{ GAME_HISTORY : "memiliki (1:N)"
  `;

  const dfdContext = `
flowchart TD
    Siswa((Siswa))
    Guru((Guru))
    System[Sistem Pembelajaran DragIT]

    Siswa -- "Data Login/Register \\n Jawaban Kuis \\n Aksi Game" --> System
    System -- "Materi \\n UI Game \\n XP, Badge & Level" --> Siswa

    System -- "Laporan Progress" --> Guru
    Guru -- "Pengelolaan Data" --> System
  `;

  const dfdLevel1 = `
flowchart LR
    Siswa((Siswa))
    Guru((Guru))

    subgraph "Sistem DragIT"
        P1((1. Autentikasi))
        P2((2. Manajemen \\n Progress))
        P3((3. Modul \\n Pembelajaran))
        P4((4. Modul \\n Evaluasi & Game))
        P5((5. Dasbor \\n Guru))
        
        DB1[(DB: Users)]
        DB2[(DB: Progress)]
        DB3[(DB: GameHistory)]
    end

    Siswa --> P1
    Guru --> P1
    P1 <--> DB1

    Siswa --> P3
    P3 --> DB2
    
    Siswa --> P4
    P4 --> DB2
    P4 --> DB3

    DB2 -.-> P2
    P2 -.-> Siswa

    DB1 --> P5
    DB2 --> P5
    DB3 --> P5
    P5 --> Guru
  `;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 w-0 overflow-y-auto min-h-screen">
        <div className="max-w-4xl mx-auto pb-10">
          <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8 mb-8">
            <h1 className="font-display font-black text-3xl mb-4">Skema DFD & ERD</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Berikut adalah dokumentasi struktur *database* Entity Relationship Diagram (ERD) dan Data Flow Diagram (DFD) untuk sistem pembelajaran DragIT.
            </p>

            <h2 className="font-bold text-xl mb-4 border-b pb-2">1. Entity Relationship Diagram (ERD)</h2>
            <div className="bg-white rounded-xl border border-slate-200 p-6 flex justify-center overflow-x-auto mb-10">
              <pre className="mermaid">{erdDiagram}</pre>
            </div>

            <h2 className="font-bold text-xl mb-4 border-b pb-2">2. DFD Level 0 (Context Diagram)</h2>
            <div className="bg-white rounded-xl border border-slate-200 p-6 flex justify-center overflow-x-auto mb-10">
              <pre className="mermaid">{dfdContext}</pre>
            </div>

            <h2 className="font-bold text-xl mb-4 border-b pb-2">3. DFD Level 1</h2>
            <div className="bg-white rounded-xl border border-slate-200 p-6 flex justify-center overflow-x-auto">
              <pre className="mermaid">{dfdLevel1}</pre>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
