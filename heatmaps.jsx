// SubjectDonuts + smaller heatmaps — 365-day version
function SubjectDonuts({ subjects, mode = 'objetiva' }) {
const colors = ['#00b8d4', 'var(--tinta)', 'var(--esmeralda)', '#f59e0b', 'var(--coral)', '#00b8d4', 'var(--tinta)'];
const compute = mode === 'discursiva' ? window.DA.getSubjectCompletionDisc : window.DA.getSubjectCompletionObj;
return (
<div className="glass" style={{ padding: 16 }}>
<div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: 14, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
CONCLUSÃO POR DISCIPLINA
</div>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 14 }}>
{subjects.map((s, i) => {
const pct = compute(s);
const color = colors[i % colors.length];
return (
<div key={s.id} style={{ textAlign: 'center', animation: `donut-in 500ms ${i * 80}ms ease-out both` }}>
<div style={{ position: 'relative', width: 84, height: 84, margin: '0 auto' }}>
<svg viewBox="0 0 100 100" width={84} height={84} className="donut-ring">
<circle cx="50" cy="50" r="42" fill="none" stroke="rgba(12,13,18,0.06)" strokeWidth="8" />
<circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="8"
strokeDasharray={`${(pct / 100) * 264} 264`} strokeLinecap="round"
style={{ filter: `drop-shadow(0 0 4px ${color}80)`, transition: 'stroke-dasharray 600ms ease' }} />
</svg>
<div className="num" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: 16, fontWeight: 700, color }}>
{Math.round(pct)}<span style={{ fontSize: 9, opacity: 0.7 }}>%</span>
</div>
</div>
<div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, minHeight: 26, lineHeight: 1.2 }}>
{s.shortName || s.name}
</div>
</div>
);
})}
</div>
</div>
);
}

// Build 365 cells (53 weeks worth, but we cap at exactly 365)
function buildHeat(logs, field) {
const DAYS = 365;
const today = new Date();
today.setHours(0, 0, 0, 0);
// Align to start so we end on today's column. Start = today - 364 days
const start = new Date(today);
start.setDate(start.getDate() - (DAYS - 1));
// Pad start to a Sunday so the grid columns are clean weeks
const padStart = new Date(start);
padStart.setDate(padStart.getDate() - padStart.getDay());

const map = new Map(logs.map(l => [l.date, l]));
const cells = [];
const totalCells = Math.ceil((today - padStart) / 86400000) + 1;
for (let i = 0; i < totalCells; i++) {
const d = new Date(padStart);
d.setDate(padStart.getDate() + i);
const iso = d.toISOString().slice(0, 10);
const beforeStart = d < start;
const log = map.get(iso);
cells.push({
date: iso,
value: log ? log[field] : 0,
placeholder: beforeStart, // padding cells before the 365-day window
});
}
const weeks = Math.ceil(totalCells / 7);
return { cells, weeks };
}

function HeatmapCard({ logs, title, field, color, label, unit }) {
const { cells, weeks } = buildHeat(logs, field);
const realCells = cells.filter(c => !c.placeholder);
const values = realCells.map(c => c.value);
const max = Math.max(1, ...values);
const total = values.reduce((a, v) => a + v, 0);
const active = values.filter(v => v > 0).length;

const cellStyle = (v, placeholder) => {
if (placeholder) return { bg: 'transparent', border: 'transparent' };
if (v === 0) return { bg: 'rgba(12,13,18,0.04)', border: 'rgba(12,13,18,0.05)' };
const t = Math.min(1, v / max);
return {
bg: `color-mix(in oklab, ${color} ${20 + t * 70}%, white)`,
border: `color-mix(in oklab, ${color} ${50 + t * 40}%, transparent)`,
};
};

// Month labels — show one per month at the appropriate column
const monthLabels = [];
let lastMonth = -1;
for (let w = 0; w < weeks; w++) {
const c = cells[w * 7]; // first cell (Sunday) of each week column
if (!c || c.placeholder) continue;
const d = new Date(c.date);
const m = d.getMonth();
if (m !== lastMonth) {
monthLabels.push({ col: w, label: d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '') });
lastMonth = m;
}
}

const CELL = 11;
const GAP = 2;

return (
<div className="glass" style={{ padding: 14 }}>
<div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 6 }}>
<div>
<div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
{title}
</div>
<div className="font-display" style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>
<span className="num" style={{ color }}>{total.toFixed(field === 'hours' ? 1 : 0)}</span>
<span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 6, fontWeight: 400 }}>{label} · {active}d ativos no ano</span>
</div>
</div>
<div style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 9, color: 'var(--text-dim)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, letterSpacing: '0.1em' }}>
menos
{[0.15, 0.4, 0.7, 0.95].map((t, i) => (
<div key={i} style={{
width: 9, height: 9, borderRadius: 2,
background: `color-mix(in oklab, ${color} ${20 + t * 70}%, white)`,
}} />
))}
mais
</div>
</div>

  <div style={{ overflowX: 'auto', paddingBottom: 6 }}>
    <div style={{ display: 'inline-block', minWidth: 'min-content' }}>
      {/* Month labels row */}
      <div style={{
        position: 'relative', height: 14, marginBottom: 3,
        width: weeks * (CELL + GAP),
      }}>
        {monthLabels.map((m, i) => (
          <div key={i} style={{
            position: 'absolute', left: m.col * (CELL + GAP),
            fontSize: 9, color: 'var(--text-dim)',
            fontFamily: 'JetBrains Mono, monospace', fontWeight: 600,
            letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            {m.label}
          </div>
        ))}
      </div>
      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${weeks}, ${CELL}px)`,
        gridAutoFlow: 'column',
        gridTemplateRows: `repeat(7, ${CELL}px)`,
        gap: GAP,
      }}>
        {cells.map((c, i) => {
          const { bg, border } = cellStyle(c.value, c.placeholder);
          return (
            <div key={i}
              className={c.placeholder ? '' : 'heat-cell'}
              style={{
                background: bg,
                border: c.placeholder ? 'none' : `1px solid ${border}`,
                borderRadius: 2,
                width: CELL, height: CELL,
              }}
              title={c.placeholder ? '' : `${c.date}: ${c.value.toFixed(field === 'hours' ? 1 : 0)}${unit}`} />
          );
        })}
      </div>
    </div>
  </div>
  <div style={{ marginTop: 6, fontSize: 9, color: 'var(--text-dim)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, letterSpacing: '0.1em' }}>
    ÚLTIMOS 365 DIAS
  </div>
</div>

);
}

function StudyHeatmap({ logs }) { return <HeatmapCard logs={logs} title="HEATMAP DE ESTUDO" field="hours" color="#00b8d4" label="horas" unit="h" />; }
function FlashcardHeatmap({ logs }) { return <HeatmapCard logs={logs} title="QUESTÕES / FLASHCARDS" field="questions" color="var(--tinta)" label="questões" unit="" />; }

window.SubjectDonuts = SubjectDonuts;
window.StudyHeatmap = StudyHeatmap;
window.FlashcardHeatmap = FlashcardHeatmap;