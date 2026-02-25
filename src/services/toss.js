import { closeView, getUserKeyForGame, setIosSwipeGestureEnabled, share as nativeShare } from '@apps-in-toss/web-bridge';

// 토스 앱 내 WebView 환경인지 감지
export function isTossEnv() {
  try {
    if (typeof window === 'undefined') return false;
    // __granite_bridge__ 또는 ReactNativeWebView 존재 시 토스 환경
    return !!window.__granite_bridge__ || !!window.ReactNativeWebView;
  } catch {
    return false;
  }
}

// 미니앱 닫기
export async function closeMiniApp() {
  try {
    await closeView();
  } catch (err) {
    console.warn('closeView error:', err);
  }
}

// 유저 키 조회 (게임용)
export async function getTossUserKey() {
  try {
    const result = await getUserKeyForGame();
    if (result && typeof result === 'object' && result.type === 'HASH') {
      return result.hash;
    }
    return null;
  } catch {
    return null;
  }
}

// 토스 네이티브 공유 시트 (타임아웃 포함)
export async function tossShare(message) {
  try {
    // 네이티브 공유 시트가 열리면 resolve 안 올 수 있으므로 타임아웃 처리
    // 타임아웃 = 공유 시트가 열렸다고 간주 (성공)
    await Promise.race([
      nativeShare({ message }),
      new Promise(resolve => setTimeout(resolve, 3000)),
    ]);
    return true;
  } catch (err) {
    console.warn('tossShare error:', err);
    return false;
  }
}

// iOS 스와이프 뒤로가기 비활성화
export async function disableSwipeBack() {
  try {
    await setIosSwipeGestureEnabled({ isEnabled: false });
  } catch {
    // 비토스 환경에서는 무시
  }
}
