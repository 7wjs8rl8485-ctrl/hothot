import { share as tossShare, setClipboardText } from '@apps-in-toss/web-bridge';

const APP_URL = typeof window !== 'undefined' ? window.location.origin : '';

// ── 공유하기 (네이티브 공유 시트) ─────────────────────────
export async function shareGeneric(question) {
  const url = `${APP_URL}?q=${question.id}`;
  const text =
    `매운맛 밸런스게임\n` +
    `${question.choiceA.text} vs ${question.choiceB.text}\n` +
    `너는 어느 쪽?\n${url}`;

  // 1. 토스 SDK 네이티브 공유 (WebView 제약 우회)
  try {
    await tossShare({ message: text });
    return true;
  } catch {}

  // 2. Web Share API (일반 브라우저)
  if (navigator.share) {
    try {
      await navigator.share({ title: '매운맛 밸런스게임', text, url });
      return true;
    } catch {
      return false;
    }
  }

  return false;
}

// ── 링크 복사 ──────────────────────────────────────────────
export async function shareClipboard(question) {
  const url = `${APP_URL}?q=${question.id}`;

  // 1. 토스 SDK 클립보드
  try {
    await setClipboardText(url);
    return true;
  } catch {}

  // 2. 브라우저 Clipboard API
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}
