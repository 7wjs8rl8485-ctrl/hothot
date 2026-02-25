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

function isAndroid() {
  return /android/i.test(navigator.userAgent);
}

// ── Android intent URL로 시스템 공유 시트 열기 ───────────────
function triggerAndroidShare(text) {
  const intentUrl =
    `intent://send/#Intent;` +
    `action=android.intent.action.SEND;` +
    `type=text/plain;` +
    `S.android.intent.extra.TEXT=${encodeURIComponent(text)};end`;

  log(`intent: ${intentUrl.substring(0, 80)}...`);
  window.location.href = intentUrl;
}

// ── 공유하기 ────────────────────────────────────────────────
// 1. navigator.share (iOS, Chrome)
// 2. Android intent URL (시스템 공유 시트)
// 3. fallback → 클립보드 복사
export async function shareAction(question) {
  const url = `${APP_URL}?q=${question.id}`;
  const text =
    `매운맛 밸런스게임\n` +
    `${question.choiceA.text} vs ${question.choiceB.text}\n` +
    `너는 어느 쪽?\n${url}`;

  log(`navigator.share=${!!navigator.share}, android=${isAndroid()}`);

  // 전략 1: Web Share API (iOS, 일반 브라우저)
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

  // 전략 2: Android intent URL → 시스템 공유 시트
  if (isAndroid()) {
    // 클립보드에 미리 복사 (intent 실패 대비 백업)
    await copyToClipboard(url);
    log('intent: clipboard backup done');

    try {
      triggerAndroidShare(text);
      log('intent: triggered');
      return { ok: true };
    } catch (e) {
      log(`intent error: ${e?.message}`);
    }
  }

  // 전략 3: 최종 fallback — 클립보드 복사
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
