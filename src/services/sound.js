const sounds = {};
let muted = localStorage.getItem('muted') === 'true';
let bgm = null;
let userInteracted = false;
let bgmWasPlaying = false;

const SFX_LIST = ['vote', 'result', 'reaction', 'next', 'category', 'finish', 'modal'];

export function initSounds() {
  SFX_LIST.forEach(name => {
    sounds[name] = new Audio(`/sounds/${name}.mp3`);
    sounds[name].preload = 'auto';
    sounds[name].volume = 0.5;
  });

  bgm = new Audio('/sounds/bgm.mp3');
  bgm.loop = true;
  bgm.volume = 0.3;
  bgm.preload = 'auto';

  // 백그라운드 전환 시 사운드 즉시 종료, 복귀 시 재개
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      bgmWasPlaying = bgm && !bgm.paused;
      if (bgm && !bgm.paused) bgm.pause();
      SFX_LIST.forEach(name => {
        if (sounds[name]) {
          sounds[name].pause();
          sounds[name].currentTime = 0;
        }
      });
    } else {
      if (!muted && bgmWasPlaying && bgm) {
        bgm.play().catch(() => {});
      }
    }
  });
}

export function playSfx(name) {
  if (muted || !sounds[name]) return;
  sounds[name].currentTime = 0;
  sounds[name].play().catch(() => {});
}

export function startBgm() {
  if (muted || !bgm || userInteracted) return;
  userInteracted = true;
  bgm.play().catch(() => {});
}

export function toggleMute() {
  muted = !muted;
  localStorage.setItem('muted', String(muted));
  if (muted) {
    if (bgm) bgm.pause();
  } else if (bgm && userInteracted) {
    bgm.play().catch(() => {});
  }
  return muted;
}

export function isMuted() {
  return muted;
}
