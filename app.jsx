// =============================================================================
// MAIN APP — TOGA
// =============================================================================
const { useState, useEffect, useRef } = React;

// ===== Toast component (achievements & system messages) =====
function AchievementToast({ kind, onDone }) {
useEffect(() => { const t = setTimeout(onDone, 4500); return () => clearTimeout(t); }, []);
const A = {
week_streak:    { title: '7 dias seguidos',         sub: 'Uma semana inteira encadeada',  icon: '🔥', color: '#f59e0b' },
marathon:       { title: 'Maratonista',             sub: 'Sessão de 90 min completa',     icon: '🛡', color: 'var(--tinta)' },
first_mastered: { title: 'Primeiro tema dominado',  sub: 'Um tópico conquistado',         icon: '⚡', color: '#00b8d4' },
half_edital:    { title: 'Meio edital',             sub: '50% dos tópicos dominados',     icon: '🏆', color: 'var(--esmeralda)' },
backup_done:    { title: 'Backup baixado',          sub: 'Arquivo salvo no seu computador', icon: '💾', color: 'var(--esmeralda)' },
restore_done:   { title: 'Backup restaurado',       sub: 'Seus dados foram recarregados', icon: '🔄', color: '#00b8d4' },
reset_done:     { title: 'Sistema zerado',          sub: 'Tudo voltou ao estado inicial', icon: '🌱', color: 'var(--esmeralda)' },
goals_saved:    { title: 'Metas atualizadas',       sub: 'Boa! Vamos cumprir',            icon: '🎯', color: 'var(--tinta)' },
pet_sick:       { title: 'Sua dragãozinha adoeceu 🤒', sub: 'Estude 2 dias seguidos para curá-la', icon: '🤒', color: '#f59e0b' },
pet_healed:     { title: 'Sua dragãozinha está curada! 💚', sub: 'Cuidando dela com seus estudos', icon: '💚', color: 'var(--esmeralda)' },
};
const a = A[kind] || A.first_mastered;
return (
<div className="glass-strong toast-achievement" style={{
position: 'fixed', top: 80, right: 20, zIndex: 80,
padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
maxWidth: 340, borderRadius: 14, boxShadow: `0 12px 36px rgba(12,13,18,0.18), 0 0 0 1px ${a.color}50`,
}}>
<div style={{
width: 42, height: 42, borderRadius: 10,
background: `radial-gradient(circle, ${a.color}30, transparent)`,
display: 'grid', placeItems: 'center', fontSize: 22,
}}>{a.icon}</div>
<div style={{ flex: 1, minWidth: 0 }}>
<div style={{ fontSize: 9, letterSpacing: '0.2em', color: a.color, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
{kind.startsWith('pet_') || kind === 'goals_saved' || kind === 'backup_done' || kind === 'restore_done' || kind === 'reset_done'
? 'AVISO' : 'CONQUISTA DESBLOQUEADA'}
</div>
<div className="font-display" style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>{a.title}</div>
<div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.sub}</div>
</div>
</div>
);
}

// ===== Storage helpers =====
const KEYS = {
shared: 'da_v3_shared',
obj: 'da_v3_objetiva',
disc: 'da_v3_discursiva',
meta: 'da_v3_meta',
};
function loadKey(key, fallback) {
try {
const raw = localStorage.getItem(key);
if (!raw) return fallback;
return JSON.parse(raw);
} catch (e) { return fallback; }
}
function saveKey(key, value) {
try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
}

const DEFAULTS = /*EDITMODE-BEGIN*/{
"showSplash": false,
"view": "dashboard",
"mode": "objetiva"
}/*EDITMODE-END*/;

// =============================================================================
// GOALS MODAL — set personal targets
// =============================================================================
function GoalsModal({ open, goals, onSave, onClose }) {
const [form, setForm] = useState(goals || {});
useEffect(() => { if (open) setForm(goals); }, [open, goals]);

if (!open) return null;

const fields = [
{ k: 'dailyHours', label: 'Horas por dia', max: 16, step: 0.5, color: '#00b8d4', icon: '⏱', unit: 'h' },
{ k: 'weeklyHours', label: 'Horas por semana', max: 80, step: 1, color: 'var(--tinta)', icon: '📅', unit: 'h' },
{ k: 'dailyQuestions', label: 'Questões por dia', max: 300, step: 5, color: 'var(--esmeralda)', icon: '❓', unit: '' },
{ k: 'weeklyQuestions', label: 'Questões por semana', max: 1500, step: 10, color: '#f59e0b', icon: '🎯', unit: '' },
{ k: 'dailyFlashcards', label: 'Flashcards por dia', max: 300, step: 5, color: 'var(--coral)', icon: '🃏', unit: '' },
];

return (
<div onClick={onClose} style={{
position: 'fixed', inset: 0, zIndex: 90,
background: 'rgba(12,13,18,0.5)', backdropFilter: 'blur(8px)',
display: 'grid', placeItems: 'center', padding: 24,
animation: 'fade-in 250ms ease-out',
}}>
<div onClick={e => e.stopPropagation()} className="glass-strong anim-slide-up"
style={{ width: '100%', maxWidth: 480, padding: 24, borderRadius: 18, position: 'relative' }}>
<button onClick={onClose} className="btn-ghost" style={{ position: 'absolute', top: 12, right: 12 }}>
<I.close size={14} />
</button>

    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 10, letterSpacing: '0.25em', color: 'var(--tinta)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
        CONFIGURAR METAS
      </div>
      <div className="font-display gradient-neon" style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>
        Suas metas pessoais 🎯
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
        Ajuste pra sua realidade. Você pode mudar quando quiser.
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {fields.map(f => (
        <div key={f.k}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 600 }}>
              <span style={{ marginRight: 6 }}>{f.icon}</span>{f.label}
            </span>
            <span className="num" style={{ fontSize: 16, fontWeight: 700, color: f.color }}>
              {form[f.k] ?? 0}{f.unit}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button className="btn-ghost" style={{ padding: '4px 8px' }}
              onClick={() => setForm(s => ({ ...s, [f.k]: Math.max(0, (s[f.k] || 0) - f.step) }))}>
              <I.minus size={11} />
            </button>
            <input type="range" min={0} max={f.max} step={f.step} value={form[f.k] ?? 0}
              onChange={e => setForm(s => ({ ...s, [f.k]: parseFloat(e.target.value) }))}
              style={{ flex: 1, accentColor: f.color }} />
            <button className="btn-ghost" style={{ padding: '4px 8px' }}
              onClick={() => setForm(s => ({ ...s, [f.k]: Math.min(f.max, (s[f.k] || 0) + f.step) }))}>
              <I.plusSm size={11} />
            </button>
          </div>
        </div>
      ))}
    </div>

    <button onClick={() => { onSave(form); onClose(); }} className="btn-neon" style={{
      width: '100%', justifyContent: 'center', marginTop: 22, padding: '11px 20px', fontSize: 13,
      background: 'linear-gradient(135deg, var(--petroleo), var(--ciano))', borderColor: 'transparent', color: 'white',
      textShadow: '0 1px 3px rgba(0,0,0,0.3)',
    }}>
      <I.check size={14} stroke={2.5} /> Salvar metas
    </button>
  </div>
</div>

);
}

// =============================================================================
// TOTALS SECTION — totais acumulados (horas, questões, flashcards, checks, etc.)
// =============================================================================
function TotalsSection({ shared, objState, discState }) {
const logs = shared.dailyLogs || [];
const totalHours = logs.reduce((a, l) => a + (l.hours || 0), 0);
const totalQuestions = logs.reduce((a, l) => a + (l.questions || 0), 0);
const totalReviews = logs.reduce((a, l) => a + (l.reviews || 0), 0);
const activeDays = logs.filter(l => (l.hours || 0) + (l.questions || 0) + (l.reviews || 0) > 0).length;

const FLAGS_O = ['lei','doutrina','juris','questoes','revisao'];
const FLAGS_D = ['estudado','grifado','questoes'];

let objChecks = 0, objMastered = 0, objTotalTopics = 0;
objState.subjects.forEach(s => {
objTotalTopics += s.topics.length;
s.topics.forEach(t => {
const c = FLAGS_O.filter(f => t[f]).length;
objChecks += c;
if (c === 5) objMastered++;
});
});

let discChecks = 0, discMastered = 0, discTotalTopics = 0;
discState.subjects.forEach(s => {
discTotalTopics += s.topics.length;
s.topics.forEach(t => {
const c = FLAGS_D.filter(f => t[f]).length;
discChecks += c;
if (c === 3) discMastered++;
});
});

// Tópicos pedindo revisão (>30 dias sem atividade, mas com algum check)
const REVIEW_DAYS = 30;
const daysSince = (iso) => {
if (!iso) return Infinity;
return Math.floor((new Date() - new Date(iso)) / 86400000);
};
let needsReview = 0;
objState.subjects.forEach(s => s.topics.forEach(t => {
const c = FLAGS_O.filter(f => t[f]).length;
if (c > 0 && daysSince(t.lastStudiedAt) >= REVIEW_DAYS) needsReview++;
}));
discState.subjects.forEach(s => s.topics.forEach(t => {
const c = FLAGS_D.filter(f => t[f]).length;
if (c > 0 && daysSince(t.lastStudiedAt) >= REVIEW_DAYS) needsReview++;
}));

const items = [
{ label: 'Horas estudadas', value: totalHours.toFixed(1), unit: 'h', color: '#00b8d4', glow: '#00d9ff', icon: '⏱', sub: `${activeDays} dias ativos` },
{ label: 'Questões resolvidas', value: totalQuestions.toLocaleString('pt-BR'), unit: '', color: 'var(--esmeralda)', glow: '#00ff88', icon: '❓', sub: 'no total' },
{ label: 'Revisões / Flashcards', value: totalReviews.toLocaleString('pt-BR'), unit: '', color: 'var(--tinta)', glow: '#7B67D8', icon: '🃏', sub: 'no total' },
{ label: 'Checks no edital', value: (objChecks + discChecks).toLocaleString('pt-BR'), unit: '', color: '#f59e0b', glow: '#ffc107', icon: '✓', sub: `Obj ${objChecks} · Disc ${discChecks}` },
{ label: 'Tópicos dominados', value: (objMastered + discMastered), unit: `/${objTotalTopics + discTotalTopics}`, color: 'var(--coral)', glow: '#FF7070', icon: '🏆', sub: `Obj ${objMastered} · Disc ${discMastered}` },
{ label: 'Pedem revisão', value: needsReview, unit: '', color: '#ff7a1a', glow: '#ffc107', icon: '✦', sub: needsReview > 0 ? '> 30 dias sem atividade' : 'tudo em dia!' },
];

return (
<div className="glass" style={{ padding: 18 }}>
<div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 6 }}>
<div>
<div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
TOTAIS ACUMULADOS · DESDE O INÍCIO
</div>
<div className="font-display" style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>
Sua jornada até agora 📊
</div>
</div>
<div style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, letterSpacing: '0.1em' }}>
{logs.length > 0
? `desde ${new Date(logs[0].date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: '2-digit' })}`
: 'aguardando primeiro registro'}
</div>
</div>

  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
    {items.map((m, i) => (
      <div key={i} style={{
        padding: 14, borderRadius: 12,
        background: `radial-gradient(ellipse at top, ${m.color}10, transparent 70%), rgba(255,255,255,0.55)`,
        border: `1px solid ${m.color}33`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: `${m.color}1f`,
            display: 'grid', placeItems: 'center',
            fontSize: 14, color: m.color,
            filter: `drop-shadow(0 0 4px ${m.glow}66)`,
          }}>{m.icon}</div>
          <div style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            {m.label}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span className="num" style={{ fontSize: 26, fontWeight: 700, color: m.color, letterSpacing: '-0.02em', textShadow: `0 0 10px ${m.glow}55` }}>
            {m.value}
          </span>
          <span className="num" style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 600 }}>
            {m.unit}
          </span>
        </div>
        <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>
          {m.sub}
        </div>
      </div>
    ))}
  </div>
</div>

);
}

// =============================================================================
// BACKUP SECTION — download / restore / reset
// =============================================================================
function BackupSection({ shared, objState, discState, onRestore, onReset, onToast }) {
const fileInputRef = useRef(null);

const handleExport = () => {
const backup = {
version: 'v3', exportedAt: new Date().toISOString(),
shared, objetiva: objState, discursiva: discState,
};
const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `defenders-ascent-backup-${new Date().toISOString().slice(0,10)}.json`;
document.body.appendChild(a); a.click(); document.body.removeChild(a);
URL.revokeObjectURL(url);
onToast('backup_done');
};

const handleImportClick = () => fileInputRef.current?.click();

const handleFileChange = (e) => {
const file = e.target.files?.[0];
if (!file) return;
const reader = new FileReader();
reader.onload = (ev) => {
try {
const data = JSON.parse(ev.target.result);
if (!data.shared || !data.objetiva || !data.discursiva) {
alert('Arquivo inválido. O backup precisa ter as chaves: shared, objetiva, discursiva.');
return;
}
const ok = window.confirm(
'Isso vai SOBRESCREVER todos os seus dados atuais (disciplinas, tópicos, XP, streak, heatmap, metas).\n\n' +
'Sugestão: faça um backup antes, caso queira voltar.\n\n' +
'Deseja continuar?'
);
if (!ok) return;
onRestore(data);
onToast('restore_done');
} catch (err) {
alert('Erro ao ler o arquivo: ' + err.message);
} finally {
e.target.value = '';
}
};
reader.readAsText(file);
};

const handleReset = () => {
const typed = window.prompt(
'⚠️ ATENÇÃO — Isso vai APAGAR todo o seu progresso:\n\n' +
'• Disciplinas, tópicos, checks\n' +
'• XP, streak, conquistas\n' +
'• Logs de estudo, heatmap\n' +
'• Pet volta para o ovo\n\n' +
'Faça backup antes! Para confirmar, digite exatamente:\n\nRESETAR TOGA'
);
if (typed !== 'RESETAR TOGA') return;
localStorage.removeItem('toga_onboarded');
onReset();
onToast('reset_done');
};

return (
<div className="glass" style={{ padding: 18 }}>
<div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap', justifyContent: 'space-between' }}>
<div style={{ minWidth: 0, flex: 1 }}>
<div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
DADOS · BACKUP & RESTAURO
</div>
<div className="font-display" style={{ fontSize: 18, fontWeight: 700, marginTop: 3 }}>
Seus dados, sob seu controle 💾
</div>
<div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, maxWidth: 580 }}>
Baixe um arquivo .json com todo o seu progresso (disciplinas, tópicos, simulados, XP, heatmap, metas).
Você pode restaurar esse arquivo aqui mesmo, em outro navegador, ou após uma reinstalação.
</div>
</div>
<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
<button className="btn-neon" onClick={handleExport}>
<I.download size={13} /> Baixar backup
</button>
<button className="btn-ghost" onClick={handleImportClick}
style={{ borderColor: 'rgba(245,158,11,0.4)', color: '#a14e0c', background: 'rgba(245,158,11,0.06)' }}>
<I.up size={13} /> Restaurar backup
</button>
<button className="btn-ghost" onClick={handleReset}
style={{ borderColor: 'rgba(232,93,93,0.4)', color: '#a82360', background: 'rgba(232,93,93,0.06)' }}>
<I.close size={13} /> Zerar sistema
</button>
<input ref={fileInputRef} type="file" accept="application/json,.json"
onChange={handleFileChange} className="file-input-hidden" />
</div>
</div>
</div>
);
}

// =============================================================================
// APP ROOT
// =============================================================================
function App() {
const [tweaks, setTweaks] = useTweaks(DEFAULTS);

// Primeiro uso: se não existe toga_onboarded, apaga dados herdados e inicia limpo
const [shared, setShared] = useState(() => {
  if (!localStorage.getItem('toga_onboarded')) {
    localStorage.removeItem(KEYS.shared);
    localStorage.removeItem(KEYS.obj);
    localStorage.removeItem(KEYS.disc);
    localStorage.removeItem(KEYS.meta);
    localStorage.setItem('toga_onboarded', '1');
  }
  return loadKey(KEYS.shared, window.DA.INITIAL_SHARED);
});
const [objState, setObjState] = useState(() => loadKey(KEYS.obj, window.DA.INITIAL_OBJETIVA));
const [discState, setDiscState] = useState(() => loadKey(KEYS.disc, window.DA.INITIAL_DISCURSIVA));
const [meta, setMeta] = useState(() => loadKey(KEYS.meta, { mode: tweaks.mode }));

useEffect(() => saveKey(KEYS.shared, shared), [shared]);
useEffect(() => saveKey(KEYS.obj, objState), [objState]);
useEffect(() => saveKey(KEYS.disc, discState), [discState]);
useEffect(() => saveKey(KEYS.meta, meta), [meta]);

// Backfill: ensure new fields exist on shared loaded from older localStorage
useEffect(() => {
setShared(s => ({
petHealth: s.petHealth || 'healthy',
goals: { dailyFlashcards: 30, ...s.goals },
...s,
}));
// Backfill lastStudiedAt nos tópicos da Objetiva e Discursiva
// Tópicos com qualquer check existente recebem a data de hoje (assume estudo recente)
// Tópicos sem nenhum check ficam com null (não pedem revisão)
const todayISO = new Date().toISOString();
const FLAGS_O = ['lei','doutrina','juris','questoes','revisao'];
const FLAGS_D = ['estudado','grifado','questoes'];
setObjState(o => ({
...o,
subjects: o.subjects.map(sub => ({
...sub,
topics: sub.topics.map(t => {
if (t.lastStudiedAt !== undefined) return t;
const hasCheck = FLAGS_O.some(f => t[f]);
return { ...t, lastStudiedAt: hasCheck ? todayISO : null };
}),
})),
}));
setDiscState(d => ({
...d,
subjects: d.subjects.map(sub => ({
...sub,
topics: sub.topics.map(t => {
if (t.lastStudiedAt !== undefined) return t;
const hasCheck = FLAGS_D.some(f => t[f]);
return { ...t, lastStudiedAt: hasCheck ? todayISO : null };
}),
})),
}));
}, []); // once

const mode = tweaks.mode;
const setMode = (m) => { setTweaks('mode', m); setMeta(mt => ({ ...mt, mode: m })); };

const [showSplash, setShowSplash] = useState(tweaks.showSplash);
const [pomodoroOpen, setPomodoroOpen] = useState(false);
const [goalsOpen, setGoalsOpen] = useState(false);
const [sessionLogOpen, setSessionLogOpen] = useState(false);
const [activeTab, setActiveTab] = useState('hoje');
const [legalModal, setLegalModal] = useState(null); // 'privacy' | 'terms' | null
const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem('toga_onboarded_tutorial'));
const [toasts, setToasts] = useState([]);
const [evolutionEvent, setEvolutionEvent] = useState(null);
const prevPetStageRef = useRef(window.DA.getPetStage(shared.xp));

const pushToast = (kind) => setToasts(t => [...t, { id: Math.random(), kind }]);

// ===== Evolution detection =====
useEffect(() => {
const stage = window.DA.getPetStage(shared.xp);
if (stage > prevPetStageRef.current) {
setEvolutionEvent({ from: prevPetStageRef.current, to: stage });
window.celebrateEvolution && window.celebrateEvolution();
prevPetStageRef.current = stage;
} else if (stage < prevPetStageRef.current) {
// XP went down (e.g. unchecking) — silently update without modal
prevPetStageRef.current = stage;
}
}, [shared.xp]);

// ===== Sick/healthy state machine — runs on every load and when logs change =====
useEffect(() => {
const next = window.DA.nextPetHealth(shared.petHealth || 'healthy', shared.dailyLogs || []);
if (next !== shared.petHealth) {
setShared(s => ({ ...s, petHealth: next }));
if (next === 'sick') {
pushToast('pet_sick');
window.playSick && window.playSick();
} else {
pushToast('pet_healed');
window.playHealed && window.playHealed();
window.celebrateLight && window.celebrateLight();
}
}
}, [shared.dailyLogs, shared.petHealth]);

// Re-check sick state once on mount (in case days passed since last visit)
useEffect(() => {
const next = window.DA.nextPetHealth(shared.petHealth || 'healthy', shared.dailyLogs || []);
if (next !== shared.petHealth) {
setShared(s => ({ ...s, petHealth: next }));
}
}, []);

const handleLog = (date, h, q, r) => {
setShared(s => {
const logs = [...s.dailyLogs];
const idx = logs.findIndex(l => l.date === date);
if (idx >= 0) {
logs[idx] = { ...logs[idx], hours: (logs[idx].hours||0) + h, questions: (logs[idx].questions||0) + q, reviews: (logs[idx].reviews||0) + r };
} else {
logs.push({ date, hours: h, questions: q, reviews: r });
logs.sort((a, b) => a.date.localeCompare(b.date));
}
const xpGain = Math.round(h * 30 + q * 1.5 + r * 2);
return { ...s, dailyLogs: logs, xp: s.xp + xpGain };
});
window.celebrateVictory && window.celebrateVictory();
};

const handleEnrichedLog = (logEntry) => {
setShared(s => {
const logs = [...s.dailyLogs];
const idx = logs.findIndex(l => l.date === logEntry.date);
if (idx >= 0) {
const existing = logs[idx];
logs[idx] = {
...existing,
hours: (existing.hours||0) + (logEntry.hours||0),
questions: (existing.questions||0) + (logEntry.questions||0),
correct: (existing.correct||0) + (logEntry.correct||0),
wrong: (existing.wrong||0) + (logEntry.wrong||0),
reviews: (existing.reviews||0) + (logEntry.reviews||0),
entries: [...(existing.entries||[]), logEntry],
};
} else {
logs.push({ ...logEntry, entries: [logEntry] });
logs.sort((a, b) => a.date.localeCompare(b.date));
}
const xpGain = Math.round((logEntry.hours||0) * 30 + (logEntry.questions||0) * 1.5 + (logEntry.reviews||0) * 2);
return { ...s, dailyLogs: logs, xp: s.xp + xpGain };
});
window.celebrateLight && window.celebrateLight();
};

const handleSession = ({ minutes, xp, subjectId }) => {
setShared(s => ({ ...s, xp: s.xp + xp }));
if (minutes === 90) pushToast('marathon');
window.celebrateVictory();
};

const handleMaster = () => {
setShared(s => ({ ...s, xp: s.xp + 25 }));
if (!shared.achievements.includes('first_mastered')) {
pushToast('first_mastered');
setShared(s => ({ ...s, achievements: [...s.achievements, 'first_mastered'] }));
}
};

// XP from check/uncheck on syllabus matrices
const handleCheckXp = (delta) => {
setShared(s => ({ ...s, xp: Math.max(0, s.xp + delta) }));
};

const setHeatmap = (updater) => {
setObjState(o => ({ ...o, heatmap: typeof updater === 'function' ? updater(o.heatmap) : updater }));
};

const setConcursos = (updater) => {
setShared(s => ({ ...s, concursos: typeof updater === 'function' ? updater(s.concursos) : updater }));
};

const handleRestore = (backup) => {
setShared(backup.shared);
setObjState(backup.objetiva);
setDiscState(backup.discursiva);
prevPetStageRef.current = window.DA.getPetStage(backup.shared.xp || 0);
};

const handleReset = () => {
setShared(window.DA.INITIAL_SHARED);
setObjState(window.DA.INITIAL_OBJETIVA);
setDiscState(window.DA.INITIAL_DISCURSIVA);
prevPetStageRef.current = 1;
};

const handleSaveGoals = (newGoals) => {
setShared(s => ({ ...s, goals: { ...s.goals, ...newGoals } }));
pushToast('goals_saved');
};

if (showSplash) {
return <SplashScreen onEnter={() => { setShowSplash(false); setTweaks('showSplash', false); }} />;
}

const activeSubjects = mode === 'objetiva' ? objState.subjects : discState.subjects;
const totalStats = mode === 'objetiva' ? window.DA.getTotalStatsObj(objState.subjects) : window.DA.getTotalStatsDisc(discState.subjects);
const isSick = shared.petHealth === 'sick';

const TABS = [
  { id: 'hoje',         label: 'HOJE',    icon: '🏠' },
  { id: 'edital',       label: 'EDITAL',  icon: '📋' },
  { id: 'estatisticas', label: 'STATS',   icon: '📊' },
  { id: 'provas',       label: 'PROVAS',  icon: '🎯' },
  { id: 'ajustes',      label: 'AJUSTES', icon: '⚙️' },
];

return (
<div style={{ position: 'relative', zIndex: 1 }}>
<div className="aurora" />
<div className="dot-grid" />

  <GlobalHeader shared={shared} mode={mode} setMode={setMode} totalPct={totalStats.percentage} />

  {/* Sidebar nav (desktop) */}
  <nav className="nav-sidebar">
    <div className="nav-sidebar-brand">TOGA ⚖️</div>
    {TABS.map(tab => (
      <button key={tab.id} className={`nav-tab ${activeTab === tab.id ? 'nav-tab-active' : ''}`}
        onClick={() => setActiveTab(tab.id)}>
        <span className="nav-tab-icon">{tab.icon}</span>
        <span>{tab.label}</span>
      </button>
    ))}
  </nav>

  {/* Bottom nav (mobile) */}
  <nav className="nav-bottom">
    {TABS.map(tab => (
      <button key={tab.id} className={`nav-tab ${activeTab === tab.id ? 'nav-tab-active' : ''}`}
        onClick={() => setActiveTab(tab.id)}>
        <span className="nav-tab-icon">{tab.icon}</span>
        <span>{tab.label}</span>
      </button>
    ))}
  </nav>

  <main className="toga-main" style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px 100px', position: 'relative' }}>

    {/* ── ABA: HOJE ── */}
    {activeTab === 'hoje' && (
      <>
        <style>{`@media (max-width: 900px) { .greeting-row { grid-template-columns: 1fr !important; } }`}</style>
        <div className="greeting-row" style={{ display: 'grid', gap: 16, gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr)', marginBottom: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <div className="font-display" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>
                Bom estudo, <span className="gradient-neon">Concurseiro(a)</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>
                {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })} ·
                {' '}<span style={{ fontWeight: 600, color: mode === 'objetiva' ? 'var(--ciano)' : 'var(--coral)' }}>
                  Modo {mode === 'objetiva' ? 'Objetiva' : 'Discursiva'}
                </span>
              </div>
            </div>
            <PetCompanion xp={shared.xp} sick={isSick} dailyLogs={shared.dailyLogs} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn-ghost" onClick={() => setGoalsOpen(true)}
                style={{ borderColor: 'rgba(91,71,184,0.4)', color: 'var(--tinta)', background: 'rgba(91,71,184,0.06)', fontWeight: 600, fontSize: 12 }}>
                🎯 Metas
              </button>
              <button className="btn-neon" onClick={() => setSessionLogOpen(true)} style={{ fontSize: 12 }}>
                ✏️ Registrar sessão
              </button>
              <button className="btn-ghost" onClick={() => setPomodoroOpen(true)} style={{ fontSize: 12 }}>
                🛡 Blindado
              </button>
            </div>
            <GavelBar percentage={totalStats.percentage} streak={shared.streak} shields={shared.shields} />
          </div>
        </div>

        <section style={{ marginBottom: 16 }}>
          <MetricsRow shared={shared} setShared={setShared} />
        </section>

        <section style={{ marginBottom: 16 }}>
          <TotalsSection shared={shared} objState={objState} discState={discState} />
        </section>

        <section style={{ marginBottom: 16 }}>
          <InsightsPanel shared={shared} objState={objState} discState={discState} />
        </section>

        <div className="dual-grid" style={{ display: 'grid', gap: 14, marginBottom: 16 }}>
          <StudyHeatmap logs={shared.dailyLogs} />
          <FlashcardHeatmap logs={shared.dailyLogs} />
        </div>
      </>
    )}

    {/* ── ABA: EDITAL ── */}
    {activeTab === 'edital' && (
      <>
        <section style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
            <div className="font-display" style={{ fontSize: 20, fontWeight: 700 }}>
              Matriz do Edital
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', fontWeight: 600 }}>
              · {mode === 'objetiva' ? 'OBJETIVA' : 'DISCURSIVA'}
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-dim)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
              cada check +5 XP
            </div>
          </div>
          {mode === 'objetiva'
            ? <SyllabusMatrixObjetiva state={objState} setState={setObjState} onMaster={handleMaster} onCheckXp={handleCheckXp} />
            : <SyllabusMatrixDiscursiva state={discState} setState={setDiscState} onCheckXp={handleCheckXp} />}
        </section>

        {activeSubjects.length > 0 && (
          <section style={{ marginBottom: 16 }}>
            <SubjectDonuts subjects={activeSubjects} mode={mode} />
          </section>
        )}

        <section style={{ marginBottom: 16 }}>
          <EditalHeatmap subjects={mode === 'objetiva' ? objState.subjects : discState.subjects} mode={mode} />
        </section>
      </>
    )}

    {/* ── ABA: ESTATÍSTICAS ── */}
    {activeTab === 'estatisticas' && (
      <StatsPage shared={shared} objState={objState} discState={discState} />
    )}

    {/* ── ABA: PROVAS ── */}
    {activeTab === 'provas' && (
      <>
        <div className="font-display" style={{ fontSize: 20, fontWeight: 700, color: 'var(--petroleo)', marginBottom: 16 }}>
          Meus Concursos
        </div>
        <section style={{ marginBottom: 16 }}>
          <ConcursoDonuts concursos={shared.concursos} setConcursos={setConcursos} />
        </section>
        {shared.concursos && shared.concursos.length > 0 && (
          <section style={{ marginBottom: 16 }}>
            <ConcursoTimeline concursos={shared.concursos} onAddConcurso={(c) => setConcursos(cs => [...cs, c])} />
          </section>
        )}
        {(!shared.concursos || shared.concursos.length === 0) && (
          <div className="glass" style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🎯</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Nenhum concurso cadastrado</div>
            <div style={{ fontSize: 13 }}>Use o botão "Adicionar concurso" acima para começar a monitorar suas provas.</div>
          </div>
        )}
      </>
    )}

    {/* ── ABA: AJUSTES ── */}
    {activeTab === 'ajustes' && (
      <>
        <div className="font-display" style={{ fontSize: 20, fontWeight: 700, color: 'var(--petroleo)', marginBottom: 16 }}>
          Ajustes
        </div>

        <section style={{ marginBottom: 14 }}>
          <div className="glass" style={{ padding: 18 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, marginBottom: 6 }}>METAS PESSOAIS</div>
            <div className="font-display" style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Configure suas metas diárias e semanais</div>
            <button className="btn-neon" onClick={() => setGoalsOpen(true)} style={{ fontSize: 13 }}>
              🎯 Configurar metas
            </button>
          </div>
        </section>

        <section style={{ marginBottom: 14 }}>
          <BackupSection shared={shared} objState={objState} discState={discState}
            onRestore={handleRestore} onReset={handleReset} onToast={pushToast} />
        </section>

        <section style={{ marginBottom: 14 }}>
          <div className="glass" style={{ padding: 18 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, marginBottom: 6 }}>TUTORIAL</div>
            <div className="font-display" style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Rever o tutorial de boas-vindas</div>
            <button className="btn-ghost" onClick={() => setShowOnboarding(true)} style={{ fontSize: 13 }}>
              📖 Ver tutorial novamente
            </button>
          </div>
        </section>

        <section style={{ marginBottom: 14 }}>
          <div className="glass" style={{ padding: 18 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, marginBottom: 6 }}>INFORMAÇÕES LEGAIS</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
              <button className="btn-ghost" onClick={() => setLegalModal('privacy')} style={{ fontSize: 12 }}>
                🔒 Política de Privacidade
              </button>
              <button className="btn-ghost" onClick={() => setLegalModal('terms')} style={{ fontSize: 12 }}>
                📄 Termos de Uso
              </button>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 10, fontFamily: 'JetBrains Mono, monospace' }}>
              TOGA v1.0 · Todos os dados ficam no seu dispositivo
            </div>
          </div>
        </section>
      </>
    )}

  </main>

  <QuickLogFAB onLog={handleLog} onOpenPomodoro={() => setPomodoroOpen(true)} />
  <SessionLogModal open={sessionLogOpen} subjects={objState.subjects}
    onSave={handleEnrichedLog} onClose={() => setSessionLogOpen(false)} />
  <PomodoroModal open={pomodoroOpen} onClose={() => setPomodoroOpen(false)}
    subjects={activeSubjects.length ? activeSubjects : objState.subjects} onCompleteSession={handleSession} />
  <GoalsModal open={goalsOpen} goals={shared.goals} onSave={handleSaveGoals} onClose={() => setGoalsOpen(false)} />

  {showOnboarding && <OnboardingModal onDone={() => setShowOnboarding(false)} />}
  {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}

  {evolutionEvent && (
    <EvolutionModal fromStage={evolutionEvent.from} toStage={evolutionEvent.to}
      onClose={() => setEvolutionEvent(null)} />
  )}

  {toasts.map(t => (
    <AchievementToast key={t.id} kind={t.kind} onDone={() => setToasts(ts => ts.filter(x => x.id !== t.id))} />
  ))}

  <TweaksPanel title="Tweaks · TOGA">
    <TweakSection label="Modo">
      <TweakRadio label="Fase" value={tweaks.mode}
        options={[{ value: 'objetiva', label: 'Objetiva' }, { value: 'discursiva', label: 'Discursiva' }]}
        onChange={(v) => { setTweaks('mode', v); setMeta(m => ({ ...m, mode: v })); }} />
      <TweakToggle label="Mostrar Splash" value={tweaks.showSplash}
        onChange={(v) => setTweaks('showSplash', v)} />
    </TweakSection>
    <TweakSection label="Backup">
      <TweakButton label="💾 Baixar backup" onClick={() => {
        const backup = { version: 'v3', exportedAt: new Date().toISOString(), shared, objetiva: objState, discursiva: discState };
        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `toga-backup-${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
        pushToast('backup_done');
      }} />
    </TweakSection>
    <TweakSection label="Pet sandbox">
      <TweakButton label="+250 XP" onClick={() => setShared(s => ({ ...s, xp: s.xp + 250 }))} />
      <TweakButton label="+1000 XP" onClick={() => setShared(s => ({ ...s, xp: s.xp + 1000 }))} />
      <TweakButton label="+3000 XP" onClick={() => setShared(s => ({ ...s, xp: s.xp + 3000 }))} />
      <TweakButton label="Reset XP" onClick={() => { setShared(s => ({ ...s, xp: 0 })); prevPetStageRef.current = 1; }} />
      <TweakButton label="XP=15k" onClick={() => setShared(s => ({ ...s, xp: 15000 }))} />
      <TweakButton label="Pet doente" onClick={() => { setShared(s => ({ ...s, petHealth: 'sick' })); pushToast('pet_sick'); }} />
      <TweakButton label="Pet saudável" onClick={() => { setShared(s => ({ ...s, petHealth: 'healthy' })); pushToast('pet_healed'); }} />
    </TweakSection>
    <TweakSection label="Celebrações">
      <TweakButton label="✨ Leve" onClick={() => window.celebrateLight && window.celebrateLight()} />
      <TweakButton label="🎉 Meta" onClick={() => window.celebrateHighEnergy && window.celebrateHighEnergy()} />
      <TweakButton label="🏆 Vitória" onClick={() => window.celebrateVictory && window.celebrateVictory()} />
      <TweakButton label="🌟 Evolução" onClick={() => window.celebrateEvolution && window.celebrateEvolution()} />
    </TweakSection>
    <TweakSection label="Limpar dados">
      <TweakButton label="Reset Objetiva" onClick={() => setObjState(window.DA.INITIAL_OBJETIVA)} />
      <TweakButton label="Reset Discursiva" onClick={() => setDiscState(window.DA.INITIAL_DISCURSIVA)} />
    </TweakSection>
  </TweaksPanel>

  <div id="confetti-root" />
</div>

);
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
