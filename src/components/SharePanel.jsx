import { useState, useRef } from 'react';
import {
  canNativeShare,
  shareAction,
  shareClipboard,
  getShareDebugLogs,
} from '../services/share.js';
import './SharePanel.css';

export default function SharePanel({ question }) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState(null);
  const [debugVisible, setDebugVisible] = useState(true);
  const tapRef = useRef({ count: 0, timer: null });
  const hasNativeShare = canNativeShare();

  const handleShare = async () => {
    setStatus('sharing');
    try {
      const result = await shareAction(question);

      if (result.ok) {
        // iOS 네이티브 공유 성공
        setStatus(null);
        return;
      }

      if (result.cancelled) {
        setStatus(null);
        return;
      }

      // Android — 링크 복사됨 + 안내
      if (result.copied) {
        setCopied(true);
        setStatus('guide');
        setTimeout(() => { setCopied(false); setStatus(null); }, 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(null), 3000);
      }
    } catch (e) {
      console.error('[share]', e);
      setStatus('error');
      setTimeout(() => setStatus(null), 3000);
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
    if (status === 'guide') return '링크 복사됨!';
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

      {status === 'guide' && !hasNativeShare && (
        <p className="share-guide" onClick={handleDebugTap}>
          링크가 복사되었어요!<br />
          아래 <strong>공유(↗)</strong> 버튼을 눌러 공유할 수 있어요
        </p>
      )}

      {debugVisible && (
        <pre className="share-debug">{getShareDebugLogs().join('\n') || '(로그 없음)'}</pre>
      )}
    </div>
  );
}
