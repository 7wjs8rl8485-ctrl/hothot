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

// ── 환경 감지 ───────────────────────────────────────────────
export function canNativeShare() {
  return typeof navigator !== 'undefined' && !!navigator.share;
}

// ── 공유하기 ────────────────────────────────────────────────
// iOS: navigator.share → 네이티브 공유 시트
// Android WebView: 링크 복사 + 안내 (네이티브 공유 불가)
export async function shareAction(question) {
  const url = `${APP_URL}?q=${question.id}`;
  const text =
    `매운맛 밸런스게임\n` +
    `${question.choiceA.text} vs ${question.choiceB.text}\n` +
    `너는 어느 쪽?\n${url}`;

  log(`navigator.share=${!!navigator.share}`);

  // iOS — 네이티브 공유 시트
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

  // Android WebView — 링크 복사 fallback
  log('fallback: clipboard');
  const copied = await copyToClipboard(url);
  return { ok: false, copied };
}

// ── 링크 복사 ──────────────────────────────────────────────
export async function shareClipboard(question) {
  const url = `${APP_URL}?q=${question.id}`;
  return copyToClipboard(url);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    log(`clip(browser): ${e?.message}`);
  }

  try {
    const ta = document.createElement('textarea');
    ta.value = text;
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
