// screens.jsx — 6-screen Donki signage scope
// Screens: Standby (fixed reference) → TOP → Terms → Info → Result → Product popup
// Nav buttons use .nav-btn (72px) so they don't collide with page content.

// ─────────────────────────────────────────────
// Shared footer — always the same static copy
// ─────────────────────────────────────────────
function NavFooter({ left, right, center }) {
  // bottom reserved area above the static brand band (which is ~56px tall)
  return (
    <div style={{
      position: 'absolute', bottom: 120, left: 60, right: 60,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      gap: 16, zIndex: 12,
    }}>
      <div>{left}</div>
      <div style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 20, color: 'var(--donki-ink-3)' }}>
        {center}
      </div>
      <div>{right}</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 00 — STANDBY (FIXED, reference only — matches PPTX p.3)
// ─────────────────────────────────────────────
function StandbyScreen() {
  return (
    <Stage bg="var(--donki-yellow)">
      {/* Big POP layout mimicking PPTX p.3 reference */}
      <div style={{
        position: 'absolute', top: 100, left: 60, right: 60,
        textAlign: 'left',
      }}>
        <div style={{ fontWeight: 900, fontSize: 108, lineHeight: 0.95, color: 'var(--donki-black)' }}>
          ドン・キホーテ
        </div>
        <div style={{ fontWeight: 900, fontSize: 180, lineHeight: 0.95, marginTop: 24, color: 'var(--donki-black)' }}>
          Tシャツ<br/>サイズ診断
        </div>
        <div style={{ fontWeight: 900, fontSize: 64, color: 'var(--donki-red)', marginTop: 40, lineHeight: 1.1 }}>
          日本サイズは<br/>AIにおまかせ!
        </div>
      </div>

      {/* mascot + product placeholders */}
      <div style={{ position: 'absolute', top: 1200, left: 80, display: 'flex', gap: 40, alignItems: 'flex-end' }}>
        <DonKen size={320} />
        <div className="product-ph" style={{ width: 260, height: 320, borderRadius: 12 }}>Tシャツ<br/>実画像</div>
      </div>

      {/* fixed-scope note */}
      <div style={{
        position: 'absolute', bottom: 180, left: 60, right: 60,
        textAlign: 'center',
        background: 'var(--donki-black)', color: 'var(--donki-yellow)',
        padding: '20px 32px', borderRadius: 20,
        fontWeight: 900, fontSize: 26, letterSpacing: '0.04em',
      }}>
        ⓘ 待ち受け画面は PPTX p.3 の画像で固定（デザインスコープ外）
      </div>

      {/* static bottom band */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <div className="marquee-band">
          <div className="track">T-SHIRT SIZE FINDER</div>
        </div>
      </div>
    </Stage>
  );
}

// ─────────────────────────────────────────────
// 01 — TOP (language select + start)
// ─────────────────────────────────────────────
function TopScreen({ lang, setLang, onStart }) {
  const t = STRINGS[lang] || STRINGS.jp;
  return (
    <Stage bg="var(--donki-white)">
      <SignageChrome lang={lang} setLang={setLang} showLang={false} />

      {/* Hero */}
      <div style={{ position: 'absolute', top: 160, left: 60, right: 60 }}>
        <div className="pop-slash" style={{ fontSize: 32 }}>
          <span>FREE · 無料 · 免费 · 무료</span>
        </div>
        <div style={{ fontWeight: 900, fontSize: 120, lineHeight: 0.95, marginTop: 18, letterSpacing: '-0.02em' }}>
          Tシャツ<br/>サイズ診断
        </div>
        <div style={{ fontWeight: 900, fontSize: 36, color: 'var(--donki-red)', marginTop: 20 }}>
          AIがあなたにピッタリの日本サイズを診断
        </div>
      </div>

      {/* Mascot + speech bubble */}
      <div style={{ position: 'absolute', top: 600, left: 60, right: 60, display: 'flex', alignItems: 'flex-start', gap: 24 }}>
        <div style={{ flex: '0 0 auto', position: 'relative' }}>
          <DonKen size={280} />
          <div style={{
            position: 'absolute', top: 12, left: 200, right: -360,
            background: 'var(--donki-white)', border: '5px solid var(--donki-black)',
            borderRadius: 32, padding: '22px 28px',
            fontWeight: 900, fontSize: 38, lineHeight: 1.2,
            boxShadow: '0 6px 0 var(--donki-black)',
            minWidth: 480,
          }}>
            <span style={{ color: 'var(--donki-red)' }}>日本サイズ</span>はAIにお任せ！
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--donki-ink-3)', marginTop: 8 }}>
              Leave your Japan size to AI · 把日本尺码交给AI
            </div>
            {/* Tail */}
            <div style={{
              position: 'absolute', left: -28, top: 60,
              width: 0, height: 0,
              borderTop: '20px solid transparent',
              borderBottom: '20px solid transparent',
              borderRight: '28px solid var(--donki-black)',
            }} />
            <div style={{
              position: 'absolute', left: -20, top: 64,
              width: 0, height: 0,
              borderTop: '16px solid transparent',
              borderBottom: '16px solid transparent',
              borderRight: '24px solid var(--donki-white)',
            }} />
          </div>
        </div>
      </div>

      {/* Language select band */}
      <div style={{
        position: 'absolute', top: 960, left: 60, right: 60,
        background: 'var(--donki-surface)', borderRadius: 28,
        border: '4px solid var(--donki-black)', padding: 24,
        boxShadow: '0 6px 0 var(--donki-black)',
      }}>
        <div style={{ fontWeight: 900, fontSize: 28, marginBottom: 4 }}>
          Select Language / 言語選択 / 选择语言 / 언어 선택
        </div>
        <div style={{ fontWeight: 500, fontSize: 18, color: 'var(--donki-ink-3)', marginBottom: 16 }}>
          タップして言語を切り替え
        </div>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'space-between' }}>
          {FLAGS.map(f => {
            const code = f.code === 'zh-t' ? 'zh' : f.code;
            const active = lang === code;
            return (
              <button key={f.code} onClick={() => setLang && setLang(code)}
                style={{
                  flex: 1, padding: '16px 8px',
                  borderRadius: 18,
                  border: active ? '5px solid var(--donki-red)' : '3px solid var(--donki-black)',
                  background: active ? 'var(--donki-yellow)' : 'var(--donki-white)',
                  cursor: 'pointer',
                  boxShadow: '0 4px 0 var(--donki-black)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                }}>
                <div style={{ fontSize: 48, lineHeight: 1 }}>{f.emoji}</div>
                <div style={{ fontWeight: 900, fontSize: 18 }}>{f.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Start CTA */}
      <div style={{ position: 'absolute', top: 1280, left: 0, right: 0, textAlign: 'center' }}>
        <button onClick={onStart} style={{
          height: 160, minWidth: 680, padding: '0 72px',
          background: 'var(--donki-yellow)', color: 'var(--donki-black)',
          border: '6px solid var(--donki-black)', borderRadius: 9999,
          fontFamily: 'var(--font-brand)', fontWeight: 900, fontSize: 56,
          cursor: 'pointer', boxShadow: '0 10px 0 var(--donki-black)',
        }}>▶ {t.start}</button>
        <div style={{ marginTop: 22, fontWeight: 700, fontSize: 24, color: 'var(--donki-ink-3)' }}>
          {t.free} · {t.tap}
        </div>
      </div>

      {/* static footer */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <div className="marquee-band">
          <div className="track">T-SHIRT SIZE FINDER</div>
        </div>
      </div>
    </Stage>
  );
}

// ─────────────────────────────────────────────
// 02 — Terms of use
// ─────────────────────────────────────────────
function TermsScreen({ lang, setLang, onBack, onAgree }) {
  const t = STRINGS[lang] || STRINGS.jp;
  const [checked, setChecked] = React.useState(false);
  return (
    <Stage>
      <SignageChrome lang={lang} setLang={setLang} step={1} totalSteps={3} />

      <div style={{ position: 'absolute', top: 220, left: 60, right: 60 }}>
        <div style={{ fontWeight: 900, fontSize: 64 }}>{t.terms}</div>
        <div style={{ fontWeight: 700, fontSize: 24, color: 'var(--donki-ink-3)', marginTop: 6 }}>
          {t.termsLead}
        </div>
      </div>

      {/* Scrollable-looking content block (sized so nothing overlaps nav) */}
      <div style={{
        position: 'absolute', top: 380, left: 60, right: 60,
        height: 900,
        background: 'var(--donki-surface)', borderRadius: 24, padding: 40,
        border: '3px solid var(--donki-ink-3)',
        overflow: 'hidden',
        fontSize: 22, lineHeight: 1.75, color: 'var(--donki-ink-2)',
      }}>
        <p style={{ fontWeight: 900, fontSize: 28, color: 'var(--donki-black)', marginTop: 0 }}>
          1. 撮影データの取扱い / Image Handling
        </p>
        <p>本サービスでは、採寸のためにお客様の姿を一時的に撮影します。撮影データはサイズ推定の計算後、即時に削除され、サーバー・端末・クラウドいずれにも保存されません。</p>
        <p>For sizing, we capture a temporary image of your silhouette. Images are deleted immediately after size estimation and never stored on the device or cloud.</p>

        <p style={{ fontWeight: 900, fontSize: 28, color: 'var(--donki-black)', marginTop: 24 }}>
          2. 推定サイズの精度 / Accuracy
        </p>
        <p>AIによる採寸結果は目安であり、実際の着用感・素材・ブランドにより異なる場合があります。最終的なご購入は店頭での試着をお勧めします。</p>

        <p style={{ fontWeight: 900, fontSize: 28, color: 'var(--donki-black)', marginTop: 24 }}>
          3. 個人情報 / Personal Data
        </p>
        <p>入力いただく性別・年齢・身長・体重の情報は、本診断のためにのみ利用し、お客様を特定できる形での保存は行いません。</p>
      </div>

      {/* agree checkbox — placed ABOVE the nav so they don't collide */}
      <div
        onClick={() => setChecked(c => !c)}
        style={{
          position: 'absolute', top: 1320, left: 60, right: 60,
          display: 'flex', alignItems: 'center', gap: 20, cursor: 'pointer',
          background: 'var(--donki-yellow)', border: '4px solid var(--donki-black)',
          borderRadius: 20, padding: '18px 28px',
          boxShadow: '0 6px 0 var(--donki-black)',
        }}>
        <div style={{
          width: 56, height: 56, borderRadius: 12,
          border: '4px solid var(--donki-black)',
          background: checked ? 'var(--donki-red)' : 'var(--donki-white)',
          color: 'var(--donki-white)',
          display: 'grid', placeItems: 'center',
          fontSize: 36, fontWeight: 900,
        }}>{checked ? '✓' : ''}</div>
        <div style={{ fontWeight: 900, fontSize: 26, lineHeight: 1.3 }}>
          上記の内容に同意します<br/>
          <span style={{ fontSize: 20, fontWeight: 500, color: 'var(--donki-ink-2)' }}>
            I agree to the terms above
          </span>
        </div>
      </div>

      <NavFooter
        left={<button className="nav-btn ghost" onClick={onBack}>◀ {t.back}</button>}
        right={<button className="nav-btn primary" disabled={!checked} onClick={onAgree}>
          {t.agree} ▶
        </button>}
        center={`STEP 1 / 3`}
      />

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <div className="marquee-band">
          <div className="track">T-SHIRT SIZE FINDER</div>
        </div>
      </div>
    </Stage>
  );
}

// ─────────────────────────────────────────────
// 03 — Info input
// ─────────────────────────────────────────────
function InfoScreen({ lang, setLang, onBack, onNext, info, setInfo }) {
  const t = STRINGS[lang] || STRINGS.jp;
  const set = (k, v) => setInfo({ ...info, [k]: v });
  const valid = info.gender && info.height;

  return (
    <Stage>
      <SignageChrome lang={lang} setLang={setLang} step={2} totalSteps={3} />

      <div style={{ position: 'absolute', top: 220, left: 60, right: 60 }}>
        <div style={{ fontWeight: 900, fontSize: 64 }}>情報を入力 / Your Info</div>
        <div style={{ fontWeight: 700, fontSize: 22, color: 'var(--donki-ink-3)', marginTop: 6 }}>
          正確な診断のため、あなたの情報を教えてください
        </div>
      </div>

      {/* Gender */}
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

      {/* Pulldowns (height) */}
      {[
        { key: 'height', label: t.height, min: 130, max: 210, unit: 'cm' , top: 580, step: 1 },
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
              {/* caret */}
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

      {/* reassurance tip — above nav */}
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

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <div className="marquee-band">
          <div className="track">T-SHIRT SIZE FINDER</div>
        </div>
      </div>
    </Stage>
  );
}

// ─────────────────────────────────────────────
// Sample data
// ─────────────────────────────────────────────
const BODY_MEASURES = [
  { label: '肩幅 / Shoulder', value: '45.2', unit: 'cm' },
  { label: 'バスト / Chest',  value: '96.8', unit: 'cm' },
  { label: 'ウェスト / Waist', value: '82.4', unit: 'cm' },
  { label: '首周り / Neck',    value: '38.1', unit: 'cm' },
  { label: '腕の長さ / Arm',   value: '58.9', unit: 'cm' },
  { label: '着丈目安 / Length', value: '71.0', unit: 'cm' },
];

// Osusowake T-shirt collection — 8 designs × 2 colorways each
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

// ─────────────────────────────────────────────
// 04 — Result (tabs + grid, or body size view)
// ─────────────────────────────────────────────
function ResultScreen({ lang, setLang, onBack, onProduct, onRestart }) {
  const t = STRINGS[lang] || STRINGS.jp;
  const [tab, setTab] = React.useState('product');
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

      {/* Tabs */}
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

      {/* tab content — sized to leave room for QR + nav */}
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
                  <img src={`assets/tees/${p.slug}-front-a.png`} alt={p.name}
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

      {/* QR strip */}
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

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <div className="marquee-band">
          <div className="track">T-SHIRT SIZE FINDER</div>
        </div>
      </div>
    </Stage>
  );
}

// ─────────────────────────────────────────────
// 05 — Product detail popup (modal over result)
// ─────────────────────────────────────────────
function ProductModal({ lang, product, onClose }) {
  const t = STRINGS[lang] || STRINGS.jp;
  const [colorIdx, setColorIdx] = React.useState(0);
  React.useEffect(() => { setColorIdx(0); }, [product && product.id]);
  if (!product) return null;

  const colors = product.colors || [];
  const variantKey = colorIdx === 0 ? 'a' : 'b';
  const currentColor = colors[colorIdx] || colors[0];
  const total = colors.length;
  const prev = () => setColorIdx((colorIdx - 1 + total) % total);
  const next = () => setColorIdx((colorIdx + 1) % total);

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

        {/* Overlay close button — sits on the popup, top-right inside */}
        <button onClick={onClose} aria-label="close" style={{
          position: 'absolute', top: 14, right: 14, width: 52, height: 52,
          borderRadius: '50%', border: '3px solid var(--donki-black)',
          background: 'var(--donki-white)', color: 'var(--donki-black)',
          fontSize: 26, fontWeight: 900, cursor: 'pointer',
          boxShadow: '0 4px 0 var(--donki-black)', zIndex: 5,
          display: 'grid', placeItems: 'center',
        }}>✕</button>

        {/* Header — name + recommended size badge */}
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

        {/* Color slider — current color shows FRONT + BACK side-by-side; arrows switch color */}
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
            {/* Left arrow */}
            <button onClick={prev} aria-label="prev color" style={{
              flex: '0 0 auto', width: 52,
              borderRadius: 14, border: '3px solid var(--donki-black)',
              background: 'var(--donki-yellow)', color: 'var(--donki-black)',
              fontSize: 28, fontWeight: 900, cursor: 'pointer',
              boxShadow: '0 4px 0 var(--donki-black)',
            }}>◀</button>

            {/* Front + Back pair */}
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
                      src={`assets/tees/${product.slug}-front-${variantKey}.png`}
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

            {/* Right arrow */}
            <button onClick={next} aria-label="next color" style={{
              flex: '0 0 auto', width: 52,
              borderRadius: 14, border: '3px solid var(--donki-black)',
              background: 'var(--donki-yellow)', color: 'var(--donki-black)',
              fontSize: 28, fontWeight: 900, cursor: 'pointer',
              boxShadow: '0 4px 0 var(--donki-black)',
            }}>▶</button>
          </div>
        </div>

        {/* Color-variation summary — plain text (display only, not interactive) */}
        <div style={{ fontSize: 16, color: 'var(--donki-ink-2)', lineHeight: 1.5 }}>
          <span style={{ fontWeight: 900, color: 'var(--donki-ink-3)' }}>カラー展開：</span>
          <span style={{ marginLeft: 6, fontWeight: 900, color: 'var(--donki-black)' }}>
            {colors.join(' / ')}
          </span>
          <span style={{ marginLeft: 10, color: 'var(--donki-ink-3)' }}>（全 {total} 色）</span>
        </div>

        {/* Price + meta — plain text, no boxed cards */}
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

Object.assign(window, {
  StandbyScreen, TopScreen, TermsScreen, InfoScreen,
  ResultScreen, ProductModal,
});

// Thin wrapper: default the Result tab to "body"
function ResultScreenBodyDefault({ lang, setLang }) {
  const ref = React.useRef(null);
  // Render the full Result screen, then programmatically click the body tab
  React.useEffect(() => {
    const n = ref.current;
    if (!n) return;
    const tabs = n.querySelectorAll('button');
    // body tab is the second button in the tab strip; find by text
    for (const b of tabs) {
      if (b.textContent && b.textContent.trim() === (STRINGS[lang] || STRINGS.jp).tabBody) {
        b.click();
        break;
      }
    }
  }, [lang]);
  return (
    <div ref={ref}>
      <ResultScreen lang={lang} setLang={setLang} onBack={() => {}} onProduct={() => {}} onRestart={() => {}} />
    </div>
  );
}

window.ResultScreenBodyDefault = ResultScreenBodyDefault;
