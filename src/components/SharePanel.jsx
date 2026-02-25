import { useState, useRef } from 'react';
import { shareGeneric, shareClipboard, getShareDebugLogs } from '../services/share.js';
import './SharePanel.css';

export default function SharePanel({ question }) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState(null);
  const [debugVisible, setDebugVisible] = useState(false);
  const tapRef = useRef({ count: 0, timer: null });

  const handleShare = async () => {
    setStatus('sharing');
    const result = await shareGeneric(question);

    if (result.ok && !result.uncertain) {
      // Web Share API 성공 — 공유 시트가 확실히 열림
      setStatus(null);
      return;
    }

    if (result.ok && result.uncertain) {
      // intent URL 시도됨 — 공유 시트가 열렸을 수도 있음
      // 클립보드에도 복사해둠 (백업)
      await shareClipboard(question);
      setCopied(true);
      setStatus('intent-sent');
      setTimeout(() => {
        setCopied(false);
        setStatus(null);
      }, 4000);
      return;
    }

    // 공유 실패 → 링크 복사 + 안내
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

  const shareLabel = () => {
    if (status === 'sharing') return '공유 중...';
    if (status === 'intent-sent') return '링크 복사됨!';
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

      {(status === 'intent-sent' || status === 'copied-fallback') && (
        <p className="share-hint" onClick={handleDebugTap}>
          하단 ↗ 공유 버튼도 이용할 수 있어요
        </p>
      )}

      {debugVisible && (
        <pre className="share-debug">{getShareDebugLogs().join('\n') || '(로그 없음)'}</pre>
      )}
    </div>
  );
}
