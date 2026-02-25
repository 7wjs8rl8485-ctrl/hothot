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

export async function shareKakao(question) {
  const url = `${APP_URL}?q=${question.id}`;
  const text = `매운맛 밸런스게임\n${question.choiceA.text} vs ${question.choiceB.text}\n너는 어느 쪽?`;

  // navigator.share 사용 — 공유 시트에서 카카오톡 선택 가능
  if (navigator.share) {
    try {
      await navigator.share({ title: '매운맛 밸런스게임', text, url });
      return true;
    } catch {
      return false;
    }
  }

  // fallback: 클립보드 복사
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
