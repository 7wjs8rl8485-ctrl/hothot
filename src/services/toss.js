import { closeView, getUserKeyForGame, setIosSwipeGestureEnabled } from '@apps-in-toss/web-bridge';

// 토스 앱 내 WebView 환경인지 감지
export function isTossEnv() {
  try {
    // web-bridge는 토스 앱 WebView에서만 정상 동작
    return typeof window !== 'undefined' && !!window.__granite_bridge__;
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

// iOS 스와이프 뒤로가기 비활성화
export async function disableSwipeBack() {
  try {
    await setIosSwipeGestureEnabled({ isEnabled: false });
  } catch {
    // 비토스 환경에서는 무시
  }
}
