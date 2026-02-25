import { CATEGORIES } from '../data/questions.js';
import { useGame } from '../context/GameContext.jsx';
import { playSfx } from '../services/sound.js';
import './CategoryFilter.css';

export default function CategoryFilter({ muted, onToggleMute }) {
  const { category, dispatch } = useGame();

  return (
    <nav className="category-filter" role="tablist">
      <button
        className="category-pill mute-pill"
        onClick={onToggleMute}
        aria-label={muted ? '소리 켜기' : '소리 끄기'}
      >
        {muted ? '🔇' : '🔊'}
      </button>
      {Object.entries(CATEGORIES).map(([key, { label, emoji }]) => (
        <button
          key={key}
          role="tab"
          aria-selected={category === key}
          className={`category-pill ${category === key ? 'category-pill--active' : ''}`}
          onClick={() => { playSfx('category'); dispatch({ type: 'SET_CATEGORY', payload: key }); }}
        >
          {emoji} {label}
        </button>
      ))}
    </nav>
  );
}
