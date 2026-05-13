import React, { useState, useEffect } from 'react';
import TopScreen from './screens/TopScreen.jsx';
import TermsScreen from './screens/TermsScreen.jsx';
import InfoScreen from './screens/InfoScreen.jsx';
import ResultScreen, { ProductModal } from './screens/ResultScreen.jsx';

export default function App() {
  const [lang, setLang] = useState('jp');
  const [flowStep, setFlowStep] = useState(0);
  const [info, setInfo] = useState({ gender: 'men', age: null, height: null, weight: null });
  const [product, setProduct] = useState(null);

  return (
    <>
      <div style={{ position: 'relative', width: 1080, height: 1920, overflow: 'hidden' }}>
        {flowStep === 0 && (
          <TopScreen lang={lang} setLang={setLang} onStart={() => setFlowStep(1)} />
        )}
        {flowStep === 1 && (
          <TermsScreen lang={lang} setLang={setLang} onBack={() => setFlowStep(0)} onAgree={() => setFlowStep(2)} />
        )}
        {flowStep === 2 && (
          <InfoScreen lang={lang} setLang={setLang} info={info} setInfo={setInfo} onBack={() => setFlowStep(1)} onNext={() => setFlowStep(3)} />
        )}
        {flowStep === 3 && (
          <>
            <ResultScreen lang={lang} setLang={setLang} onBack={() => setFlowStep(2)} onProduct={setProduct} onRestart={() => setFlowStep(0)} />
            {product && <ProductModal lang={lang} product={product} onClose={() => setProduct(null)} />}
          </>
        )}
      </div>
    </>
  );
}
