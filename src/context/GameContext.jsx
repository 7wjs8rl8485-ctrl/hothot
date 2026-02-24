import { createContext, useContext, useReducer, useMemo, useEffect, useRef, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase.js';
import { questions, ROUND_SIZE } from '../data/questions.js';
import { getTossUserKey } from '../services/toss.js';

const GameContext = createContext(null);

const STORAGE_KEY = 'hothot_votes';

function loadLocalVotes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveLocalVotes(votes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
}

// Firestore에 사용자별 투표 기록 저장
async function saveUserVoteToFirestore(userKey, questionId, choice) {
  if (!userKey) return;
  try {
    await setDoc(doc(db, 'users', userKey), { [questionId]: choice }, { merge: true });
  } catch (err) {
    console.warn('Failed to save user vote to Firestore:', err);
  }
}

// Firestore에서 사용자별 투표 기록 로드
async function loadUserVotesFromFirestore(userKey) {
  if (!userKey) return null;
  try {
    const snap = await getDoc(doc(db, 'users', userKey));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    console.warn('Failed to load user votes from Firestore:', err);
    return null;
  }
}

const initialState = {
  category: 'all',
  currentIndex: 0,
  phase: 'choosing', // 'choosing' | 'result' | 'round_end'
  userVotes: loadLocalVotes(),
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload, currentIndex: 0, phase: 'choosing' };
    case 'VOTE': {
      const newVotes = { ...state.userVotes, [action.questionId]: action.choice };
      saveLocalVotes(newVotes);
      return { ...state, phase: 'result', userVotes: newVotes };
    }
    case 'LOAD_VOTES':
      return { ...state, userVotes: { ...state.userVotes, ...action.votes } };
    case 'NEXT_QUESTION': {
      const nextIndex = state.currentIndex + 1;
      const isRoundBoundary = nextIndex > 0 && nextIndex % ROUND_SIZE === 0;
      return { ...state, currentIndex: nextIndex, phase: isRoundBoundary ? 'round_end' : 'choosing' };
    }
    case 'NEXT_ROUND':
      return { ...state, phase: 'choosing' };
    case 'RESET':
      return { ...state, currentIndex: 0, phase: 'choosing' };
    case 'JUMP_TO': {
      return { ...state, currentIndex: action.index, phase: action.phase || 'choosing' };
    }
    default:
      return state;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [userKey, setUserKey] = useState(null);
  const didMount = useRef(false);

  const filteredQuestions = useMemo(() => {
    if (state.category === 'all') return questions;
    return questions.filter(q => q.category === state.category);
  }, [state.category]);

  const currentQuestion = filteredQuestions[state.currentIndex] ?? null;
  const isAllDone = state.currentIndex >= filteredQuestions.length;
  const isRoundEnd = state.phase === 'round_end' && !isAllDone;
  const isFinished = isAllDone;
  const roundNumber = Math.floor(state.currentIndex / ROUND_SIZE) + 1;
  const roundProgress = state.currentIndex % ROUND_SIZE;

  const alreadyVoted = currentQuestion ? state.userVotes[currentQuestion.id] || null : null;

  // 토스 유저 키 조회 + Firestore에서 투표 기록 복원 (마운트 시 1회)
  useEffect(() => {
    let cancelled = false;
    async function init() {
      const key = await getTossUserKey();
      if (cancelled) return;
      if (key) {
        setUserKey(key);
        // Firestore에서 기존 투표 기록 복원
        const firestoreVotes = await loadUserVotesFromFirestore(key);
        if (!cancelled && firestoreVotes) {
          dispatch({ type: 'LOAD_VOTES', votes: firestoreVotes });
          // localStorage에도 동기화
          const merged = { ...loadLocalVotes(), ...firestoreVotes };
          saveLocalVotes(merged);
        }
      }
    }
    init();
    return () => { cancelled = true; };
  }, []);

  // VOTE 시 Firestore에도 저장 (userKey가 있을 때)
  const prevVotes = useRef(state.userVotes);
  useEffect(() => {
    if (!userKey) return;
    // 새로 추가된 투표만 Firestore에 저장
    const prev = prevVotes.current;
    for (const qId of Object.keys(state.userVotes)) {
      if (!prev[qId] && state.userVotes[qId]) {
        saveUserVoteToFirestore(userKey, qId, state.userVotes[qId]);
      }
    }
    prevVotes.current = state.userVotes;
  }, [state.userVotes, userKey]);

  // Deep-link: jump to specific question from URL (run once on mount)
  useEffect(() => {
    if (didMount.current) return;
    didMount.current = true;

    const params = new URLSearchParams(window.location.search);
    const qId = params.get('q');
    if (qId) {
      const allQuestions = questions; // Use full list for deep-link lookup
      const idx = allQuestions.findIndex(q => q.id === qId);
      if (idx >= 0) {
        const saved = loadLocalVotes();
        const voted = saved[qId];
        dispatch({ type: 'JUMP_TO', index: idx, phase: voted ? 'result' : 'choosing' });
      }
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const value = useMemo(() => ({
    ...state,
    userKey,
    filteredQuestions,
    currentQuestion,
    isFinished,
    isRoundEnd,
    isAllDone,
    roundNumber,
    roundProgress,
    alreadyVoted,
    dispatch,
  }), [state, userKey, filteredQuestions, currentQuestion, isFinished, isRoundEnd, isAllDone, roundNumber, roundProgress, alreadyVoted]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
