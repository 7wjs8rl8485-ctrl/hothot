import { useState } from 'react';
import { shareNative, shareKakao, shareClipboard } from '../services/share.js';
import './SharePanel.css';

export default function SharePanel({ question, percentA, percentB }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shared = await shareNative(question, percentA, percentB);
    if (!shared) {
      // Fallback to clipboard
      handleCopy();
    }
  };

  const handleKakao = async () => {
    await shareKakao(question);
  };

  const handleCopy = async () => {
    const success = await shareClipboard(question);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="share-panel">
      <button className="share-btn share-btn--primary" onClick={handleShare}>
        친구에게 공유하기
      </button>
      <div className="share-secondary">
        <button className="share-btn share-btn--kakao" onClick={handleKakao}>
          카카오톡 공유
        </button>
        <button className="share-btn share-btn--copy" onClick={handleCopy}>
          {copied ? '복사됨!' : '링크 복사'}
        </button>
      </div>
    </div>
  );
}
