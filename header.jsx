// Header — light, with shield, level, XP, streak, settings button
function GlobalHeader({ shared, mode, setMode, totalPct, onOpenSettings }) {
const level = window.DA.getLevelInfo(shared.xp);
return (
<header className="header-sticky">
<div style={{ maxWidth: 1400, margin: '0 auto', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
<ShieldBadge percent={totalPct} size={46} />
<div style={{ flex: 1, minWidth: 200 }}>
<div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
<div className="font-display gradient-neon" style={{ fontSize: 22, fontWeight: 700 }}>
TOGA
</div>
</div>
<div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 3, fontSize: 12, color: 'var(--text-muted)' }}>
<span style={{ color: level.tier.color, fontWeight: 600 }}>{level.tier.name}</span>
<span style={{ color: 'var(--text-dim)' }}>·</span>
<span>Seu progresso no edital: {totalPct.toFixed(0)}%</span>
</div>
</div>

    {/* Mode toggle */}
    <div className="mode-toggle">
      <button className={`${mode === 'objetiva' ? 'active objetiva' : ''}`} onClick={() => setMode('objetiva')}>
        Objetiva
      </button>
      <button className={`${mode === 'discursiva' ? 'active discursiva' : ''}`} onClick={() => setMode('discursiva')}>
        Discursiva
      </button>
    </div>

    <div className="glass" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ color: 'var(--tinta)', fontSize: 14 }}>⚡</span>
      <span className="num" style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
        {shared.xp.toLocaleString('pt-BR')}
      </span>
      <span style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.1em' }}>XP</span>
    </div>

    <div className="glass" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ fontSize: 14 }}>🔥</span>
      <span className="num" style={{ fontSize: 14, fontWeight: 700, color: 'var(--neon-gold)' }}>{shared.streak}</span>
    </div>

    {/* Settings button */}
    <button onClick={onOpenSettings} title="Backup e configurações"
      style={{
        width: 38, height: 38, borderRadius: 10,
        background: 'rgba(255,255,255,0.7)',
        border: '1px solid rgba(12,13,18,0.08)',
        color: 'var(--text-muted)', cursor: 'pointer',
        display: 'grid', placeItems: 'center',
        transition: 'all 150ms ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,184,212,0.6)'; e.currentTarget.style.color = 'var(--neon-cyan)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(12,13,18,0.08)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    </button>
  </div>
</header>
);
}

window.GlobalHeader = GlobalHeader;
