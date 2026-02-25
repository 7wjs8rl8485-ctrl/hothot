import { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext.jsx';
import { playSfx } from '../services/sound.js';
import SharePanel from './SharePanel.jsx';
import './ResultView.css';

export default function ResultView({ voteCounts, onNext }) {
  const { currentQuestion, alreadyVoted, userVotes } = useGame();
  const [animatedA, setAnimatedA] = useState(0);
  const [animatedB, setAnimatedB] = useState(0);
  const [barsReady, setBarsReady] = useState(false);
  const [showReaction, setShowReaction] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const animRef = useRef(null);

  const userChoice = currentQuestion ? (userVotes[currentQuestion.id] || alreadyVoted) : null;
  const { a = 0, b = 0 } = voteCounts;
  const total = a + b;
  const percentA = total > 0 ? Math.round((a / total) * 100) : 50;
  const percentB = total > 0 ? 100 - percentA : 50;

  const userPercent = userChoice === 'a' ? percentA : percentB;
  const isMajority = userPercent >= 50;

  // Animation sequence
  useEffect(() => {
    setBarsReady(false);
    setShowReaction(false);
    setShowShare(false);
    setAnimatedA(0);
    setAnimatedB(0);

    const t1 = setTimeout(() => {
      setBarsReady(true);
      playSfx('result');
    }, 300);

    const t2 = setTimeout(() => {
      const duration = 600;
      const steps = 30;
      const interval = duration / steps;
      let step = 0;

      animRef.current = setInterval(() => {
        step++;
        const progress = step / steps;
        const eased = 1 - (1 - progress) * (1 - progress);
        setAnimatedA(Math.round(percentA * eased));
        setAnimatedB(Math.round(percentB * eased));

        if (step >= steps) {
          clearInterval(animRef.current);
          setAnimatedA(percentA);
          setAnimatedB(percentB);
        }
      }, interval);
    }, 300);

    const t3 = setTimeout(() => {
      setShowReaction(true);
      playSfx('reaction');
    }, 1000);
    const t4 = setTimeout(() => setShowShare(true), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      if (animRef.current) clearInterval(animRef.current);
    };
  }, [percentA, percentB]);

  if (!currentQuestion) return null;

  return (
    <div className="result-view">
      <div className="result-options">
        <div className={`result-option ${userChoice === 'a' ? 'result-option--selected' : ''}`}>
          <div
            className="result-bar result-bar--a"
            style={{ transform: barsReady ? `scaleX(${percentA / 100})` : 'scaleX(0)' }}
          />
          <div className="result-content">
            <span className="result-emoji">{currentQuestion.choiceA.emoji}</span>
            <span className="result-text">{currentQuestion.choiceA.text}</span>
            <span className="result-percent">{animatedA}%</span>
          </div>
          {userChoice === 'a' && <span className="my-choice-badge">MY</span>}
        </div>

        <div className={`result-option ${userChoice === 'b' ? 'result-option--selected' : ''}`}>
          <div
            className="result-bar result-bar--b"
            style={{ transform: barsReady ? `scaleX(${percentB / 100})` : 'scaleX(0)' }}
          />
          <div className="result-content">
            <span className="result-emoji">{currentQuestion.choiceB.emoji}</span>
            <span className="result-text">{currentQuestion.choiceB.text}</span>
            <span className="result-percent">{animatedB}%</span>
          </div>
          {userChoice === 'b' && <span className="my-choice-badge">MY</span>}
        </div>
      </div>

      {showReaction && (
        <div className="reaction-tag">
          {isMajority ? (
            <span className="reaction-majority">다수파! 👊</span>
          ) : (
            <span className="reaction-minority">소수파! 🔥</span>
          )}
          <p className="total-votes">총 {total.toLocaleString()}명 참여</p>
        </div>
      )}

      {showShare && (
        <div className="share-area">
          <button className="next-button" onClick={onNext}>
            다음 질문 →
          </button>
          <SharePanel question={currentQuestion} />
        </div>
      )}
    </div>
  );
}
