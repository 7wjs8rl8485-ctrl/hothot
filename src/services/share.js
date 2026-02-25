import {
  share as tossShare,
  setClipboardText,
  openURL,
} from '@apps-in-toss/web-bridge';

const APP_URL = typeof window !== 'undefined' ? window.location.origin : '';

// ── 디버그 로그 (화면에 표시 가능) ──────────────────────────
const _logs = [];
function log(msg) {
  const ts = new Date().toLocaleTimeString('ko-KR', { hour12: false });
  _logs.push(`[${ts}] ${msg}`);
  console.log('[share]', msg);
}
export function getShareDebugLogs() {
  return [..._logs];
}

// ── 유틸리티 ─────────────────────────────────────────────────
function isTossEnv() {
  return typeof window !== 'undefined' && !!window.__granite_bridge__;
}

function isAndroid() {
  return /android/i.test(navigator.userAgent);
}

function getPlatformSafe() {
  try {
    const map = window.__CONSTANT_HANDLER_MAP;
    if (map && 'getPlatformOS' in map) return map.getPlatformOS;
  } catch { /* constantBridge unavailable */ }
  return isAndroid() ? 'android' : 'ios';
}

/** Promise에 타임아웃 추가 — 네이티브가 응답하지 않으면 hang 방지 */
function withTimeout(promise, ms) {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error(`timeout:${ms}ms`)), ms);
    }),
  ]).finally(() => clearTimeout(timer));
}

// ── 공유하기 (네이티브 공유 시트) ─────────────────────────────
export async function shareGeneric(question) {
  const url = `${APP_URL}?q=${question.id}`;
  const text =
    `매운맛 밸런스게임\n` +
    `${question.choiceA.text} vs ${question.choiceB.text}\n` +
    `너는 어느 쪽?\n${url}`;

  const inToss = isTossEnv();
  const hasRNWV = typeof window !== 'undefined' && !!window.ReactNativeWebView;
  const platform = getPlatformSafe();
  log(`env: toss=${inToss}, RNWV=${hasRNWV}, platform=${platform}`);

  // ── 전략 1: Toss SDK share (공식 API) ──────────────────────
  if (inToss && hasRNWV) {
    try {
      log('1) tossShare({ message })...');
      await withTimeout(tossShare({ message: text }), 5000);
      log('1) SUCCESS');
      return { ok: true, method: 'toss-share' };
    } catch (e) {
      const errMsg = e?.message || String(e);
      log(`1) FAIL: ${errMsg}`);
    }

    // ── 전략 2 (Android): intent URL via openURL ─────────────
    // openURL은 React Native Linking.openURL 사용 — Android intent URL 가능
    if (platform === 'android') {
      try {
        const intentUrl =
          `intent:#Intent;` +
          `action=android.intent.action.SEND;` +
          `type=text/plain;` +
          `S.android.intent.extra.TEXT=${encodeURIComponent(text)};end`;
        log('2) openURL(intent://)...');
        await withTimeout(openURL(intentUrl), 3000);
        log('2) SUCCESS');
        return { ok: true, method: 'intent-url' };
      } catch (e) {
        log(`2) FAIL: ${e?.message || String(e)}`);
      }
    }
  }

  // ── 전략 3: Web Share API (일반 브라우저) ───────────────────
  if (navigator.share) {
    try {
      log('3) navigator.share...');
      await navigator.share({ title: '매운맛 밸런스게임', text, url });
      log('3) SUCCESS');
      return { ok: true, method: 'web-share' };
    } catch (e) {
      log(`3) FAIL: ${e?.message || String(e)}`);
      return { ok: false, error: e?.message };
    }
  }

  log('ALL share strategies exhausted');
  return { ok: false, error: 'no-share-available' };
}

// ── 링크 복사 ──────────────────────────────────────────────
export async function shareClipboard(question) {
  const url = `${APP_URL}?q=${question.id}`;

  // 1. Toss SDK 클립보드
  try {
    await setClipboardText(url);
    return true;
  } catch (e) {
    log(`clipboard(toss) FAIL: ${e?.message || String(e)}`);
  }

  // 2. 브라우저 Clipboard API
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch (e) {
    log(`clipboard(browser) FAIL: ${e?.message || String(e)}`);
    return false;
  }
}
