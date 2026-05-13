import React, { useState, useEffect } from 'react';
import { STRINGS, FakeQR, SignageChrome, Stage, NavFooter } from '../components/Shared.jsx';

const BODY_MEASURES = [
  { label: '肩幅 / Shoulder', value: '45.2', unit: 'cm' },
  { label: 'バスト / Chest',  value: '96.8', unit: 'cm' },
  { label: 'ウェスト / Waist', value: '82.4', unit: 'cm' },
  { label: '首周り / Neck',    value: '38.1', unit: 'cm' },
  { label: '腕の長さ / Arm',   value: '58.9', unit: 'cm' },
  { label: '着丈目安 / Length', value: '71.0', unit: 'cm' },
];

const PRODUCTS = [
  { id: 1, slug: 'manekineko', name: 'MANEKINEKO 招き猫 T', colors: ['生成', 'ブラック'],   size: 'L', price: 2480, mat: '綿 100%', tag: 'UNISEX' },
  { id: 2, slug: 'japan',      name: 'JAPAN 富士山 T',       colors: ['生成', 'ブラック'],   size: 'L', price: 2480, mat: '綿 100%', tag: 'UNISEX' },
  { id: 3, slug: 'matcha',     name: 'MATCHA 抹茶 T',        colors: ['生成', 'グリーン'],   size: 'L', price: 2480, mat: '綿 100%', tag: 'UNISEX' },
  { id: 4, slug: 'matsuri',    name: 'MATSURI 祭 T',         colors: ['ブラック', 'ワイン'], size: 'L', price: 2480, mat: '綿 100%', tag: 'UNISEX' },
  { id: 5, slug: 'sakura',     name: 'SAKURA 花見日和 T',     colors: ['生成', 'ピンク'],     size: 'L', price: 2480, mat: '綿 100%', tag: 'UNISEX' },
  { id: 6, slug: 'sumo',       name: 'SUMO 幕内 T',          colors: ['生成', 'ブルー'],     size: 'L', price: 2480, mat: '綿 100%', tag: 'UNISEX' },
  { id: 7, slug: 'bonsai',     name: 'BONSAI 盆栽 JAPAN T',  colors: ['生成', 'ブラック'],   size: 'L', price: 2480, mat: '綿 100%', tag: 'UNISEX' },
  { id: 8, slug: 'gyoza',      name: 'GYOZA 餃子 T',         colors: ['生成', 'ネイビー'],   size: 'L', price: 2480, mat: '綿 100%', tag: 'UNISEX' },
];

export function ProductModal({ lang, product, onClose }) {
  const t = STRINGS[lang] || STRINGS.jp;
  const [colorIdx, setColorIdx] = useState(0);
  useEffect(() => { setColorIdx(0); }, [product && product.id]);
  if (!product) return null;

  const colors = product.colors || [];
  const variantKey = colorIdx === 0 ? 'a' : 'b';
  const currentColor = colors[colorIdx] || colors[0];
  const total = colors.length;
  const prev = () => setColorIdx((colorIdx - 1 + total) % total);
  const next = () => setColorIdx((colorIdx + 1) % total);

  // Fallback if window.__resources is not defined (for vite static assets)
  const getImageUrl = (slug, variant) => {
    if (window.__resources) return window.__resources[`tee_${slug}_${variant}`];
    return `assets/tees/${slug}-front-${variant}.png`;
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
      zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 40,
    }} onClick={onClose}>
      <div style={{
        width: 940,
        background: 'var(--donki-white)', borderRadius: 28,
        border: '6px solid var(--donki-black)', padding: 28, position: 'relative',
        boxShadow: '0 16px 0 rgba(0,0,0,0.8)',
        display: 'flex', flexDirection: 'column', gap: 12,
      }} onClick={e => e.stopPropagation()}>

        <button onClick={onClose} aria-label="close" style={{
          position: 'absolute', top: 14, right: 14, width: 52, height: 52,
          borderRadius: '50%', border: '3px solid var(--donki-black)',
          background: 'var(--donki-white)', color: 'var(--donki-black)',
          fontSize: 26, fontWeight: 900, cursor: 'pointer',
          boxShadow: '0 4px 0 var(--donki-black)', zIndex: 5,
          display: 'grid', placeItems: 'center',
        }}>✕</button>

        <div style={{ paddingRight: 70 }}>
          <div className="pop-slash" style={{ fontSize: 16, marginBottom: 4 }}>
            <span>推奨サイズ・RECOMMENDED・推荐</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ fontWeight: 900, fontSize: 28, lineHeight: 1.1 }}>{product.name}</div>
            <div style={{
              background: 'var(--donki-black)', color: 'var(--donki-yellow)',
              padding: '5px 14px', borderRadius: 8,
              fontWeight: 900, fontSize: 18,
            }}>あなたには <span style={{ color: 'var(--donki-red)' }}>{product.size}</span> サイズ</div>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 6,
          }}>
            <div style={{ fontWeight: 900, fontSize: 15, color: 'var(--donki-ink-3)' }}>
              {t.color || 'カラー'} / COLOR ·
              <span style={{ color: 'var(--donki-black)', marginLeft: 8 }}>{currentColor}</span>
              <span style={{ marginLeft: 8, color: 'var(--donki-ink-3)' }}>
                ({colorIdx + 1} / {total})
              </span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {colors.map((_, i) => (
                <span key={i} style={{
                  width: i === colorIdx ? 22 : 9, height: 9, borderRadius: 6,
                  background: i === colorIdx ? 'var(--donki-red)' : 'rgba(0,0,0,0.18)',
                  transition: 'all 0.2s',
                }} />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'stretch', gap: 10 }}>
            <button onClick={prev} aria-label="prev color" style={{
              flex: '0 0 auto', width: 52,
              borderRadius: 14, border: '3px solid var(--donki-black)',
              background: 'var(--donki-yellow)', color: 'var(--donki-black)',
              fontSize: 28, fontWeight: 900, cursor: 'pointer',
              boxShadow: '0 4px 0 var(--donki-black)',
            }}>◀</button>

            <div style={{
              flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
            }}>
              {[
                { side: 'FRONT', label: '表 / 前' },
                { side: 'BACK',  label: '裏 / 後' },
              ].map((v, i) => (
                <div key={v.side} style={{
                  border: '3px solid var(--donki-black)', borderRadius: 12,
                  background: '#fff', padding: 8,
                  boxShadow: '0 4px 0 var(--donki-black)',
                  display: 'flex', flexDirection: 'column',
                }}>
                  <div style={{
                    height: 240, background: '#fff', borderRadius: 8, overflow: 'hidden',
                    position: 'relative',
                  }}>
                    <img
                      src={getImageUrl(product.slug, variantKey)}
                      alt={`${currentColor} ${v.side}`}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transform: i === 1 ? 'scaleX(-1)' : 'none',
                        opacity: i === 1 ? 0.92 : 1,
                      }}
                    />
                    <span style={{
                      position: 'absolute', top: 6, left: 6,
                      background: 'var(--donki-black)', color: 'var(--donki-yellow)',
                      fontWeight: 900, fontSize: 12, padding: '3px 8px', borderRadius: 4,
                    }}>{v.side}</span>
                  </div>
                  <div style={{
                    marginTop: 6, fontWeight: 900, fontSize: 15,
                    textAlign: 'center', color: 'var(--donki-black)',
                  }}>{v.label}</div>
                </div>
              ))}
            </div>

            <button onClick={next} aria-label="next color" style={{
              flex: '0 0 auto', width: 52,
              borderRadius: 14, border: '3px solid var(--donki-black)',
              background: 'var(--donki-yellow)', color: 'var(--donki-black)',
              fontSize: 28, fontWeight: 900, cursor: 'pointer',
              boxShadow: '0 4px 0 var(--donki-black)',
            }}>▶</button>
          </div>
        </div>

        <div style={{ fontSize: 16, color: 'var(--donki-ink-2)', lineHeight: 1.5 }}>
          <span style={{ fontWeight: 900, color: 'var(--donki-ink-3)' }}>カラー展開：</span>
          <span style={{ marginLeft: 6, fontWeight: 900, color: 'var(--donki-black)' }}>
            {colors.join(' / ')}
          </span>
          <span style={{ marginLeft: 10, color: 'var(--donki-ink-3)' }}>（全 {total} 色）</span>
        </div>

        <div style={{ paddingTop: 10, borderTop: '3px solid var(--donki-black)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 900, fontSize: 40, color: 'var(--donki-red)', lineHeight: 1 }}>
              ¥{product.price.toLocaleString()}
            </span>
            <span style={{ fontSize: 14, color: 'var(--donki-ink-3)' }}>（税込 / {t.price}）</span>
            <span style={{ marginLeft: 'auto', fontWeight: 900, fontSize: 16, color: 'var(--donki-ink-3)' }}>
              {product.tag}
            </span>
          </div>
          <div style={{ marginTop: 8, fontSize: 16, lineHeight: 1.6, color: 'var(--donki-black)' }}>
            <span style={{ fontWeight: 900, color: 'var(--donki-ink-3)' }}>{t.material} / 素材：</span>
            <span style={{ fontWeight: 900, marginLeft: 4 }}>{product.mat}</span>
            <span style={{ margin: '0 12px', color: 'var(--donki-ink-3)' }}>·</span>
            <span style={{ fontWeight: 900, color: 'var(--donki-ink-3)' }}>サイズ展開：</span>
            <span style={{ fontWeight: 900, marginLeft: 4 }}>
              XS / S / M / L / XL / XXL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultScreen({ lang, setLang, onBack, onProduct, onRestart }) {
  const t = STRINGS[lang] || STRINGS.jp;
  const [tab, setTab] = useState('product');

  const getImageUrl = (slug, variant) => {
    if (window.__resources) return window.__resources[`tee_${slug}_${variant}`];
    return `assets/tees/${slug}-front-${variant}.png`;
  };

  return (
    <Stage>
      <SignageChrome lang={lang} setLang={setLang} step={3} totalSteps={3} />

      <div style={{ position: 'absolute', top: 220, left: 60, right: 60 }}>
        <div className="pop-slash" style={{ fontSize: 24 }}><span>AI SIZE FINDER・RESULT</span></div>
        <div style={{ fontWeight: 900, fontSize: 56, marginTop: 10, lineHeight: 1.1 }}>
          あなたのサイズは <span style={{ color: 'var(--donki-red)' }}>「Lサイズ」</span>
        </div>
        <div style={{ fontWeight: 700, fontSize: 22, color: 'var(--donki-ink-3)', marginTop: 4 }}>
          Your size · 您的尺码 · 당신의 사이즈 : <b>L</b>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 400, left: 60, right: 60, display: 'flex', gap: 0 }}>
        {[
          { k: 'product', l: t.tabProduct },
          { k: 'body',    l: t.tabBody },
        ].map(x => (
          <button key={x.k} onClick={() => setTab(x.k)} style={{
            flex: 1, padding: '20px 0',
            background: tab === x.k ? 'var(--donki-black)' : 'var(--donki-surface)',
            color: tab === x.k ? 'var(--donki-white)' : 'var(--donki-ink-3)',
            border: 'none', cursor: 'pointer',
            fontWeight: 900, fontSize: 28,
            borderTopLeftRadius:  x.k === 'product' ? 20 : 0,
            borderTopRightRadius: x.k === 'body'    ? 20 : 0,
          }}>{x.l}</button>
        ))}
      </div>

      {tab === 'product' ? (
        <div style={{
          position: 'absolute', top: 490, left: 60, right: 60,
          height: 900,
          background: 'var(--donki-surface)', borderRadius: 20, padding: 20,
          overflow: 'hidden',
        }}>
          <div style={{ fontWeight: 900, fontSize: 24, marginBottom: 12, color: 'var(--donki-black)' }}>
            🔥 {t.recommended} — Osusowake Tシャツ 8 items
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14,
          }}>
            {PRODUCTS.map(p => (
              <button key={p.id} onClick={() => onProduct && onProduct(p)} style={{
                border: '3px solid var(--donki-black)', borderRadius: 14,
                background: 'var(--donki-white)', padding: 10,
                cursor: 'pointer', textAlign: 'left',
                display: 'flex', flexDirection: 'column', gap: 6,
                boxShadow: '0 4px 0 var(--donki-black)',
              }}>
                <div style={{
                  height: 200, borderRadius: 8, position: 'relative',
                  background: '#fff', overflow: 'hidden',
                  border: '2px solid var(--donki-ink-1)',
                }}>
                  <img src={getImageUrl(p.slug, 'a')} alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                  <span style={{
                    position: 'absolute', top: 6, left: 6,
                    background: 'var(--donki-red)', color: '#fff', fontSize: 11,
                    padding: '3px 8px', borderRadius: 4, fontWeight: 900,
                  }}>{p.tag}</span>
                  <span style={{
                    position: 'absolute', bottom: 6, right: 6,
                    background: 'var(--donki-black)', color: 'var(--donki-yellow)',
                    fontSize: 12, padding: '3px 10px', borderRadius: 4, fontWeight: 900,
                  }}>{p.size}サイズ</span>
                </div>
                <div style={{ fontWeight: 900, fontSize: 15, lineHeight: 1.2, minHeight: 36 }}>{p.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontWeight: 900, fontSize: 22, color: 'var(--donki-red)' }}>¥{p.price.toLocaleString()}</span>
                  <span style={{ fontSize: 11, color: 'var(--donki-ink-3)' }}>税込</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{
          position: 'absolute', top: 490, left: 60, right: 60,
          height: 900,
          background: 'var(--donki-surface)', borderRadius: 20, padding: 32,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ fontWeight: 900, fontSize: 40, marginBottom: 28, color: 'var(--donki-black)' }}>
            ボディサイズ / Body Measurements
          </div>
          <div style={{ width: 680, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {BODY_MEASURES.map((m, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                background: 'var(--donki-white)', borderRadius: 16,
                padding: '20px 32px', border: '3px solid var(--donki-black)',
                boxShadow: '0 4px 0 var(--donki-black)',
              }}>
                <span style={{ fontWeight: 700, fontSize: 26 }}>{m.label}</span>
                <span>
                  <span style={{ fontWeight: 900, fontSize: 44, color: 'var(--donki-red)' }}>{m.value}</span>
                  <span style={{ fontSize: 22, marginLeft: 6, color: 'var(--donki-ink-3)' }}>{m.unit}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{
        position: 'absolute', top: 1420, left: 60, right: 60, height: 140,
        background: 'var(--donki-black)', color: 'var(--donki-white)',
        borderRadius: 22, padding: '14px 22px',
        display: 'flex', alignItems: 'center', gap: 20,
      }}>
        <div style={{ background: '#fff', padding: 6, borderRadius: 6 }}>
          <FakeQR size={110} seed={42} />
        </div>
        <div>
          <div style={{ fontWeight: 900, fontSize: 28 }}>{t.saveQr}</div>
          <div style={{ fontWeight: 500, fontSize: 18, opacity: 0.85, marginTop: 4 }}>
            {t.saveQrSub} · QRは毎回ユニーク発行
          </div>
        </div>
      </div>

      <NavFooter
        left={<button className="nav-btn ghost" onClick={onBack}>◀ やり直し</button>}
        right={<button className="nav-btn primary" onClick={onRestart}>最初に戻る</button>}
        center="STEP 3 / 3"
      />
    </Stage>
  );
}
