import { useRef } from 'react';
import { useSwipe } from '../hooks/useSwipe.js';

export default function SwipeContainer({ children, onSwipeLeft }) {
  const containerRef = useRef(null);

  useSwipe(containerRef, {
    onSwipeLeft,
  });

  return (
    <div ref={containerRef} className="swipe-container">
      {children}
    </div>
  );
}
