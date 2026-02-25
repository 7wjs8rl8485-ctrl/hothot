const APP_URL = typeof window !== 'undefined' ? window.location.origin : '';

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

function ensureKakaoInit() {
  if (!window.Kakao) return false;
  if (!window.Kakao.isInitialized()) {
    const key = import.meta.env.VITE_KAKAO_JS_KEY || '4dfd6e5647ece15632391528e234b136';
    window.Kakao.init(key);
  }
  return true;
}

export async function shareKakao(question) {
  const url = `${APP_URL}?q=${question.id}`;

  // 1차: Kakao SDK sendDefault 시도
  if (ensureKakaoInit()) {
    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '매운맛 밸런스게임',
          description: `${question.choiceA.text} vs ${question.choiceB.text}`,
          imageUrl: `${APP_URL}/og-image.png`,
          imageWidth: 1200,
          imageHeight: 630,
          link: { mobileWebUrl: url, webUrl: url },
        },
        buttons: [
          {
            title: '나도 투표하기',
            link: { mobileWebUrl: url, webUrl: url },
          },
        ],
      });

      // sendDefault는 비동기가 아님 — intent 발생 후 바로 리턴
      // 안드로이드 인앱 브라우저에서 intent가 차단되면 아무 반응 없음
      // 1.5초 대기 후 페이지가 아직 visible이면 실패로 간주 → fallback
      const didLeave = await new Promise((resolve) => {
        const onHide = () => { resolve(true); };
        document.addEventListener('visibilitychange', onHide, { once: true });
        setTimeout(() => {
          document.removeEventListener('visibilitychange', onHide);
          resolve(false);
        }, 1500);
      });

      if (didLeave) return true;
    } catch (err) {
      console.warn('Kakao SDK error:', err);
    }
  }

  // 2차 fallback: navigator.share (안드로이드 네이티브 공유 시트)
  const text = `매운맛 밸런스게임\n${question.choiceA.text} vs ${question.choiceB.text}\n너는 어느 쪽?`;
  if (navigator.share) {
    try {
      await navigator.share({ title: '매운맛 밸런스게임', text, url });
      return true;
    } catch {
      // 사용자 취소
    }
  }

  // 3차 fallback: 클립보드 복사
  try {
    await navigator.clipboard.writeText(`${text}\n${url}`);
  } catch {
    // ignore
  }
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
