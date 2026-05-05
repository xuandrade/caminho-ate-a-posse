// TOGA — Modal de Registro Enriquecido de Sessão (Bloco 5)
// Suporta entrada manual de duração OU cronômetro (count-up).
// Aceita disciplinas dos dois modos (objetiva + discursiva) e tipo de estudo customizado.
// Reusável em modo "novo" e "edição" via prop initialEntry.

const STUDY_TYPES_DEFAULT = [
  'Lei seca', 'Teoria', 'Jurisprudência', 'Questões',
  'Revisão', 'Mapa mental', 'Aula', 'Simulado',
];

// Lê tipos customizados persistidos pelo usuário
function loadCustomStudyTypes() {
  try {
    const raw = localStorage.getItem('toga_custom_study_types');
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter(s => typeof s === 'string') : [];
  } catch { return []; }
}
function saveCustomStudyTypes(arr) {
  try { localStorage.setItem('toga_custom_study_types', JSON.stringify(arr)); } catch {}
}

// Mescla duas listas de subjects (objetiva e discursiva) por nome.
// Tópicos são unidos sem duplicar (chave: name).
function mergeSubjectLists(...lists) {
  const byName = new Map();
  lists.forEach(list => (list || []).forEach(s => {
    const key = (s.name || '').trim();
    if (!key) return;
    const existing = byName.get(key);
    if (!existing) {
      byName.set(key, { id: s.id || key, name: key, topics: [...(s.topics || [])] });
    } else {
      const seen = new Set(existing.topics.map(t => t.name));
      (s.topics || []).forEach(t => { if (!seen.has(t.name)) existing.topics.push(t); });
    }
  }));
  return [...byName.values()];
}

function SessionLogModal({ open, subjects, objSubjects, discSubjects, initialEntry, onSave, onEdit, onClose }) {
  const { useState: useSt, useEffect: useEff, useRef: useR } = React;

  // Lista efetiva de disciplinas: se vierem objSubjects/discSubjects, mescla; senão usa subjects (compat).
  const effectiveSubjects = (objSubjects || discSubjects)
    ? mergeSubjectLists(objSubjects, discSubjects)
    : (subjects || []);

  const todayISO = new Date().toISOString().slice(0, 10);
  const isEdit = !!initialEntry;

  const buildEmpty = () => ({
    date: todayISO,
    discipline: '',
    topic: '',
    studyType: '',
    hours: '',
    minutes: '',
    questions: '',
    correct: '',
    wrong: '',
    reviews: '',
    note: '',
  });

  // Pré-popula a partir de uma entrada existente (modo edição)
  const buildFromEntry = (e) => {
    if (!e) return buildEmpty();
    const totalMins = Math.round((e.hours || 0) * 60);
    const hh = Math.floor(totalMins / 60);
    const mm = totalMins % 60;
    return {
      date: e.date || todayISO,
      discipline: e.discipline || '',
      topic: e.topic || '',
      studyType: e.studyType || '',
      hours: hh ? String(hh) : '',
      minutes: mm ? String(mm) : '',
      questions: e.questions ? String(e.questions) : '',
      correct: e.correct ? String(e.correct) : '',
      wrong: e.wrong ? String(e.wrong) : '',
      reviews: e.reviews ? String(e.reviews) : '',
      note: e.note || '',
    };
  };

  const [form, setForm]                   = useSt(buildEmpty);
  const [customTypes, setCustomTypes]     = useSt(loadCustomStudyTypes);
  const [addingType, setAddingType]       = useSt(false);
  const [newTypeName, setNewTypeName]     = useSt('');

  // Chronometer state
  const [chronoOpen, setChronoOpen]       = useSt(false);
  const [chronoRunning, setChronoRunning] = useSt(false);
  const [chronoSecs, setChronoSecs]       = useSt(0);
  const chronoStartRef = useR(null);
  const chronoBaseRef  = useR(0);
  const chronoIdRef    = useR(null);

  useEff(() => {
    if (open) {
      setForm(buildFromEntry(initialEntry));
      setChronoOpen(false);
      setChronoRunning(false);
      setChronoSecs(0);
      setAddingType(false);
      setNewTypeName('');
      setCustomTypes(loadCustomStudyTypes());
    }
  }, [open, initialEntry]);

  // Cronômetro com wall-clock (sem drift)
  useEff(() => {
    if (chronoRunning) {
      chronoStartRef.current = Date.now();
      chronoBaseRef.current  = chronoSecs;
      chronoIdRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - chronoStartRef.current) / 1000);
        setChronoSecs(chronoBaseRef.current + elapsed);
      }, 250);
    } else if (chronoIdRef.current) {
      clearInterval(chronoIdRef.current);
      chronoIdRef.current = null;
    }
    return () => { if (chronoIdRef.current) { clearInterval(chronoIdRef.current); chronoIdRef.current = null; } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chronoRunning]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const selectedSubject = effectiveSubjects.find(s => s.name === form.discipline);
  const topicOptions = selectedSubject
    ? (selectedSubject.topics || []).map(t => t.name)
    : [];

  const allStudyTypes = [...STUDY_TYPES_DEFAULT, ...customTypes];
  const showQuestionsFields = form.studyType === 'Questões' || form.studyType === 'Simulado';

  const addCustomType = () => {
    const name = newTypeName.trim();
    if (!name) return;
    if (allStudyTypes.includes(name)) {
      set('studyType', name);
      setAddingType(false);
      setNewTypeName('');
      return;
    }
    const next = [...customTypes, name];
    setCustomTypes(next);
    saveCustomStudyTypes(next);
    set('studyType', name);
    setAddingType(false);
    setNewTypeName('');
  };

  const removeCustomType = (name) => {
    const next = customTypes.filter(t => t !== name);
    setCustomTypes(next);
    saveCustomStudyTypes(next);
    if (form.studyType === name) set('studyType', '');
  };

  const applyChrono = () => {
    const totalMins = Math.round(chronoSecs / 60);
    const hh = Math.floor(totalMins / 60);
    const mm = totalMins % 60;
    set('hours', String(hh));
    set('minutes', String(mm));
    setChronoRunning(false);
    setChronoOpen(false);
  };

  const resetChrono = () => {
    setChronoRunning(false);
    setChronoSecs(0);
    chronoBaseRef.current = 0;
  };

  const handleSave = () => {
    const totalMinutes = (parseFloat(form.hours) || 0) * 60 + (parseFloat(form.minutes) || 0);
    const hours = totalMinutes / 60;
    const log = {
      date: form.date,
      hours: Math.round(hours * 100) / 100,
      questions: parseInt(form.questions) || 0,
      correct: parseInt(form.correct) || 0,
      wrong: parseInt(form.wrong) || 0,
      reviews: parseInt(form.reviews) || 0,
      discipline: form.discipline || undefined,
      topic: form.topic || undefined,
      studyType: form.studyType || undefined,
      note: form.note.trim() || undefined,
    };
    if (isEdit && onEdit) {
      onEdit(log, initialEntry);
    } else {
      onSave(log);
    }
    onClose();
  };

  if (!open) return null;

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    padding: '9px 12px', borderRadius: 9,
    border: '1px solid rgba(42,45,58,0.13)',
    background: 'rgba(255,255,255,0.75)',
    fontSize: 13, color: 'var(--grafite)',
    fontFamily: 'inherit', outline: 'none',
  };
  const labelStyle = { fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5, display: 'block' };

  const ch = Math.floor(chronoSecs / 3600);
  const cm = Math.floor((chronoSecs % 3600) / 60);
  const cs = chronoSecs % 60;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 90,
      background: 'rgba(11,61,92,0.35)', backdropFilter: 'blur(8px)',
      display: 'grid', placeItems: 'center', padding: 16,
    }}>
      <div onClick={e => e.stopPropagation()} className="glass-strong anim-slide-up"
        style={{ width: '100%', maxWidth: 500, padding: 24, borderRadius: 18, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>

        <button onClick={onClose} className="btn-ghost" style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px' }}>✕</button>

        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', color: 'var(--ciano)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
            {isEdit ? 'EDITAR SESSÃO DE ESTUDOS' : 'REGISTRAR SESSÃO DE ESTUDOS'}
          </div>
          <div className="font-display" style={{ fontSize: 20, fontWeight: 700, marginTop: 3 }}>
            {isEdit ? 'Ajuste os detalhes' : 'O que você estudou?'}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Date */}
          <div>
            <label style={labelStyle}>Data</label>
            <input type="date" value={form.date} onChange={e => set('date', e.target.value)} style={inputStyle} />
          </div>

          {/* Discipline */}
          <div>
            <label style={labelStyle}>Disciplina</label>
            <select value={form.discipline} onChange={e => { set('discipline', e.target.value); set('topic', ''); }} style={inputStyle}>
              <option value="">— Selecione —</option>
              {effectiveSubjects.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
            </select>
          </div>

          {/* Topic */}
          {topicOptions.length > 0 && (
            <div>
              <label style={labelStyle}>Tópico</label>
              <select value={form.topic} onChange={e => set('topic', e.target.value)} style={inputStyle}>
                <option value="">— Selecione —</option>
                {topicOptions.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          )}

          {/* Study type */}
          <div>
            <label style={labelStyle}>Tipo de estudo</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {STUDY_TYPES_DEFAULT.map(t => (
                <button key={t} onClick={() => set('studyType', form.studyType === t ? '' : t)}
                  className={form.studyType === t ? 'btn-neon' : 'btn-ghost'}
                  style={{ fontSize: 12, padding: '5px 12px',
                    ...(form.studyType === t ? { background: 'var(--petroleo)', borderColor: 'transparent', color: 'white' } : {}) }}>
                  {t}
                </button>
              ))}
              {customTypes.map(t => (
                <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                  <button onClick={() => set('studyType', form.studyType === t ? '' : t)}
                    className={form.studyType === t ? 'btn-neon' : 'btn-ghost'}
                    style={{ fontSize: 12, padding: '5px 10px',
                      ...(form.studyType === t ? { background: 'var(--tinta)', borderColor: 'transparent', color: 'white' } : {}) }}>
                    {t}
                  </button>
                  <button onClick={() => removeCustomType(t)} className="btn-ghost"
                    title="Remover este tipo personalizado"
                    style={{ fontSize: 10, padding: '3px 6px', opacity: 0.6 }}>✕</button>
                </span>
              ))}
              {!addingType && (
                <button onClick={() => setAddingType(true)} className="btn-ghost"
                  style={{ fontSize: 12, padding: '5px 12px', borderStyle: 'dashed' }}>
                  + Adicionar
                </button>
              )}
            </div>
            {addingType && (
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <input
                  autoFocus
                  value={newTypeName}
                  onChange={e => setNewTypeName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') addCustomType(); if (e.key === 'Escape') { setAddingType(false); setNewTypeName(''); } }}
                  placeholder="Ex.: Resumo, Audiobook, Podcast…"
                  style={{ ...inputStyle, flex: 1 }} />
                <button onClick={addCustomType} className="btn-neon"
                  style={{ fontSize: 12, padding: '6px 14px', background: 'var(--petroleo)', borderColor: 'transparent', color: 'white' }}>
                  Adicionar
                </button>
                <button onClick={() => { setAddingType(false); setNewTypeName(''); }} className="btn-ghost" style={{ fontSize: 12, padding: '6px 10px' }}>
                  Cancelar
                </button>
              </div>
            )}
          </div>

          {/* Duration with chronometer toggle */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>Duração</label>
              <button onClick={() => setChronoOpen(o => !o)}
                className="btn-ghost"
                style={{ fontSize: 11, padding: '3px 10px',
                  ...(chronoOpen ? { background: 'rgba(0,184,212,0.1)', borderColor: 'rgba(0,184,212,0.4)', color: 'var(--ciano)' } : {}) }}>
                ⏱ Usar cronômetro
              </button>
            </div>

            {chronoOpen ? (
              <div style={{
                padding: 14, borderRadius: 12,
                background: 'rgba(0,184,212,0.06)',
                border: '1px solid rgba(0,184,212,0.2)',
                textAlign: 'center',
              }}>
                <div className="num" style={{
                  fontSize: 36, fontWeight: 700, color: 'var(--petroleo)',
                  letterSpacing: '-0.02em', marginBottom: 12,
                }}>
                  {String(ch).padStart(2,'0')}<span style={{ color: 'var(--text-dim)' }}>:</span>
                  {String(cm).padStart(2,'0')}<span style={{ color: 'var(--text-dim)' }}>:</span>
                  {String(cs).padStart(2,'0')}
                </div>
                <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={() => setChronoRunning(r => !r)}
                    className="btn-neon"
                    style={{ fontSize: 12, padding: '6px 16px',
                      background: chronoRunning ? 'var(--coral)' : 'linear-gradient(135deg, var(--petroleo), var(--ciano))',
                      borderColor: 'transparent', color: 'white' }}>
                    {chronoRunning ? '⏸ Pausar' : '▶ Iniciar'}
                  </button>
                  <button onClick={resetChrono} className="btn-ghost" style={{ fontSize: 12, padding: '6px 14px' }}>
                    ⟲ Zerar
                  </button>
                  <button onClick={applyChrono} className="btn-ghost"
                    style={{ fontSize: 12, padding: '6px 14px',
                      background: 'rgba(0,168,107,0.1)', borderColor: 'rgba(0,168,107,0.4)', color: 'var(--esmeralda)' }}
                    disabled={chronoSecs === 0}>
                    ✓ Aplicar
                  </button>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 10 }}>
                  Cronometre o estudo e clique em "Aplicar" para preencher a duração.
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <input type="number" min={0} max={12} placeholder="0 horas" value={form.hours}
                    onChange={e => set('hours', e.target.value)} style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <input type="number" min={0} max={59} placeholder="0 min" value={form.minutes}
                    onChange={e => set('minutes', e.target.value)} style={inputStyle} />
                </div>
              </div>
            )}
          </div>

          {/* Questions (only if studyType = Questões or Simulado) */}
          {showQuestionsFields && (
            <div>
              <label style={labelStyle}>Questões</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-dim)', marginBottom: 3 }}>Total</div>
                  <input type="number" min={0} placeholder="0" value={form.questions}
                    onChange={e => set('questions', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--esmeralda)', marginBottom: 3, fontWeight: 600 }}>✓ Acertos</div>
                  <input type="number" min={0} placeholder="0" value={form.correct}
                    onChange={e => set('correct', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--coral)', marginBottom: 3, fontWeight: 600 }}>✗ Erros</div>
                  <input type="number" min={0} placeholder="0" value={form.wrong}
                    onChange={e => set('wrong', e.target.value)} style={inputStyle} />
                </div>
              </div>
            </div>
          )}

          {/* Reviews / Flashcards */}
          {!showQuestionsFields && (
            <div>
              <label style={labelStyle}>Revisões / Flashcards</label>
              <input type="number" min={0} placeholder="0" value={form.reviews}
                onChange={e => set('reviews', e.target.value)} style={inputStyle} />
            </div>
          )}

          {/* Note */}
          <div>
            <label style={labelStyle}>Observação (opcional)</label>
            <textarea placeholder="O que foi estudado, dificuldades, pontos de destaque…"
              value={form.note} onChange={e => set('note', e.target.value)}
              rows={2}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} />
          </div>
        </div>

        <button onClick={handleSave} className="btn-neon" style={{
          width: '100%', justifyContent: 'center', marginTop: 20,
          padding: '12px', fontSize: 14,
          background: 'linear-gradient(135deg, var(--petroleo), var(--ciano))',
          borderColor: 'transparent', color: 'white',
        }}>
          {isEdit ? 'Salvar alterações' : 'Salvar sessão'}
        </button>
      </div>
    </div>
  );
}

window.SessionLogModal = SessionLogModal;
