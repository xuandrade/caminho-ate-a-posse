// TOGA — Constância Tracker (GitHub-style contribution heatmap)

const CONSTANCIA_THRESHOLD_H = 0.5; // 30 min counts as a studied day

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
      if (i === 0) continue; // today without study yet doesn't break streak
      break;
    }
  }
  return streak;
}

function getCellStyle(hours, isWeekend, isFuture, isToday) {
  if (isFuture) return { bg: 'transparent', border: 'transparent' };
  const h = hours || 0;
  if (h >= 2)    return { bg: '#00A86B',              border: '#00A86B' };
  if (h >= 1)    return { bg: 'rgba(0,168,107,0.68)', border: 'rgba(0,168,107,0.7)' };
  if (h >= 0.5)  return { bg: 'rgba(0,168,107,0.43)', border: 'rgba(0,168,107,0.5)' };
  if (h > 0)     return { bg: 'rgba(0,168,107,0.2)',  border: 'rgba(0,168,107,0.28)' };
  if (isWeekend) return { bg: 'rgba(90,100,120,0.07)', border: 'rgba(90,100,120,0.13)' };
  return { bg: 'rgba(245,158,11,0.2)', border: 'rgba(245,158,11,0.28)' }; // missed weekday
}

const MONTHS_PT = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
// Only show label for Mon(0), Wed(2), Fri(4) rows — blank string keeps the spacing
const DOW_LABELS = ['Seg', '', 'Qua', '', 'Sex', '', 'Dom'];

const WEEKS = 18;
const CELL = 11;
const GAP  = 3;

function ConstanciaTracker({ logs }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const todayISO = today.toISOString().slice(0, 10);
  const logMap = new Map((logs || []).map(l => [l.date, l]));

  // Find the Monday of the current week, then go back WEEKS-1 more weeks
  const dow = today.getDay(); // 0=Sun..6=Sat
  const daysToMon = dow === 0 ? 6 : dow - 1;
  const thisMon = new Date(today); thisMon.setDate(today.getDate() - daysToMon);
  const startMon = new Date(thisMon); startMon.setDate(thisMon.getDate() - (WEEKS - 1) * 7);

  // weeks[w][d]: w=0 oldest week, d=0 Monday .. d=6 Sunday
  const weeks = [];
  for (let w = 0; w < WEEKS; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startMon);
      date.setDate(startMon.getDate() + w * 7 + d);
      const iso = date.toISOString().slice(0, 10);
      const dayDow = date.getDay();
      const isWeekend = dayDow === 0 || dayDow === 6;
      const isFuture = date > today;
      const isToday  = iso === todayISO;
      const log = logMap.get(iso);
      const hours = log ? (log.hours || 0) : 0;
      const cell = getCellStyle(hours, isWeekend, isFuture, isToday);
      week.push({ iso, isWeekend, isFuture, isToday, hours, cell, month: date.getMonth() });
    }
    weeks.push(week);
  }

  // Month label shown above a column when its Monday starts a new month
  const monthLabels = weeks.map((week, wi) => {
    if (wi === 0) return MONTHS_PT[week[0].month];
    if (week[0].month !== weeks[wi - 1][0].month) return MONTHS_PT[week[0].month];
    return null;
  });

  const streak = calcConstanciaStreak(logs || []);
  const glowing = streak >= 5;

  return (
    <div className="glass" style={{
      padding: '14px 16px',
      transition: 'box-shadow 300ms ease',
      ...(glowing ? { boxShadow: '0 0 0 1px rgba(0,184,212,0.4), 0 0 18px rgba(0,217,255,0.25)' } : {}),
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
            CONSTÂNCIA · ÚLTIMAS {WEEKS} SEMANAS
          </div>
          <div className="font-display" style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>
            {glowing ? '🔥 ' : ''}{streak} dia{streak !== 1 ? 's' : ''} útil{streak !== 1 ? 'eis' : ''} consecutivo{streak !== 1 ? 's' : ''}
          </div>
        </div>
        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, color: 'var(--text-dim)', fontFamily: 'JetBrains Mono, monospace' }}>
          <span>Menos</span>
          {[
            'rgba(90,100,120,0.1)',
            'rgba(0,168,107,0.2)',
            'rgba(0,168,107,0.43)',
            'rgba(0,168,107,0.68)',
            '#00A86B',
          ].map((c, i) => (
            <div key={i} style={{ width: CELL, height: CELL, borderRadius: 2, background: c, flexShrink: 0 }} />
          ))}
          <span>Mais</span>
        </div>
      </div>

      {/* Heatmap grid */}
      <div style={{ overflowX: 'auto', paddingBottom: 2 }}>
        <div style={{ display: 'flex', gap: GAP, alignItems: 'flex-start', width: 'max-content' }}>

          {/* Day-of-week labels on the left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, paddingTop: 16, flexShrink: 0 }}>
            {DOW_LABELS.map((label, i) => (
              <div key={i} style={{
                height: CELL,
                width: 26,
                fontSize: 8,
                color: 'var(--text-dim)',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                letterSpacing: '0.04em',
              }}>
                {label}
              </div>
            ))}
          </div>

          {/* Week columns */}
          {weeks.map((week, wi) => (
            <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: GAP, flexShrink: 0 }}>
              {/* Month label (14px tall to align above cells) */}
              <div style={{
                height: 14,
                fontSize: 8,
                color: 'var(--text-muted)',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600,
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
                visibility: monthLabels[wi] ? 'visible' : 'hidden',
              }}>
                {monthLabels[wi] || 'x'}
              </div>

              {/* Day cells for this week */}
              {week.map((day, di) => (
                <div
                  key={di}
                  title={day.isFuture ? '' : `${day.iso} · ${day.hours.toFixed(1)}h`}
                  style={{
                    width: CELL,
                    height: CELL,
                    borderRadius: 2,
                    background: day.cell.bg,
                    border: `1px solid ${day.cell.border}`,
                    flexShrink: 0,
                    transition: 'transform 80ms ease, opacity 80ms ease',
                    cursor: day.isFuture ? 'default' : 'default',
                    ...(day.isToday ? {
                      outline: '1.5px solid rgba(0,184,212,0.75)',
                      outlineOffset: '1px',
                    } : {}),
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {glowing && (
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--ciano)', fontWeight: 700, textAlign: 'center', letterSpacing: '0.04em' }}>
          ✨ Você está em chamas! Mantenha a constância.
        </div>
      )}
    </div>
  );
}

window.ConstanciaTracker = ConstanciaTracker;
window.calcConstanciaStreak = calcConstanciaStreak;
