import React from 'react';
import donpenImg from '../assets/donpen.png';
import logoYellowImg from '../assets/logo_yellow.png';
import logoBlackImg from '../assets/logo_black.png';

export const STRINGS = {
  jp: {
    tap: "画面にタッチしてスタート",
    title: "ドン・キホーテ\nTシャツ採寸サイネージ",
    subtitle: "AIがあなたにピッタリのサイズを診断",
    free: "無料・約60秒",
    start: "はじめる",
    terms: "ご利用規約",
    termsLead: "以下の事項にご同意の上ご利用ください",
    agree: "同意する",
    back: "もどる",
    next: "つぎへ",
    gender: "性別",
    men: "メンズ",
    women: "レディース",
    age: "年齢",
    height: "身長 (cm)",
    weight: "体重 (kg)",
    capture: "撮影",
    captureLead: "枠内に立ってお待ちください",
    countdownLead: "撮影開始",
    result: "診断結果",
    your: "あなたのサイズ",
    tabProduct: "商品サイズ",
    tabBody: "ボディサイズ",
    recommended: "おすすめ商品",
    suggestedSize: "推奨サイズ",
    saveQr: "商品をスマホで確認",
    saveQrSub: "二次元コードをスキャン",
    price: "税込",
    color: "カラー",
    material: "素材",
    close: "閉じる",
    viewOnWeb: "Webで詳しく見る",
    scan: "QRをスキャン",
  },
  en: {
    tap: "Touch the screen to start",
    title: "Don Quijote\nT-Shirt Size Finder",
    subtitle: "AI finds your perfect Japanese size",
    free: "Free · about 60 sec",
    start: "START",
    terms: "Terms of Use",
    termsLead: "Please read and accept before proceeding",
    agree: "I AGREE",
    back: "BACK",
    next: "NEXT",
    gender: "Gender",
    men: "Men",
    women: "Women",
    age: "Age",
    height: "Height (cm)",
    weight: "Weight (kg)",
    capture: "Capture",
    captureLead: "Stand inside the frame",
    countdownLead: "Ready...",
    result: "Your Result",
    your: "Your Size",
    tabProduct: "Garment Size",
    tabBody: "Body Size",
    recommended: "Recommended Items",
    suggestedSize: "Suggested",
    saveQr: "View products on your phone",
    saveQrSub: "Scan the QR code",
    price: "incl. tax",
    color: "Color",
    material: "Fabric",
    close: "Close",
    viewOnWeb: "View on Web",
    scan: "Scan QR",
  },
  zh: {
    tap: "触摸屏幕开始",
    title: "唐吉诃德\nT恤尺码测量",
    subtitle: "AI为您推荐合适的日本尺码",
    free: "免费 · 约60秒",
    start: "开始",
    terms: "使用条款",
    termsLead: "请先确认并同意以下事项",
    agree: "同意",
    back: "返回",
    next: "下一步",
    gender: "性别", men: "男士", women: "女士",
    age: "年龄", height: "身高 (cm)", weight: "体重 (kg)",
    capture: "拍摄", captureLead: "请站在框内",
    countdownLead: "即将开始",
    result: "测量结果", your: "您的尺码",
    tabProduct: "商品尺码", tabBody: "身体尺码",
    recommended: "推荐商品", suggestedSize: "推荐",
    saveQr: "用手机查看商品", saveQrSub: "扫描二维码",
    price: "含税", color: "颜色", material: "面料",
    close: "关闭", viewOnWeb: "在网页查看", scan: "扫码",
  },
  ko: {
    tap: "화면을 터치해서 시작",
    title: "돈키호테\nT셔츠 사이즈 진단",
    subtitle: "AI가 딱 맞는 일본 사이즈를 진단",
    free: "무료 · 약 60초", start: "시작하기",
    terms: "이용약관", termsLead: "아래 내용을 확인하고 진행해주세요",
    agree: "동의", back: "뒤로", next: "다음",
    gender: "성별", men: "남성", women: "여성",
    age: "나이", height: "키 (cm)", weight: "몸무게 (kg)",
    capture: "촬영", captureLead: "프레임 안에 서주세요",
    countdownLead: "촬영 시작",
    result: "진단 결과", your: "당신의 사이즈",
    tabProduct: "상품 사이즈", tabBody: "신체 사이즈",
    recommended: "추천 상품", suggestedSize: "추천",
    saveQr: "스마트폰에서 상품 확인", saveQrSub: "QR코드를 스캔",
    price: "세금 포함", color: "색상", material: "소재",
    close: "닫기", viewOnWeb: "웹에서 보기", scan: "QR 스캔",
  },
};

export function FakeQR({ size = 180, seed = 7 }) {
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
    <svg width={size} height={size} viewBox={`0 0 ${N} ${N}`} style={{ background: '#fff' }}>
      {cells}
    </svg>
  );
}

export const FLAGS = [
  { code: 'jp', emoji: '🇯🇵', label: '日本語', sub: 'Japanese' },
  { code: 'en', emoji: '🇺🇸', label: 'English', sub: 'English' },
  { code: 'zh', emoji: '🇨🇳', label: '简体中文', sub: 'Simplified Chinese' },
  { code: 'zh-t', emoji: '🇹🇼', label: '繁體中文', sub: 'Traditional Chinese' },
  { code: 'ko', emoji: '🇰🇷', label: '한국어', sub: 'Korean' },
];

export function DonKen({ size = 160, hat = true, style }) {
  return (
    <img src={donpenImg} alt="Donpen" style={{ width: size, height: 'auto', ...style }} />
  );
}

export function SignageChrome({ lang, setLang, step, totalSteps, showLang = false, children, footer }) {
  const t = STRINGS[lang] || STRINGS.jp;
  return (
    <>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 96,
        background: 'var(--donki-black)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src={logoYellowImg} alt="DON・QUIJOTE" style={{ height: 44, objectFit: 'contain' }} />
          <div style={{ color: 'var(--donki-yellow)', fontWeight: 700, fontSize: 22, marginLeft: 16 }}>
            T-SHIRT SIZE FINDER
          </div>
        </div>
        {showLang && (
          <div style={{ display: 'flex', gap: 8 }}>
            {FLAGS.slice(0, 5).map(f => (
              <button key={f.code} onClick={() => setLang && setLang(f.code === 'zh-t' ? 'zh' : f.code)}
                style={{
                  width: 56, height: 56, borderRadius: 12,
                  border: (lang === f.code || (lang === 'zh' && f.code.startsWith('zh')))
                    ? '3px solid var(--donki-yellow)' : '3px solid transparent',
                  background: 'var(--donki-white)',
                  fontSize: 28, cursor: 'pointer', padding: 0,
                }}>{f.emoji}</button>
            ))}
          </div>
        )}
      </div>

      {step != null && (
        <div style={{
          position: 'absolute', top: 112, left: 40, zIndex: 9,
          display: 'flex', gap: 10, alignItems: 'center',
        }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} style={{
              width: i + 1 === step ? 80 : 36, height: 12,
              borderRadius: 6,
              background: i + 1 <= step ? 'var(--donki-yellow)' : 'rgba(0,0,0,0.12)',
              border: i + 1 === step ? '2px solid var(--donki-black)' : 'none',
              transition: 'width .25s',
            }} />
          ))}
          <div style={{ marginLeft: 16, fontWeight: 900, fontSize: 22, color: 'var(--donki-ink-2)' }}>
            STEP {step} / {totalSteps}
          </div>
        </div>
      )}

      {children}

      {footer !== false && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10 }}>
          <div className="marquee-band">
            <div className="track">T-SHIRT SIZE FINDER</div>
          </div>
        </div>
      )}
    </>
  );
}

export function Stage({ children, bg = 'var(--donki-white)', style, ...rest }) {
  return (
    <div className="donki-stage" style={{ background: bg, ...style }} {...rest}>
      {children}
    </div>
  );
}

export function NavFooter({ left, right, center }) {
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
