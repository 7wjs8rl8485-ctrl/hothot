import { useState, useEffect, useCallback } from 'react';
import { doc, updateDoc, increment, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase.js';

const STORAGE_KEY = 'hothot_votes';

function getLocalVotes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveLocalVote(questionId, choice) {
  const votes = getLocalVotes();
  votes[questionId] = choice;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
}

export function useVote(questionId) {
  const [counts, setCounts] = useState({ a: 0, b: 0 });
  const [loading, setLoading] = useState(!!questionId);
  const [error, setError] = useState(null);

  // Real-time listener for vote counts
  useEffect(() => {
    if (!questionId) return;

    const unsub = onSnapshot(
      doc(db, 'votes', questionId),
      (snap) => {
        if (snap.exists()) {
          setCounts({ a: snap.data().a || 0, b: snap.data().b || 0 });
        }
        setLoading(false);
      },
      (err) => {
        console.warn('Vote fetch error:', err);
        setError(err);
        setLoading(false);
      }
    );

    return unsub;
  }, [questionId]);

  const submitVote = useCallback(async (qId, choice) => {
    const local = getLocalVotes();
    if (local[qId]) return;

    saveLocalVote(qId, choice);

    try {
      const ref = doc(db, 'votes', qId);
      await updateDoc(ref, { [choice]: increment(1) });
    } catch (err) {
      console.warn('Vote submit error:', err);
    }
  }, []);

  const hasVoted = getLocalVotes()[questionId] || null;

  const total = counts.a + counts.b;
  const percentA = total > 0 ? Math.round((counts.a / total) * 100) : 50;
  const percentB = total > 0 ? 100 - percentA : 50;

  return { counts, percentA, percentB, total, hasVoted, loading, error, submitVote };
}
