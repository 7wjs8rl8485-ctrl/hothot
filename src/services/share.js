import { share as tossShare, setClipboardText } from '@apps-in-toss/web-bridge';
import { isTossEnv } from './toss.js';

const APP_URL = typeof window !== 'undefined' ? window.location.origin : '';

// 카카오 SDK 초기화 (lazy — 최초 호출 시 1회)
function ensureKakaoInit() {
  if (typeof window === 'undefined' || !window.Kakao) return false;
  if (!window.Kakao.isInitialized()) {
    const key = (import.meta.env.VITE_KAKAO_JS_KEY || '').trim();
    if (key) {
      window.Kakao.init(key);
    }
  }
  return window.Kakao.isInitialized();
}

// ── 친구에게 공유하기 (투표 결과 포함) ──────────────────────
export async function shareNative(question, percentA, percentB) {
  const url = `${APP_URL}?q=${question.id}`;
  const text =
    `매운맛 밸런스게임\n\n` +
    `A: ${question.choiceA.text} (${percentA}%)\n` +
    `B: ${question.choiceB.text} (${percentB}%)\n\n` +
    `너는 어느 쪽?\n${url}`;

  // 토스 환경 → 네이티브 공유 시트
  if (isTossEnv()) {
    try {
      await tossShare({ message: text });
      return true;
    } catch (err) {
      console.warn('Toss share error:', err);
    }
  }

  // 일반 브라우저 → Web Share API
  if (navigator.share) {
    try {
      await navigator.share({ title: '매운맛 밸런스게임', text, url });
      return true;
    } catch (err) {
      if (err.name !== 'AbortError') console.warn('Share error:', err);
      return false;
    }
  }
  return false;
}

// ── 카카오톡 공유 ──────────────────────────────────────────
export async function shareKakao(question) {
  const url = `${APP_URL}?q=${question.id}`;

  // 토스 환경 → 네이티브 공유 시트 (카카오 SDK sendDefault 사용 불가)
  if (isTossEnv()) {
    const text =
      `매운맛 밸런스게임\n` +
      `${question.choiceA.text} vs ${question.choiceB.text}\n` +
      `너는 어느 쪽?\n${url}`;
    try {
      await tossShare({ message: text });
      return true;
    } catch (err) {
      console.warn('Toss share error:', err);
    }
  }

  // 비토스 환경 → 카카오 SDK 리치 카드
  if (ensureKakaoInit()) {
    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '매운맛 밸런스게임',
          description: `${question.choiceA.text} vs ${question.choiceB.text}\n너는 어느 쪽?`,
          imageUrl: `${APP_URL}/og-image.png`,
          link: { mobileWebUrl: url, webUrl: url },
        },
        buttons: [
          {
            title: '나도 투표하기',
            link: { mobileWebUrl: url, webUrl: url },
          },
        ],
      });
      return true;
    } catch (err) {
      console.warn('Kakao share failed:', err);
    }
  }

  // Fallback: navigator.share
  const text =
    `매운맛 밸런스게임\n` +
    `${question.choiceA.text} vs ${question.choiceB.text}\n` +
    `너는 어느 쪽?`;
  if (navigator.share) {
    try {
      await navigator.share({ title: '매운맛 밸런스게임', text, url });
      return true;
    } catch {
      return false;
    }
  }

  // Fallback: 클립보드
  try {
    await navigator.clipboard.writeText(`${text}\n${url}`);
  } catch {}
  return false;
}

// ── 링크 복사 ──────────────────────────────────────────────
export async function shareClipboard(question) {
  const url = `${APP_URL}?q=${question.id}`;

  // 토스 환경 → SDK 클립보드 (WebView의 clipboard API보다 안정적)
  if (isTossEnv()) {
    try {
      await setClipboardText(url);
      return true;
    } catch (err) {
      console.warn('Toss clipboard error:', err);
    }
  }

  // 일반 브라우저
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}
