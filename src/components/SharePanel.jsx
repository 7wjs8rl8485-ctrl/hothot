import { useState, useRef } from 'react';
import { shareGeneric, shareClipboard, getShareDebugLogs } from '../services/share.js';
import './SharePanel.css';

export default function SharePanel({ question }) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState(null); // null | 'sharing' | 'copied-fallback' | 'error'
  const [debugVisible, setDebugVisible] = useState(false);
  const tapRef = useRef({ count: 0, timer: null });

  const handleShare = async () => {
    setStatus('sharing');
    const result = await shareGeneric(question);

    if (result.ok) {
      setStatus(null);
      return;
    }

    // 공유 실패 → 자동으로 링크 복사 + 에러 로그 표시
    setDebugVisible(true); // 디버그 로그 자동 표시
    const clipOk = await shareClipboard(question);
    if (clipOk) {
      setCopied(true);
      setStatus('copied-fallback');
      setTimeout(() => {
        setCopied(false);
        setStatus(null);
      }, 3000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    }
  };

  const handleCopy = async () => {
    const success = await shareClipboard(question);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 5번 빠르게 탭하면 디버그 패널 토글
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

  const shareLabel = () => {
    if (status === 'sharing') return '공유 중...';
    if (status === 'copied-fallback') return '링크 복사됨!';
    if (status === 'error') return '공유 실패';
    return '공유하기';
  };

  return (
    <div className="share-panel">
      <div className="share-buttons">
        <button
          className="share-btn share-btn--share"
          onClick={handleShare}
          disabled={status === 'sharing'}
        >
          {shareLabel()}
        </button>
        <button className="share-btn share-btn--copy" onClick={handleCopy}>
          {copied ? '복사됨!' : '링크 복사'}
        </button>
      </div>

      {status === 'copied-fallback' && (
        <p className="share-hint" onClick={handleDebugTap}>
          하단 공유 버튼도 이용할 수 있어요
        </p>
      )}

      {debugVisible && (
        <pre className="share-debug">{getShareDebugLogs().join('\n') || '(로그 없음)'}</pre>
      )}
    </div>
  );
}
