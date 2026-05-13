import React from 'react';
import { STRINGS, FLAGS } from '../components/Shared.jsx';
import { PRODUCTS, BODY_MEASURES } from '../data.js';
import logoYellowImg from '../assets/logo_yellow.png';
import donpenImg from '../assets/donpen.png';

function FakeQR({ size = 96, seed = 42 }) {
  const N = 21;
  const cells = [];
  let s = seed;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      const on = ((s >> 8) & 1) === 1;
      const isFinder =
        (x < 7 && y < 7) || (x >= N - 7 && y < 7) || (x < 7 && y >= N - 7);
      let cell = on;
      if (isFinder) {
        const fx = x < 7 ? x : x - (N - 7);
        const fy = y < 7 ? y : y - (N - 7);
        const ring = fx === 0 || fx === 6 || fy === 0 || fy === 6;
        const core = fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4;
        cell = ring || core;
      }
      if (cell) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#000" />);
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${N} ${N}`} style={{ background: '#fff', borderRadius: 4 }}>
      {cells}
    </svg>
  );
}

// ─── LP top header (replaces signage chrome) ───
function LPHeader({ lang, setLang, t }) {
  const [open, setOpen] = React.useState(false);
  const cur = FLAGS.find(f => f.code === lang) || FLAGS[0];
  return (
    <div className="lp-header" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img src={logoYellowImg} alt="DON・QUIJOTE" style={{ height: 28, objectFit: 'contain' }} />
        <div style={{ lineHeight: 1.1 }}>
          <div style={{ fontWeight: 700, fontSize: 9.5, color: 'var(--donki-yellow)', letterSpacing: '0.12em', marginTop: 2 }}>
            T-SHIRT SIZE FINDER
          </div>
        </div>
      </div>
      <button className="lang-chip" onClick={() => setOpen(o => !o)}>
        <span style={{ fontSize: 14 }}>{cur.emoji}</span>
        <span>{cur.label}</span>
        <span style={{ fontSize: 9 }}>▼</span>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', right: 8, zIndex: 50,
          background: '#fff', border: '2.5px solid var(--donki-black)',
          borderRadius: 12, padding: 6, boxShadow: '0 6px 0 var(--donki-black)',
          display: 'flex', flexDirection: 'column', gap: 2, minWidth: 140,
        }}>
          {FLAGS.map(f => (
            <button key={f.code} onClick={() => { setLang(f.code); setOpen(false); }}
              style={{
                background: f.code === lang ? 'var(--donki-yellow)' : 'transparent',
                border: 'none', textAlign: 'left',
                padding: '6px 10px', borderRadius: 8, cursor: 'pointer',
                fontFamily: 'var(--font-brand)', fontWeight: 900, fontSize: 13,
                display: 'flex', alignItems: 'center', gap: 8, color: 'var(--donki-black)',
              }}>
              <span style={{ fontSize: 16 }}>{f.emoji}</span>
              {f.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Count-up number ───
function CountUp({ to, duration = 900, format = (n) => Math.round(n), keyTrigger }) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, keyTrigger]);
  return <>{format(val)}</>;
}

// ─── Body silhouette with pins ───
function BodySilhouette({ active, measures, lang }) {
  // simplified human silhouette as SVG
  return (
    <div className="silhouette">
      <svg viewBox="0 0 140 220">
        {/* head */}
        <circle cx="70" cy="22" r="13" fill="none" stroke="var(--donki-black)" strokeWidth="2.5"/>
        {/* shoulders/torso */}
        <path d="M 40 50 Q 70 38 100 50 L 105 95 Q 95 110 90 145 L 88 200 L 78 200 L 75 145 L 65 145 L 62 200 L 52 200 L 50 145 Q 45 110 35 95 Z"
          fill="var(--donki-cream)" stroke="var(--donki-black)" strokeWidth="2.5" strokeLinejoin="round"/>
        {/* arms */}
        <path d="M 38 55 L 22 100 L 28 145 L 34 145 L 32 100 L 44 60 Z"
          fill="var(--donki-cream)" stroke="var(--donki-black)" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M 102 55 L 118 100 L 112 145 L 106 145 L 108 100 L 96 60 Z"
          fill="var(--donki-cream)" stroke="var(--donki-black)" strokeWidth="2.5" strokeLinejoin="round"/>
        {/* highlight measurement lines */}
        {active === 'shoulder' && <line x1="40" y1="50" x2="100" y2="50" stroke="var(--donki-red)" strokeWidth="3" strokeDasharray="4 3"/>}
        {active === 'chest'    && <ellipse cx="70" cy="72" rx="38" ry="6" fill="none" stroke="var(--donki-red)" strokeWidth="3" strokeDasharray="4 3"/>}
        {active === 'waist'    && <ellipse cx="70" cy="100" rx="32" ry="5" fill="none" stroke="var(--donki-red)" strokeWidth="3" strokeDasharray="4 3"/>}
        {active === 'neck'     && <ellipse cx="70" cy="40" rx="12" ry="3.5" fill="none" stroke="var(--donki-red)" strokeWidth="3" strokeDasharray="4 3"/>}
        {active === 'arm'      && <line x1="100" y1="50" x2="118" y2="135" stroke="var(--donki-red)" strokeWidth="3" strokeDasharray="4 3"/>}
        {active === 'length'   && <line x1="40" y1="50" x2="50" y2="200" stroke="var(--donki-red)" strokeWidth="3" strokeDasharray="4 3"/>}
      </svg>
      {/* Pins */}
      {measures.map((m, i) => (
        <div key={m.key} className="pin" style={{
          top: m.anatomyY + '%',
          left: i % 2 === 0 ? '-8px' : 'calc(100% - 24px)',
          transform: i % 2 === 0 ? 'translateX(-100%)' : 'translateX(100%)',
          opacity: !active || active === m.key ? 1 : 0.35,
          transition: 'opacity .2s',
        }}>
          {m[lang] || m.jp} {m.value}{m.unit}
        </div>
      ))}
    </div>
  );
}

// ─── Confetti dots scattered around the size badge ───
function ConfettiDots() {
  const dots = [
    { left: '10%', top: '20%', size: 10, color: 'var(--donki-yellow)' },
    { left: '88%', top: '10%', size: 8,  color: 'var(--donki-red)' },
    { left: '5%',  top: '70%', size: 6,  color: 'var(--donki-red)' },
    { left: '92%', top: '60%', size: 12, color: 'var(--donki-yellow)' },
    { left: '18%', top: '90%', size: 7,  color: 'var(--donki-black)' },
    { left: '78%', top: '88%', size: 9,  color: 'var(--donki-yellow)' },
    { left: '50%', top: '4%',  size: 6,  color: 'var(--donki-red)' },
  ];
  return (
    <>
      {dots.map((d, i) => (
        <span key={i} className="confetti-dot" style={{
          left: d.left, top: d.top, width: d.size, height: d.size,
          background: d.color, opacity: 0.85,
        }} />
      ))}
    </>
  );
}

Object.assign(window, { FakeQR, LPHeader, CountUp, BodySilhouette, ConfettiDots });


/* === result === */
// result.jsx — the LP body: hero result → tabs → products / body → CTA → bottom sheet

// ─── Hero size result card ───
function ResultHero({ t, lang, recommendedSize = 'L', confidence = 96, profile, animKey }) {
  return (
    <div style={{
      position: 'relative',
      margin: '12px 12px 0',
      background: 'var(--donki-yellow)',
      border: '2.5px solid var(--donki-black)',
      borderRadius: 18,
      padding: '14px 16px 18px',
      boxShadow: '0 5px 0 var(--donki-black)',
      overflow: 'hidden',
    }}>
      <div className="focus-lines" style={{ opacity: .55 }} />
      <ConfettiDots />

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span className="pop-slash"><span>{t.pop}</span></span>
        <span style={{ fontWeight: 900, fontSize: 11, color: 'var(--donki-black)', letterSpacing: '0.08em' }}>
          ⚡ STEP 3 / 3 · DONE
        </span>
      </div>

      <div style={{
        position: 'relative',
        marginTop: 12,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 900, fontSize: 13, color: 'var(--donki-black)', letterSpacing: '0.04em' }}>
            {t.sizeIs}
          </div>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2,
            fontWeight: 900, fontFamily: 'var(--font-brand)',
            color: 'var(--donki-black)', lineHeight: 0.92,
          }}>
            <span style={{ fontSize: 80, color: 'var(--donki-red)', textShadow: '3px 3px 0 var(--donki-black)' }}>
              {recommendedSize}
            </span>
            <span style={{ fontSize: 22 }}>{t.size}</span>
          </div>
          <div style={{ marginTop: 6, fontWeight: 700, fontSize: 11, color: 'var(--donki-ink-2)', lineHeight: 1.35 }}>
            {t.sizeDetail}
          </div>
        </div>

        {/* Confidence dial */}
        <div style={{
          flex: '0 0 auto',
          width: 76, height: 76, position: 'relative',
        }}>
          <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle cx="18" cy="18" r="15.5" fill="#fff" stroke="var(--donki-black)" strokeWidth="2.5"/>
            <circle cx="18" cy="18" r="15.5" fill="none"
              stroke="var(--donki-red)" strokeWidth="3.5" strokeLinecap="round"
              strokeDasharray={`${(confidence / 100) * 97} 97`}
              style={{ transition: 'stroke-dasharray 1s ease' }}/>
          </svg>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, lineHeight: 1,
          }}>
            <div style={{ fontSize: 22, color: 'var(--donki-black)' }}>
              <CountUp to={confidence} keyTrigger={animKey} />%
            </div>
            <div style={{ fontSize: 8, color: 'var(--donki-ink-3)', marginTop: 2 }}>{t.accuracy}</div>
          </div>
        </div>
      </div>

      {/* Profile summary chips */}
      <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
        <span className="tag-chip">{profile.gender === 'men' ? '♂ MEN' : '♀ WOMEN'}</span>
        <span className="tag-chip" style={{ background: '#fff', color: 'var(--donki-black)', border: '1.5px solid var(--donki-black)' }}>
          {profile.age}{t.age}
        </span>
        <span className="tag-chip" style={{ background: '#fff', color: 'var(--donki-black)', border: '1.5px solid var(--donki-black)' }}>
          {profile.height}{t.height}
        </span>
        <span className="tag-chip" style={{ background: '#fff', color: 'var(--donki-black)', border: '1.5px solid var(--donki-black)' }}>
          {profile.weight}{t.weight}
        </span>
      </div>
    </div>
  );
}

// ─── Body measurements ───
function BodyTab({ t, lang, animKey }) {
  return (
    <div style={{ padding: '16px 12px 8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span className="pop-slash yellow"><span>BODY</span></span>
        <div>
          <div style={{ fontWeight: 900, fontSize: 16, lineHeight: 1.1 }}>{t.bodyTitle}</div>
          <div style={{ fontSize: 10.5, color: 'var(--donki-ink-3)', fontWeight: 700, marginTop: 2 }}>{t.bodyLead}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {BODY_MEASURES.map((m, i) => (
          <div key={m.key}
            style={{
              background: '#fff',
              border: '2.5px solid var(--donki-black)',
              borderRadius: 12,
              padding: '10px 12px',
              boxShadow: '0 3px 0 var(--donki-black)',
              textAlign: 'left',
              fontFamily: 'var(--font-brand)',
            }}>
            <div style={{ fontSize: 10.5, color: 'var(--donki-ink-3)', fontWeight: 700, marginBottom: 2 }}>
              {m[lang] || m.jp}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
              <span style={{ fontWeight: 900, fontSize: 24, color: 'var(--donki-red)' }}>
                <CountUp to={m.value} duration={800 + i * 60} keyTrigger={animKey}
                  format={(n) => n.toFixed(1)} />
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--donki-ink-3)' }}>{m.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 10,
        background: 'var(--donki-surface)',
        borderLeft: '5px solid var(--donki-yellow)',
        padding: '8px 10px',
        borderRadius: 6,
        fontSize: 10, color: 'var(--donki-ink-2)', lineHeight: 1.4, fontWeight: 700,
      }}>
        🔒 {t.notice}
      </div>
    </div>
  );
}

// ─── Product card variants ───
function ProductCard({ p, onClick, lang, t, layout }) {
  const cardSize = layout === 'list' ? 'list' : layout === 'hero' ? 'hero' : 'grid';
  const isList = cardSize === 'list';

  return (
    <div className="tee-card" onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: isList ? 'row' : 'column',
        alignItems: isList ? 'center' : 'stretch',
        gap: isList ? 12 : 0,
        padding: isList ? 8 : 0,
        textAlign: 'left',
      }}>
      <div style={{
        position: 'relative',
        width: isList ? 88 : '100%',
        flex: isList ? '0 0 auto' : undefined,
        aspectRatio: '1 / 1',
        background: '#fff',
        borderRadius: isList ? 8 : 0,
        overflow: 'hidden',
        borderBottom: isList ? 'none' : '2px solid var(--donki-black)',
        border: isList ? '2px solid var(--donki-black)' : undefined,
      }}>
        <img src={`assets/tees/${p.slug}-front-a.png`} alt={p.name} />
        <span style={{
          position: 'absolute', top: 5, left: 5,
        }} className="tag-chip red">{p.tag}</span>

        <span style={{
          position: 'absolute', bottom: 5, right: 5,
          background: 'var(--donki-black)', color: 'var(--donki-yellow)',
          fontWeight: 900, fontSize: 10, padding: '2px 7px', borderRadius: 4,
        }}>{p.size}サイズ</span>
      </div>

      <div style={{ padding: isList ? '0' : '8px 10px 10px', flex: 1, minWidth: 0 }}>
        <div style={{
          fontWeight: 900, fontSize: isList ? 13 : 12, lineHeight: 1.15,
          minHeight: isList ? 'auto' : 32,
          textOverflow: 'ellipsis', overflow: 'hidden',
        }}>
          {p.name}
        </div>
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4,
          justifyContent: isList ? 'space-between' : 'flex-start',
        }}>
          <div>
            <span style={{ fontWeight: 900, fontSize: isList ? 18 : 16, color: 'var(--donki-red)' }}>
              ¥{p.price.toLocaleString()}
            </span>
            <span style={{ fontSize: 9, color: 'var(--donki-ink-3)', marginLeft: 3 }}>{t.price}</span>
          </div>
          <div style={{ display: 'flex', gap: 3 }}>
            {p.colors.map((c, i) => (
              <span key={i} style={{
                width: 12, height: 12, borderRadius: '50%',
                background: c.hex, border: '1.5px solid var(--donki-black)',
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Product list / grid section ───
function ProductsTab({ t, lang, layout, onPick }) {
  const list = PRODUCTS;
  return (
    <div style={{ padding: '12px 12px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span className="pop-slash"><span>PICKED FOR YOU</span></span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, fontSize: 15, lineHeight: 1.1 }}>{t.recommended}</div>
          <div style={{ fontSize: 10, color: 'var(--donki-ink-3)', fontWeight: 700, marginTop: 1 }}>
            {t.recommendedSub} · {list.length}{t.items}
          </div>
        </div>
      </div>

      {layout === 'scroll' ? (
        <div className="no-scrollbar" style={{
          display: 'flex', gap: 10, overflowX: 'auto', scrollSnapType: 'x mandatory',
          margin: '0 -12px', padding: '4px 12px 14px',
        }}>
          {list.map(p => (
            <div key={p.id} style={{ flex: '0 0 160px', scrollSnapAlign: 'start' }}>
              <ProductCard p={p} onClick={() => onPick(p)}
                lang={lang} t={t} layout="grid" />
            </div>
          ))}
        </div>
      ) : layout === 'list' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {list.map(p => (
            <ProductCard key={p.id} p={p} onClick={() => onPick(p)}
              lang={lang} t={t} layout="list" />
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {list.map(p => (
            <ProductCard key={p.id} p={p} onClick={() => onPick(p)}
              lang={lang} t={t} layout="grid" />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── QR / save card ───
function SaveQrCard({ t }) {
  return (
    <div style={{
      margin: '14px 12px 0',
      background: 'var(--donki-black)',
      color: '#fff',
      border: '2.5px solid var(--donki-black)',
      borderRadius: 16,
      padding: 12,
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{ background: '#fff', padding: 5, borderRadius: 6, display: 'grid', placeItems: 'center' }}>
        <FakeQR size={70} seed={42} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 900, fontSize: 13, lineHeight: 1.2 }}>{t.saveQrTitle}</div>
        <div style={{ fontSize: 10, opacity: 0.85, fontWeight: 700, marginTop: 4, lineHeight: 1.3 }}>
          {t.saveQrSub}
        </div>
        <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
          <span style={{ background: 'var(--donki-yellow)', color: 'var(--donki-black)', fontWeight: 900, fontSize: 9, padding: '2px 6px', borderRadius: 4 }}>ID #87432</span>
          <span style={{ background: 'rgba(255,255,255,0.15)', fontWeight: 700, fontSize: 9, padding: '2px 6px', borderRadius: 4 }}>{t.measuredAt} 2026.05.13</span>
        </div>
      </div>
    </div>
  );
}

// ─── Product bottom sheet ───
function ProductSheet({ p, t, lang, onClose }) {
  const [colorIdx, setColorIdx] = React.useState(0);
  const [side, setSide] = React.useState('a'); // 'a' = front-ish, 'b' = back-ish

  if (!p) return null;
  const cur = p.colors[colorIdx];

  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} />
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        {/* Drag handle */}
        <div style={{ padding: '8px 0 0', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 44, height: 4, borderRadius: 4, background: 'rgba(0,0,0,0.2)' }} />
        </div>

        <div style={{ padding: '8px 14px 18px' }}>
          {/* Top row — close */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <button onClick={onClose} style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '2.5px solid var(--donki-black)', background: '#fff',
              fontWeight: 900, fontSize: 16, cursor: 'pointer',
              boxShadow: '0 3px 0 var(--donki-black)',
            }}>✕</button>
          </div>

          {/* Title */}
          <div style={{ marginTop: 4, fontWeight: 900, fontSize: 20, lineHeight: 1.15 }}>
            {p.name}
          </div>
          <div style={{
            display: 'inline-block',
            marginTop: 6,
            background: 'var(--donki-black)', color: 'var(--donki-yellow)',
            padding: '4px 12px', borderRadius: 6,
            fontWeight: 900, fontSize: 13, letterSpacing: '0.04em',
          }}>
            {t.productSize}<span style={{ marginLeft: 4 }}>{p.size}サイズ</span>
          </div>

          {/* Image with front/back toggle */}
          <div style={{
            marginTop: 12,
            position: 'relative',
            background: '#fff',
            border: '2.5px solid var(--donki-black)',
            borderRadius: 14,
            overflow: 'hidden',
            aspectRatio: '1 / 1',
            boxShadow: '0 5px 0 var(--donki-black)',
          }}>
            <img src={`assets/tees/${p.slug}-front-${side}.png`}
              style={{ width: '100%', height: '100%', objectFit: 'cover',
                       transition: 'transform .25s' }} />
            {/* Side toggle */}
            <div style={{
              position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
              background: 'var(--donki-black)',
              border: '2px solid #fff',
              borderRadius: 9999, padding: 3,
              display: 'flex',
            }}>
              {[{ k: 'a', l: t.front }, { k: 'b', l: t.back }].map(s => (
                <button key={s.k} onClick={() => setSide(s.k)} style={{
                  background: side === s.k ? 'var(--donki-yellow)' : 'transparent',
                  color: side === s.k ? 'var(--donki-black)' : '#fff',
                  border: 'none', padding: '4px 14px', borderRadius: 9999,
                  fontWeight: 900, fontSize: 10, cursor: 'pointer',
                  fontFamily: 'var(--font-brand)',
                  letterSpacing: '0.08em',
                }}>{s.l}</button>
              ))}
            </div>
          </div>

          {/* Color picker */}
          <div style={{ marginTop: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ fontWeight: 900, fontSize: 11, color: 'var(--donki-ink-3)', letterSpacing: '0.06em' }}>
                {t.selectColor}
              </div>
              <div style={{ fontWeight: 900, fontSize: 11, color: 'var(--donki-black)' }}>
                {cur.name} <span style={{ color: 'var(--donki-ink-3)', marginLeft: 4 }}>{colorIdx + 1} / {p.colors.length}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {p.colors.map((c, i) => (
                <button key={i} onClick={() => setColorIdx(i)}
                  className={`swatch ${i === colorIdx ? 'active' : ''}`}
                  style={{ background: c.hex }} aria-label={c.name} />
              ))}
            </div>
          </div>

          {/* Price + meta */}
          <div style={{
            marginTop: 14, paddingTop: 12,
            borderTop: '2.5px solid var(--donki-black)',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontWeight: 900, fontSize: 32, color: 'var(--donki-red)', lineHeight: 1 }}>
                ¥{p.price.toLocaleString()}
              </span>
              <span style={{ fontSize: 11, color: 'var(--donki-ink-3)', fontWeight: 700 }}>({t.price})</span>
              <span style={{ marginLeft: 'auto', fontWeight: 900, fontSize: 10, color: 'var(--donki-ink-3)' }}>{p.tag}</span>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, lineHeight: 1.5, color: 'var(--donki-ink-2)' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ fontWeight: 900, color: 'var(--donki-ink-3)', minWidth: 56 }}>{t.material}</span>
                <span style={{ fontWeight: 900, color: 'var(--donki-black)' }}>{p.mat}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <span style={{ fontWeight: 900, color: 'var(--donki-ink-3)', minWidth: 56 }}>{t.sizes}</span>
                <span style={{ fontWeight: 900, color: 'var(--donki-black)' }}>XS / S / M / <u>L</u> / XL / XXL</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

Object.assign(window, {
  ResultHero, BodyTab, ProductsTab, SaveQrCard, ProductSheet, ProductCard,
});


/* === app === */
// app.jsx — main LP wrapper, tweaks, iPhone frame

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "intensity": "standard",
  "font": "noto",
  "lang": "jp",
  "structure": "scroll",
  "productLayout": "grid",
  "showFrame": true
}/*EDITMODE-END*/;

function ScopeBadge() {
  return (
    <div style={{
      position: 'fixed', top: 12, left: 12, zIndex: 10,
      background: 'var(--donki-black)', color: 'var(--donki-yellow)',
      padding: '6px 12px', borderRadius: 8,
      fontWeight: 900, fontSize: 11, letterSpacing: '0.08em',
      boxShadow: '0 3px 0 rgba(0,0,0,0.3)',
      fontFamily: 'var(--font-brand)',
    }}>
      DONKI MOBILE LP · 結果スクリーン
    </div>
  );
}

function LPBody({ t, lang, setLang, tw, picked, setPicked, animKey, profile }) {
  const [tab, setTab] = React.useState('product'); // for tabbed mode

  return (
    <div style={{
      background: '#fff',
      minHeight: '100%',
      paddingBottom: 8,
    }}>
      <LPHeader lang={lang} setLang={setLang} t={t} />

      {/* Marquee band */}
      <div className="marquee-band">
        <div className="track">T-SHIRT SIZE FINDER · 採寸結果</div>
      </div>

      <ResultHero t={t} lang={lang} recommendedSize={profile.size} profile={profile} animKey={animKey} />

      {/* Section structure: tabs or scroll */}
      {tw.structure === 'tabs' ? (
        <>
          <div style={{ padding: '14px 12px 0' }}>
            <div className="tab-strip">
              <button className={tab === 'product' ? 'active' : ''} onClick={() => setTab('product')}>
                🛍 {t.tabProduct}
              </button>
              <button className={tab === 'body' ? 'active' : ''} onClick={() => setTab('body')}>
                📏 {t.tabBody}
              </button>
            </div>
          </div>
          {tab === 'product' ? (
            <ProductsTab t={t} lang={lang} layout={tw.productLayout} onPick={setPicked} />
          ) : (
            <BodyTab t={t} lang={lang} animKey={animKey} />
          )}
        </>
      ) : (
        <>
          <BodyTab t={t} lang={lang} animKey={animKey} />
          <div style={{ height: 1, background: 'var(--donki-black)', margin: '4px 12px', opacity: 0.15 }} />
          <ProductsTab t={t} lang={lang} layout={tw.productLayout} onPick={setPicked} />
        </>
      )}

      {/* Footer marquee */}
      <div className="marquee-band" style={{ marginTop: 8 }}>
        <div className="track">T-SHIRT SIZE FINDER · DON・QUIJOTE</div>
      </div>

      {/* Disclaimer */}
      <div style={{
        padding: '10px 14px 16px',
        fontSize: 9, color: 'var(--donki-ink-3)', lineHeight: 1.5, textAlign: 'center',
      }}>
        ※ 推定サイズは目安です。実際の着用感は素材・ブランドによって異なる場合があります。<br/>
        © Don Quijote · Demo prototype
      </div>

      {/* Bottom sheet */}
      {picked && (
        <ProductSheet p={picked} t={t} lang={lang}
          onClose={() => setPicked(null)} />
      )}
    </div>
  );
}

export default function LPApp() {
  const [lang, setLang] = React.useState('jp');
  const [picked, setPicked] = React.useState(null);
  const [animKey, setAnimKey] = React.useState(0);

  const [params, setParams] = React.useState({
    size: 'L',
    gender: 'men',
    age: '20代',
    height: '170',
    weight: '65'
  });

  React.useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    if (search.has('size')) {
      setParams({
        size: search.get('size') || 'L',
        gender: search.get('gender') || 'men',
        age: search.get('age') || '20代',
        height: search.get('height') || '170',
        weight: search.get('weight') || '65',
      });
    }
    if (search.has('lang')) {
      setLang(search.get('lang'));
    }
  }, []);

  const tw = { structure: 'tabs', productLayout: 'grid' };
  const t = STRINGS[lang] || STRINGS.jp;

  return (
    <div className="donki-mob pop-font" data-intensity="standard" style={{
      width: '100%', minHeight: '100vh',
      background: '#fff',
    }}>
      <LPBody t={t} lang={lang} setLang={setLang} tw={tw}
        picked={picked} setPicked={setPicked}
        animKey={animKey} profile={params} />
    </div>
  );
}
