import { useState, useEffect, useRef } from 'react';
import { useGame } from './context/GameContext.jsx';
import { useVote } from './hooks/useVote.js';
import { closeMiniApp, disableSwipeBack } from './services/toss.js';
import { initSounds, startBgm, playSfx, toggleMute, isMuted } from './services/sound.js';
import CategoryFilter from './components/CategoryFilter.jsx';
import ProgressIndicator from './components/ProgressIndicator.jsx';
import SwipeContainer from './components/SwipeContainer.jsx';
import QuestionCard from './components/QuestionCard.jsx';
import ResultView from './components/ResultView.jsx';
import ExitModal from './components/ExitModal.jsx';
import AdInterstitial from './components/AdInterstitial.jsx';
import './App.css';

export default function App() {
  const { phase, currentQuestion, isRoundEnd, isAllDone, roundNumber, alreadyVoted, dispatch } = useGame();
  const { counts, submitVote } = useVote(currentQuestion?.id);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [muted, setMuted] = useState(isMuted());
  const prevFinished = useRef(false);

  const showResult = phase === 'result' || alreadyVoted;

  // 사운드 초기화
  useEffect(() => {
    initSounds();
  }, []);

  // 첫 터치 시 BGM 시작
  useEffect(() => {
    const handleFirstTouch = () => {
      startBgm();
      document.removeEventListener('touchstart', handleFirstTouch);
      document.removeEventListener('click', handleFirstTouch);
    };
    document.addEventListener('touchstart', handleFirstTouch, { once: true });
    document.addEventListener('click', handleFirstTouch, { once: true });
    return () => {
      document.removeEventListener('touchstart', handleFirstTouch);
      document.removeEventListener('click', handleFirstTouch);
    };
  }, []);

  // 완료 시 축하 효과음
  useEffect(() => {
    if (isAllDone && !prevFinished.current) {
      playSfx('finish');
    }
    prevFinished.current = isAllDone;
  }, [isAllDone]);

  // 라운드 끝나면 전면 광고 표시
  useEffect(() => {
    if (isRoundEnd) setShowAd(true);
  }, [isRoundEnd]);

  // iOS 스와이프 뒤로가기 비활성화
  useEffect(() => {
    disableSwipeBack();
  }, []);

  // 브라우저 뒤로가기 제스처 비활성화
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleVote = (questionId, choice) => {
    submitVote(questionId, choice);
    dispatch({ type: 'VOTE', questionId, choice });
  };

  const handleNext = () => {
    playSfx('next');
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const handleToggleMute = () => {
    setMuted(toggleMute());
  };

  const handleClose = () => {
    playSfx('modal');
    setShowExitModal(true);
  };

  const handleExitConfirm = () => {
    closeMiniApp();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">매운맛 밸런스게임</h1>
        <button className="close-btn" onClick={handleClose} aria-label="닫기">
          ✕
        </button>
        <CategoryFilter muted={muted} onToggleMute={handleToggleMute} />
      </header>

      <ProgressIndicator />

      <main className="app-main">
        {isAllDone ? (
          <div className="finished-screen">
            <div className="finished-emoji">🎉</div>
            <p className="finished-text">모든 질문에 답했어요!</p>
            <button
              className="restart-button"
              onClick={() => dispatch({ type: 'RESET' })}
            >
              처음부터 다시하기
            </button>
          </div>
        ) : isRoundEnd ? (
          showAd ? (
            <AdInterstitial onClose={() => setShowAd(false)} />
          ) : (
            <div className="finished-screen">
              <div className="finished-emoji">🔥</div>
              <p className="finished-text">라운드 {roundNumber - 1} 클리어!</p>
              <button
                className="restart-button"
                onClick={() => { playSfx('next'); dispatch({ type: 'NEXT_ROUND' }); }}
              >
                더 매운 거 도전 🔥
              </button>
            </div>
          )
        ) : (
          <SwipeContainer onSwipeLeft={showResult ? handleNext : undefined}>
            {showResult ? (
              <ResultView voteCounts={counts} onNext={handleNext} />
            ) : (
              <QuestionCard onVote={handleVote} />
            )}
          </SwipeContainer>
        )}
      </main>

      {showExitModal && (
        <ExitModal
          onConfirm={handleExitConfirm}
          onCancel={() => setShowExitModal(false)}
        />
      )}
    </div>
  );
}
