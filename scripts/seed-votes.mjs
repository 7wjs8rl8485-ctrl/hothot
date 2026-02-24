/**
 * Firestore 초기 투표 문서 생성 스크립트
 *
 * 사용법:
 * 1. .env.local 파일에 Firebase 설정 값을 입력하세요
 * 2. 아래 firebaseConfig에 직접 값을 넣거나, 환경 변수를 사용하세요
 * 3. 실행: node scripts/seed-votes.mjs
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Firebase 설정 — .env.local 값을 직접 여기에 붙여넣으세요
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || 'YOUR_AUTH_DOMAIN',
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || 'YOUR_STORAGE_BUCKET',
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_SENDER_ID',
  appId: process.env.VITE_FIREBASE_APP_ID || 'YOUR_APP_ID',
};

// 질문 ID 목록 (src/data/questions.js와 동기화)
const questionIds = [
  'q001', 'q002', 'q003', 'q004', 'q005', 'q006', 'q007', 'q008',
  'q009', 'q010', 'q011', 'q012', 'q013', 'q014', 'q015', 'q016',
  'q017', 'q018', 'q019', 'q020', 'q021', 'q022', 'q023', 'q024',
  'q025', 'q026', 'q027', 'q028',
];

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedVotes() {
  console.log(`Seeding ${questionIds.length} vote documents...`);

  for (const id of questionIds) {
    await setDoc(doc(db, 'votes', id), { a: 0, b: 0 });
    console.log(`  Created: votes/${id}`);
  }

  console.log('Done! All vote documents created.');
  process.exit(0);
}

seedVotes().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
