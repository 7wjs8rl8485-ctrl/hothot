import { useState, useRef } from 'react';
import {
  canNativeShare,
  shareGeneric,
  shareKakao,
  shareSMS,
  shareClipboard,
  getShareDebugLogs,
} from '../services/share.js';
import './SharePanel.css';

export default function SharePanel({ question }) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState(null);
  const [debugVisible, setDebugVisible] = useState(false);
  const tapRef = useRef({ count: 0, timer: null });
  const hasNativeShare = canNativeShare();

  // ── iOS: 네이티브 공유 시트 ─────────────────────────────────
  const handleShare = async () => {
    setStatus('sharing');
    const result = await shareGeneric(question);
    if (result.ok) {
      setStatus(null);
      return;
    }
    // 실패 시 링크 복사 fallback
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

  // ── Android: 카카오톡 공유 ──────────────────────────────────
  const handleKakao = async () => {
    setStatus('kakao');
    const ok = await shareKakao(question);
    if (!ok) {
      // 카카오 실패 → 링크 복사 후 안내
      const clipOk = await shareClipboard(question);
      if (clipOk) {
        setCopied(true);
        setStatus('kakao-fallback');
        setTimeout(() => { setCopied(false); setStatus(null); }, 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(null), 5000);
      }
      return;
    }
    setStatus(null);
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
        <>
          <div className="share-buttons">
            <button
              className="share-btn share-btn--kakao"
              onClick={handleKakao}
              disabled={status === 'kakao'}
            >
              {status === 'kakao' ? '전송 중...'
                : status === 'kakao-fallback' ? '링크 복사됨!'
                : '카카오톡'}
            </button>
            <button className="share-btn share-btn--sms" onClick={handleSMS}>
              문자
            </button>
            <button className="share-btn share-btn--copy" onClick={handleCopy}>
              {copied ? '복사됨!' : '링크 복사'}
            </button>
          </div>
          {status === 'kakao-fallback' && (
            <p className="share-hint" onClick={handleDebugTap}>
              카카오톡 공유 실패 — 링크가 복사되었어요
            </p>
          )}
        </>
      )}

      {debugVisible && (
        <pre className="share-debug">{getShareDebugLogs().join('\n') || '(로그 없음)'}</pre>
      )}
    </div>
  );
}
