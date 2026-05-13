import React from 'react';
import { STRINGS, SignageChrome, Stage, NavFooter } from '../components/Shared.jsx';

export default function InfoScreen({ lang, setLang, onBack, onNext, info, setInfo }) {
  const t = STRINGS[lang] || STRINGS.jp;
  const set = (k, v) => setInfo({ ...info, [k]: v });
  const valid = info.gender && info.age && info.height;

  return (
    <Stage>
      <SignageChrome lang={lang} setLang={setLang} step={2} totalSteps={3} />

      <div style={{ position: 'absolute', top: 220, left: 60, right: 60 }}>
        <div style={{ fontWeight: 900, fontSize: 64 }}>情報を入力 / Your Info</div>
        <div style={{ fontWeight: 700, fontSize: 22, color: 'var(--donki-ink-3)', marginTop: 6 }}>
          正確な診断のため、あなたの情報を教えてください
        </div>
      </div>

      <div style={{ position: 'absolute', top: 380, left: 60, right: 60 }}>
        <div style={{ fontWeight: 900, fontSize: 30, marginBottom: 14 }}>{t.gender}</div>
        <div style={{ display: 'flex', gap: 20 }}>
          {[
            { k: 'men', l: t.men, icon: '♂' },
            { k: 'women', l: t.women, icon: '♀' },
          ].map(o => {
            const active = info.gender === o.k;
            return (
              <button key={o.k} onClick={() => set('gender', o.k)} style={{
                flex: 1, padding: '22px 24px', cursor: 'pointer',
                background: active ? 'var(--donki-yellow)' : 'var(--donki-white)',
                border: active ? '5px solid var(--donki-red)' : '3px solid var(--donki-black)',
                borderRadius: 24, fontWeight: 900, fontSize: 34,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
                boxShadow: '0 5px 0 var(--donki-black)',
              }}>
                <span style={{ fontSize: 52, lineHeight: 1 }}>{o.icon}</span>
                {o.l}
              </button>
            );
          })}
        </div>
      </div>

      {[
        { key: 'age',    label: t.age,    min: 6,   max: 90,  unit: ''   , top: 580, step: 1 },
        { key: 'height', label: t.height, min: 130, max: 210, unit: 'cm' , top: 780, step: 1 },
      ].map(f => {
        const opts = [];
        for (let v = f.min; v <= f.max; v += f.step) opts.push(v);
        return (
          <div key={f.key} style={{ position: 'absolute', top: f.top, left: 60, right: 60 }}>
            <div style={{ fontWeight: 900, fontSize: 30, marginBottom: 10 }}>{f.label}</div>
            <div style={{ position: 'relative' }}>
              <select
                value={info[f.key] || ''}
                onChange={e => set(f.key, Number(e.target.value))}
                style={{
                  width: '100%', height: 112, borderRadius: 22,
                  background: 'var(--donki-white)', border: '3px solid var(--donki-black)',
                  fontFamily: 'var(--font-brand)', fontWeight: 900, fontSize: 52,
                  padding: '0 80px 0 32px', cursor: 'pointer',
                  appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none',
                  boxShadow: '0 4px 0 var(--donki-black)',
                  color: info[f.key] ? 'var(--donki-black)' : 'var(--donki-ink-3)',
                }}
              >
                <option value="" disabled>— 選択 / Select —</option>
                {opts.map(v => (
                  <option key={v} value={v}>{v}{f.unit ? ' ' + f.unit : ''}</option>
                ))}
              </select>
              <div style={{
                position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
                width: 64, height: 64, borderRadius: '50%',
                background: 'var(--donki-yellow)', border: '3px solid var(--donki-black)',
                display: 'grid', placeItems: 'center',
                fontSize: 28, fontWeight: 900, pointerEvents: 'none',
              }}>▼</div>
            </div>
          </div>
        );
      })}

      <div style={{
        position: 'absolute', top: 1200, left: 60, right: 60,
        background: 'var(--donki-surface)', padding: '18px 24px', borderRadius: 18,
        fontWeight: 700, fontSize: 20, color: 'var(--donki-ink-2)',
        borderLeft: '8px solid var(--donki-yellow)',
      }}>
        🔒 入力情報は診断のみに利用し、個人を特定できる形で保存しません。
      </div>

      <NavFooter
        left={<button className="nav-btn ghost" onClick={onBack}>◀ {t.back}</button>}
        right={<button className="nav-btn primary" disabled={!valid} onClick={onNext}>{t.next} ▶</button>}
        center="STEP 2 / 3"
      />
    </Stage>
  );
}
