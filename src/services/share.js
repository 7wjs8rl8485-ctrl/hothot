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

export async function shareNative(question, percentA, percentB) {
  const text = `매운맛 밸런스게임\n\n` +
    `A: ${question.choiceA.text} (${percentA}%)\n` +
    `B: ${question.choiceB.text} (${percentB}%)\n\n` +
    `너는 어느 쪽?`;

  const url = `${APP_URL}?q=${question.id}`;

  if (navigator.share) {
    try {
      await navigator.share({ title: '매운맛 밸런스게임', text, url });
      return true;
    } catch (err) {
      // User cancelled or error
      if (err.name !== 'AbortError') console.warn('Share error:', err);
      return false;
    }
  }
  return false;
}

export async function shareKakao(question) {
  const url = `${APP_URL}?q=${question.id}`;

  // 카카오 SDK — 리치 카드 (이미지 + 제목 + 버튼) 공유
  if (ensureKakaoInit()) {
    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '매운맛 밸런스게임',
          description: `${question.choiceA.text} vs ${question.choiceB.text}\n너는 어느 쪽?`,
          imageUrl: `${APP_URL}/og-image.png`,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        buttons: [
          {
            title: '나도 투표하기',
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        ],
      });
      return true;
    } catch (err) {
      console.warn('Kakao share failed:', err);
    }
  }

  // Fallback: navigator.share
  const text = `매운맛 밸런스게임\n${question.choiceA.text} vs ${question.choiceB.text}\n너는 어느 쪽?`;
  if (navigator.share) {
    try {
      await navigator.share({ title: '매운맛 밸런스게임', text, url });
      return true;
    } catch {
      return false;
    }
  }

  // Fallback: 클립보드 복사
  try {
    await navigator.clipboard.writeText(`${text}\n${url}`);
  } catch {}
  return false;
}

export async function shareClipboard(question) {
  const url = `${APP_URL}?q=${question.id}`;
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}
