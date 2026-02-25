import { useState } from 'react';
import { shareGeneric, shareClipboard } from '../services/share.js';
import './SharePanel.css';

export default function SharePanel({ question }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shared = await shareGeneric(question);
    if (!shared) {
      handleCopy();
    }
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
      <div className="share-buttons">
        <button className="share-btn share-btn--share" onClick={handleShare}>
          공유하기
        </button>
        <button className="share-btn share-btn--copy" onClick={handleCopy}>
          {copied ? '복사됨!' : '링크 복사'}
        </button>
      </div>
    </div>
  );
}
