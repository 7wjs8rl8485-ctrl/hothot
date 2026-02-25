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

function waitForKakaoSDK(timeout = 3000) {
  return new Promise((resolve) => {
    if (window.Kakao) return resolve(true);
    const start = Date.now();
    const check = setInterval(() => {
      if (window.Kakao) { clearInterval(check); resolve(true); }
      else if (Date.now() - start > timeout) { clearInterval(check); resolve(false); }
    }, 100);
  });
}

function kakaoShareFallback(question) {
  const url = `${APP_URL}?q=${question.id}`;
  const text = `매운맛 밸런스게임\n${question.choiceA.text} vs ${question.choiceB.text}\n너는 어느 쪽?`;
  if (navigator.share) {
    navigator.share({ title: '매운맛 밸런스게임', text, url }).catch(() => {});
  } else {
    navigator.clipboard.writeText(`${text}\n${url}`).catch(() => {});
  }
}

export async function shareKakao(question) {
  const sdkLoaded = await waitForKakaoSDK();
  if (!sdkLoaded) {
    kakaoShareFallback(question);
    return false;
  }

  if (!window.Kakao.isInitialized()) {
    const key = import.meta.env.VITE_KAKAO_JS_KEY || '4dfd6e5647ece15632391528e234b136';
    window.Kakao.init(key);
  }

  const url = `${APP_URL}?q=${question.id}`;

  try {
    await window.Kakao.Share.sendDefault({
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
    return true;
  } catch (err) {
    console.warn('Kakao share error:', err);
    kakaoShareFallback(question);
    return false;
  }
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
