const APP_URL = typeof window !== 'undefined' ? window.location.origin : '';
const KAKAO_KEY = import.meta.env.VITE_KAKAO_JS_KEY;

// ── 디버그 로그 ─────────────────────────────────────────────
const _logs = [];
function log(msg) {
  const ts = new Date().toLocaleTimeString('ko-KR', { hour12: false });
  _logs.push(`[${ts}] ${msg}`);
  console.log('[share]', msg);
}
export function getShareDebugLogs() {
  return [..._logs];
}

// ── 환경 감지 ───────────────────────────────────────────────
export function canNativeShare() {
  return typeof navigator !== 'undefined' && !!navigator.share;
}

function isAndroid() {
  return /android/i.test(navigator.userAgent);
}

// ── Kakao SDK 초기화 ────────────────────────────────────────
function ensureKakao() {
  if (!window.Kakao) {
    log('kakao: SDK not loaded');
    return false;
  }
  if (!window.Kakao.isInitialized()) {
    try {
      window.Kakao.init(KAKAO_KEY);
      log('kakao: initialized');
    } catch (e) {
      log(`kakao init FAIL: ${e?.message}`);
      return false;
    }
  }
  return true;
}

// ── 공유하기 (네이티브 공유 시트 — iOS 전용) ────────────────
export async function shareGeneric(question) {
  const url = `${APP_URL}?q=${question.id}`;
  const text =
    `매운맛 밸런스게임\n` +
    `${question.choiceA.text} vs ${question.choiceB.text}\n` +
    `너는 어느 쪽?\n${url}`;

  log(`webShareAPI=${!!navigator.share}, android=${isAndroid()}`);

  if (navigator.share) {
    try {
      await navigator.share({ title: '매운맛 밸런스게임', text, url });
      log('web-share OK');
      return { ok: true };
    } catch (e) {
      log(`web-share: ${e?.name}: ${e?.message}`);
      if (e?.name === 'AbortError') return { ok: false, cancelled: true };
    }
  }

  log('navigator.share not available');
  return { ok: false };
}

// ── 카카오톡 공유 ───────────────────────────────────────────
export async function shareKakao(question) {
  const url = `${APP_URL}?q=${question.id}`;

  if (!ensureKakao()) return false;

  try {
    await window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '매운맛 밸런스게임 🔥',
        description: `${question.choiceA.text} vs ${question.choiceB.text}`,
        imageUrl: `${APP_URL}/og-image.png`,
        link: { mobileWebUrl: url, webUrl: url },
      },
      buttons: [
        {
          title: '투표하러 가기',
          link: { mobileWebUrl: url, webUrl: url },
        },
      ],
    });
    log('kakao: sendDefault OK');
    return true;
  } catch (e) {
    log(`kakao FAIL: ${e?.message}`);
    return false;
  }
}

// ── 문자(SMS) 공유 ──────────────────────────────────────────
export function shareSMS(question) {
  const url = `${APP_URL}?q=${question.id}`;
  const text =
    `매운맛 밸런스게임\n` +
    `${question.choiceA.text} vs ${question.choiceB.text}\n` +
    `너는 어느 쪽?\n${url}`;

  try {
    window.location.href = `sms:?body=${encodeURIComponent(text)}`;
    log('sms: opened');
    return true;
  } catch (e) {
    log(`sms: ${e?.message}`);
    return false;
  }
}

// ── 링크 복사 ──────────────────────────────────────────────
export async function shareClipboard(question) {
  const url = `${APP_URL}?q=${question.id}`;

  // 1. 브라우저 Clipboard API
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch (e) {
    log(`clip(browser): ${e?.message}`);
  }

  // 2. execCommand fallback
  try {
    const ta = document.createElement('textarea');
    ta.value = url;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    return true;
  } catch (e) {
    log(`clip(exec): ${e?.message}`);
    return false;
  }
}
