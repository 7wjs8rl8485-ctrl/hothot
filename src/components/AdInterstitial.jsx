import { useState, useEffect } from 'react';
import './AdInterstitial.css';

const COUNTDOWN_SEC = 5;

export default function AdInterstitial({ onClose }) {
  const [remaining, setRemaining] = useState(COUNTDOWN_SEC);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setTimeout(() => setRemaining(r => r - 1), 1000);
    return () => clearTimeout(timer);
  }, [remaining]);

  return (
    <div className="ad-interstitial-overlay">
      <div className="ad-interstitial">
        <div className="ad-interstitial-header">
          {remaining > 0 ? (
            <span className="ad-interstitial-countdown">{remaining}초 후 닫기</span>
          ) : (
            <button className="ad-interstitial-close" onClick={onClose}>✕ 닫기</button>
          )}
        </div>
        <div className="ad-interstitial-body">
          <span className="ad-interstitial-label">AD</span>
          <p className="ad-interstitial-text">광고 영역</p>
          <p className="ad-interstitial-sub">15~30초 동영상 광고 자리</p>
        </div>
      </div>
    </div>
  );
}
