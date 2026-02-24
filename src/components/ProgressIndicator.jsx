import { useGame } from '../context/GameContext.jsx';
import { ROUND_SIZE } from '../data/questions.js';
import './ProgressIndicator.css';

export default function ProgressIndicator() {
  const { isRoundEnd, isAllDone, roundNumber, roundProgress } = useGame();

  if (isRoundEnd || isAllDone) return null;

  const current = roundProgress + 1;
  const progress = (current / ROUND_SIZE) * 100;

  return (
    <div className="progress-indicator">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="progress-text">R{roundNumber} · {current}/{ROUND_SIZE}</span>
    </div>
  );
}
