import { useState, useRef, useEffect } from 'react';
import {
  canNativeShare,
  shareGeneric,
  setupKakaoButton,
  shareSMS,
  shareClipboard,
  getShareDebugLogs,
} from '../services/share.js';
import './SharePanel.css';

export default function SharePanel({ question }) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState(null);
  const [debugVisible, setDebugVisible] = useState(true);
  const [debugKey, setDebugKey] = useState(0);
  const tapRef = useRef({ count: 0, timer: null });
  const kakaoRef = useRef(null);
  const hasNativeShare = canNativeShare();

  // ── 카카오 버튼 바인딩 (question 변경 시마다) ─────────────────
  useEffect(() => {
    if (hasNativeShare || !kakaoRef.current) return;
    const ok = setupKakaoButton(kakaoRef.current, question);
    if (ok) setDebugKey(k => k + 1); // 로그 갱신
  }, [question, hasNativeShare]);

  // ── iOS: 네이티브 공유 시트 ─────────────────────────────────
  const handleShare = async () => {
    setStatus('sharing');
    const result = await shareGeneric(question);
    if (result.ok) {
      setStatus(null);
      return;
    }
    const clipOk = await shareClipboard(question);
    if (clipOk) {
      setCopied(true);
      setStatus('copied-fallback');
      setTimeout(() => { setCopied(false); setStatus(null); }, 3000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    }
  };

  // ── Android: 문자 공유 ──────────────────────────────────────
  const handleSMS = () => {
    shareSMS(question);
  };

  // ── 링크 복사 ──────────────────────────────────────────────
  const handleCopy = async () => {
    const success = await shareClipboard(question);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 5번 탭 → 디버그 토글
  const handleDebugTap = () => {
    const ref = tapRef.current;
    ref.count++;
    clearTimeout(ref.timer);
    ref.timer = setTimeout(() => { ref.count = 0; }, 600);
    if (ref.count >= 5) {
      ref.count = 0;
      setDebugVisible(v => !v);
    }
  };

  return (
    <div className="share-panel">
      {hasNativeShare ? (
        /* ── iOS: 공유하기 + 링크 복사 ─────────────────────── */
        <div className="share-buttons">
          <button
            className="share-btn share-btn--share"
            onClick={handleShare}
            disabled={status === 'sharing'}
          >
            {status === 'sharing' ? '공유 중...'
              : status === 'copied-fallback' ? '링크 복사됨!'
              : status === 'error' ? '공유 실패'
              : '공유하기'}
          </button>
          <button className="share-btn share-btn--copy" onClick={handleCopy}>
            {copied ? '복사됨!' : '링크 복사'}
          </button>
        </div>
      ) : (
        /* ── Android: 카카오톡 / 문자 / 링크 복사 ──────────── */
        <div className="share-buttons">
          <button
            ref={kakaoRef}
            className="share-btn share-btn--kakao"
          >
            카카오톡
          </button>
          <button className="share-btn share-btn--sms" onClick={handleSMS}>
            문자
          </button>
          <button className="share-btn share-btn--copy" onClick={handleCopy}>
            {copied ? '복사됨!' : '링크 복사'}
          </button>
        </div>
      )}

      {debugVisible && (
        <pre className="share-debug" onClick={handleDebugTap}>
          {getShareDebugLogs().join('\n') || '(로그 없음)'}
        </pre>
      )}
    </div>
  );
}
