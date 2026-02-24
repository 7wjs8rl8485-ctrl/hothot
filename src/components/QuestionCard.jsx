import { useGame } from '../context/GameContext.jsx';
import { playSfx } from '../services/sound.js';
import './QuestionCard.css';

export default function QuestionCard({ onVote }) {
  const { currentQuestion } = useGame();

  if (!currentQuestion) return null;

  const handleChoice = (choice) => {
    playSfx('vote');
    onVote(currentQuestion.id, choice);
  };

  return (
    <div className="question-card">
      <button
        className="choice-button choice-button--a"
        onClick={() => handleChoice('a')}
      >
        <span className="choice-emoji">{currentQuestion.choiceA.emoji}</span>
        <span className="choice-text">{currentQuestion.choiceA.text}</span>
      </button>

      <div className="vs-badge">VS</div>

      <button
        className="choice-button choice-button--b"
        onClick={() => handleChoice('b')}
      >
        <span className="choice-emoji">{currentQuestion.choiceB.emoji}</span>
        <span className="choice-text">{currentQuestion.choiceB.text}</span>
      </button>
    </div>
  );
}
