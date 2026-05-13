import React, { useState } from 'react';
import { STRINGS, SignageChrome, Stage, NavFooter } from '../components/Shared.jsx';

export default function TermsScreen({ lang, setLang, onBack, onAgree }) {
  const t = STRINGS[lang] || STRINGS.jp;
  const [checked, setChecked] = useState(false);

  return (
    <Stage>
      <SignageChrome lang={lang} setLang={setLang} step={1} totalSteps={3} />

      <div style={{ position: 'absolute', top: 220, left: 60, right: 60 }}>
        <div style={{ fontWeight: 900, fontSize: 64 }}>{t.terms}</div>
        <div style={{ fontWeight: 700, fontSize: 24, color: 'var(--donki-ink-3)', marginTop: 6 }}>
          {t.termsLead}
        </div>
      </div>

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
    </Stage>
  );
}
