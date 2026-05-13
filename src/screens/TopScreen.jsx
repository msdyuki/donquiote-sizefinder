import React from 'react';
import { STRINGS, FLAGS, DonKen, SignageChrome, Stage } from '../components/Shared.jsx';

export default function TopScreen({ lang, setLang, onStart }) {
  const t = STRINGS[lang] || STRINGS.jp;
  return (
    <Stage bg="var(--donki-white)">
      <SignageChrome lang={lang} setLang={setLang} showLang={false} />

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
    </Stage>
  );
}
