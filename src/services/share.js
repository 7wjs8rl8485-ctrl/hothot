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

  log(`webShareAPI=${!!navigator.share}, android=${isAndroid()}`);

  // ── 전략 1: Web Share API (iOS, Chrome standalone) ─────────
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

  // ── 전략 2 (Android WebView): intent URL → <a> click ──────
  // iframe은 WebView의 shouldOverrideUrlLoading을 트리거하지 못함
  // <a>.click()은 실제 네비게이션으로 처리되어 intent 핸들링 가능
  if (isAndroid()) {
    const intentUrl =
      `intent://send/#Intent;` +
      `action=android.intent.action.SEND;` +
      `type=text/plain;` +
      `S.android.intent.extra.TEXT=${encodeURIComponent(text)};end`;

    try {
      log('intent: <a>.click...');
      const a = document.createElement('a');
      a.href = intentUrl;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
      log('intent: <a>.click done');
      return { ok: true, method: 'intent', uncertain: true };
    } catch (e) {
      log(`intent(a): ${e?.message}`);
    }
  }

  log('all methods failed');
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
