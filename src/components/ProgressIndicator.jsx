import { useGame } from '../context/GameContext.jsx';
import './ProgressIndicator.css';

export default function ProgressIndicator() {
  const { currentIndex, filteredQuestions, isFinished } = useGame();

  if (isFinished) return null;

  const total = filteredQuestions.length;
  const current = Math.min(currentIndex + 1, total);
  const progress = (current / total) * 100;

  return (
    <div className="progress-indicator">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="progress-text">{current} / {total}</span>
    </div>
  );
}
