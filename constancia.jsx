// TOGA — Constância Tracker (Bloco 8)
// Calendário de constância: dias úteis com 30min+ contam; fins de semana são neutros.

const CONSTANCIA_THRESHOLD_H = 0.5; // 30 minutos

function calcConstanciaStreak(logs) {
  const today = new Date(); today.setHours(0,0,0,0);
  const logMap = new Map((logs || []).map(l => [l.date, l]));
  let streak = 0;

  for (let i = 0; i < 365; i++) {
    const d = new Date(today); d.setDate(today.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const dow = d.getDay();
    const isWeekend = dow === 0 || dow === 6;
    if (isWeekend) continue;
    const log = logMap.get(iso);
    const hours = log ? (log.hours || 0) : 0;
    if (hours >= CONSTANCIA_THRESHOLD_H) {
      streak++;
    } else {
      // Hoje sem estudo ainda não quebra (só conta a partir de amanhã)
      if (i === 0) continue;
      break;
    }
  }
  return streak;
}

function ConstanciaTracker({ logs }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const todayISO = today.toISOString().slice(0, 10);
  const logMap = new Map((logs || []).map(l => [l.date, l]));

  // Find the Monday 4 weeks before the current week's Monday → 5 weeks total
  const todayDow = today.getDay(); // 0=Sun..6=Sat
  const daysToMon = todayDow === 0 ? 6 : todayDow - 1;
  const currentMonday = new Date(today);
  currentMonday.setDate(today.getDate() - daysToMon);
  const startDate = new Date(currentMonday);
  startDate.setDate(currentMonday.getDate() - 28); // 4 weeks back

  // Generate 35 cells (5 weeks × 7 days, Mon..Sun)
  const cells = [];
  for (let i = 0; i < 35; i++) {
    const d = new Date(startDate); d.setDate(startDate.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    const dow = d.getDay(); // 0=Sun..6=Sat
    const isWeekend = dow === 0 || dow === 6;
    const isFuture = d > today;
    const isToday  = iso === todayISO;
    const log = logMap.get(iso);
    const hours = log ? (log.hours || 0) : 0;
    const studied = hours >= CONSTANCIA_THRESHOLD_H;

    let status;
    if (isFuture) status = 'future';
    else if (studied) status = 'ok';
    else if (isWeekend) status = 'weekend';
    else if (isToday) status = 'today';
    else status = 'missed';

    cells.push({ iso, dow, isWeekend, isFuture, isToday, hours, status, day: d.getDate() });
  }

  const streak = calcConstanciaStreak(logs || []);
  const glowing = streak >= 5;

  const STYLE = {
    ok:      { bg: 'rgba(0,168,107,0.18)',   border: '#00A86B',                color: '#00A86B',         icon: '✓' },
    missed:  { bg: 'rgba(245,158,11,0.13)',  border: '#F59E0B',                color: '#F59E0B',         icon: '✕' },
    weekend: { bg: 'rgba(90,100,120,0.05)',  border: 'rgba(90,100,120,0.12)',  color: 'var(--text-dim)', icon: '·' },
    today:   { bg: 'rgba(0,184,212,0.12)',   border: '#00B8D4',                color: '#00B8D4',         icon: '○' },
    future:  { bg: 'transparent',            border: 'transparent',            color: 'transparent',     icon: '' },
  };

  const DOWS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  return (
    <div className="glass" style={{
      padding: 16,
      ...(glowing ? { boxShadow: '0 0 0 1px rgba(0,184,212,0.45), 0 0 18px rgba(0,217,255,0.30), 0 1px 2px rgba(42,45,58,0.04)' } : {}),
      transition: 'box-shadow 300ms ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
            CONSTÂNCIA · ÚLTIMAS 5 SEMANAS
          </div>
          <div className="font-display" style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>
            {glowing ? '🔥 ' : ''}{streak} dia{streak !== 1 ? 's' : ''} útil{streak !== 1 ? 'eis' : ''} consecutivo{streak !== 1 ? 's' : ''}
          </div>
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <span><span style={{ color: '#00A86B', fontWeight: 700 }}>✓</span> 30min+</span>
          <span><span style={{ color: '#F59E0B', fontWeight: 700 }}>✕</span> faltou</span>
          <span><span style={{ color: 'var(--text-dim)' }}>·</span> fim de semana</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 5 }}>
        {DOWS.map((d, i) => (
          <div key={'h'+i} style={{
            textAlign: 'center', fontSize: 9, color: 'var(--text-dim)',
            fontWeight: 700, letterSpacing: '0.05em', paddingBottom: 4,
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            {d.toUpperCase()}
          </div>
        ))}
        {cells.map((c, i) => {
          const s = STYLE[c.status];
          return (
            <div key={i} style={{
              display: 'grid', placeItems: 'center',
              height: 34, borderRadius: 7,
              background: s.bg,
              border: `1px solid ${s.border}`,
              fontSize: 13, color: s.color,
              fontWeight: c.status === 'ok' || c.status === 'missed' ? 700 : 500,
              transition: 'all 150ms ease',
              position: 'relative',
            }} title={c.isFuture ? '' : `${c.iso}: ${c.hours.toFixed(1)}h`}>
              {c.status !== 'future' && (
                <>
                  <span style={{ position: 'absolute', top: 2, left: 4, fontSize: 8, color: 'var(--text-dim)', fontWeight: 600 }}>{c.day}</span>
                  <span style={{ fontSize: c.status === 'today' ? 11 : 13 }}>{s.icon}</span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {glowing && (
        <div style={{ marginTop: 10, fontSize: 11, color: 'var(--ciano)', fontWeight: 700, textAlign: 'center', letterSpacing: '0.05em' }}>
          ✨ Você está em chamas! Mantenha a constância.
        </div>
      )}
    </div>
  );
}

window.ConstanciaTracker = ConstanciaTracker;
window.calcConstanciaStreak = calcConstanciaStreak;
