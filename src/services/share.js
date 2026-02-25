const APP_URL = typeof window !== 'undefined' ? window.location.origin : '';

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

function isAndroid() {
  return /android/i.test(navigator.userAgent);
}

// ── 공유하기 (네이티브 공유 시트) ─────────────────────────────
export async function shareGeneric(question) {
  const url = `${APP_URL}?q=${question.id}`;
  const text =
    `매운맛 밸런스게임\n` +
    `${question.choiceA.text} vs ${question.choiceB.text}\n` +
    `너는 어느 쪽?\n${url}`;

  log(`share: webShareAPI=${!!navigator.share}, android=${isAndroid()}`);

  // ── 전략 1: Web Share API (iOS WebView, Chrome 등) ─────────
  if (navigator.share) {
    try {
      await navigator.share({ title: '매운맛 밸런스게임', text, url });
      log('web-share SUCCESS');
      return { ok: true, method: 'web-share' };
    } catch (e) {
      log(`web-share: ${e?.name}: ${e?.message}`);
      if (e?.name === 'AbortError') return { ok: false, cancelled: true };
    }
  }

  // ── 전략 2 (Android): intent URL로 시스템 공유 시트 트리거 ──
  // Android WebView에서는 navigator.share 미지원 →
  // intent:// URL을 iframe으로 열어 시스템에 ACTION_SEND 요청
  if (isAndroid()) {
    try {
      const intentUrl =
        `intent:#Intent;` +
        `action=android.intent.action.SEND;` +
        `type=text/plain;` +
        `S.android.intent.extra.TEXT=${encodeURIComponent(text)};end`;

      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = intentUrl;
      document.body.appendChild(iframe);
      setTimeout(() => iframe.remove(), 2000);

      log('intent iframe triggered');
      // intent 처리 여부를 JS에서 확인 불가 → 'maybe'로 반환
      return { ok: true, method: 'intent', uncertain: true };
    } catch (e) {
      log(`intent FAIL: ${e?.message || String(e)}`);
    }
  }

  log('all share methods failed');
  return { ok: false };
}

// ── 링크 복사 ──────────────────────────────────────────────
export async function shareClipboard(question) {
  const url = `${APP_URL}?q=${question.id}`;

  // 1. 브라우저 Clipboard API
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch (e) {
    log(`clipboard(browser) FAIL: ${e?.message || String(e)}`);
  }

  // 2. execCommand fallback (구형 WebView)
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
    log(`clipboard(exec) FAIL: ${e?.message || String(e)}`);
    return false;
  }
}
