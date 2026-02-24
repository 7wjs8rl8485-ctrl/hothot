export const CATEGORIES = {
  all:    { label: '전체',      emoji: '🔥' },
  dating: { label: '연애/결혼', emoji: '💕' },
  work:   { label: '직장/돈',   emoji: '💰' },
  daily:  { label: '일상/병맛', emoji: '🤪' },
};

export const questions = [
  // 연애/결혼
  {
    id: 'q001',
    category: 'dating',
    choiceA: { text: '바람피웠지만 평생 비밀로 하는 연인', emoji: '🤫' },
    choiceB: { text: '바람 안 피지만 극심한 질투를 하는 연인', emoji: '😤' },
  },
  {
    id: 'q002',
    category: 'dating',
    choiceA: { text: '월 200 버는 내 이상형', emoji: '💘' },
    choiceB: { text: '월 2000 버는 내가 싫어하는 스타일', emoji: '💸' },
  },
  {
    id: 'q003',
    category: 'dating',
    choiceA: { text: '첫사랑과 재회해서 결혼', emoji: '🥹' },
    choiceB: { text: '소개팅에서 만난 완벽한 조건의 상대와 결혼', emoji: '💍' },
  },
  {
    id: 'q004',
    category: 'dating',
    choiceA: { text: '연인의 핸드폰을 보는 것', emoji: '📱' },
    choiceB: { text: '연인이 내 핸드폰을 보는 것', emoji: '😰' },
  },
  {
    id: 'q005',
    category: 'dating',
    choiceA: { text: '매일 싸우지만 화해 후 더 달달한 연인', emoji: '🎢' },
    choiceB: { text: '절대 안 싸우지만 늘 심심한 연인', emoji: '😐' },
  },
  {
    id: 'q006',
    category: 'dating',
    choiceA: { text: '10년 사귄 연인에게 차이기', emoji: '💔' },
    choiceB: { text: '결혼 직전에 상대의 비밀 알게 되기', emoji: '😱' },
  },
  {
    id: 'q007',
    category: 'dating',
    choiceA: { text: '얼굴은 내 스타일인데 성격 최악', emoji: '😍' },
    choiceB: { text: '성격은 완벽한데 외모가 내 취향 아님', emoji: '🤝' },
  },
  {
    id: 'q008',
    category: 'dating',
    choiceA: { text: '전 애인이 나보다 잘 되기', emoji: '📈' },
    choiceB: { text: '전 애인이 나한테 연락 오기', emoji: '📲' },
  },

  // 직장/돈
  {
    id: 'q009',
    category: 'work',
    choiceA: { text: '왕복 4시간, 연봉 6천', emoji: '🚇' },
    choiceB: { text: '걸어서 10분, 연봉 3천', emoji: '🚶' },
  },
  {
    id: 'q010',
    category: 'work',
    choiceA: { text: '평생 100억 받고 스마트폰/인터넷 없이 살기', emoji: '🏝️' },
    choiceB: { text: '그냥 지금처럼 살기', emoji: '📱' },
  },
  {
    id: 'q011',
    category: 'work',
    choiceA: { text: '하고 싶은 일 연봉 2천', emoji: '🎨' },
    choiceB: { text: '하기 싫은 일 연봉 8천', emoji: '😩' },
  },
  {
    id: 'q012',
    category: 'work',
    choiceA: { text: '칼퇴근인데 상사가 최악', emoji: '👹' },
    choiceB: { text: '야근 매일인데 동료가 최고', emoji: '🌙' },
  },
  {
    id: 'q013',
    category: 'work',
    choiceA: { text: '월급 안 오르고 10년 정년 보장', emoji: '🔒' },
    choiceB: { text: '매년 연봉 20% 인상인데 언제 잘릴지 모름', emoji: '📊' },
  },
  {
    id: 'q014',
    category: 'work',
    choiceA: { text: '로또 50억 당첨', emoji: '🎰' },
    choiceB: { text: '내가 만든 사업으로 50억 벌기', emoji: '🚀' },
  },
  {
    id: 'q015',
    category: 'work',
    choiceA: { text: '평생 주 4일 근무', emoji: '🏖️' },
    choiceB: { text: '연봉 2배로 올려주기', emoji: '💰' },
  },
  {
    id: 'q016',
    category: 'work',
    choiceA: { text: '재택근무인데 24시간 대기', emoji: '🏠' },
    choiceB: { text: '출근하지만 퇴근 후 완전 자유', emoji: '🏢' },
  },

  // 일상/병맛
  {
    id: 'q017',
    category: 'daily',
    choiceA: { text: '평생 탄산음료 못 마시기', emoji: '🥤' },
    choiceB: { text: '평생 라면 못 먹기', emoji: '🍜' },
  },
  {
    id: 'q018',
    category: 'daily',
    choiceA: { text: '눈 뜨고 재채기하기', emoji: '🤧' },
    choiceB: { text: '입 열고 양치하기', emoji: '🪥' },
  },
  {
    id: 'q019',
    category: 'daily',
    choiceA: { text: '평생 여름만 사는 나라', emoji: '☀️' },
    choiceB: { text: '평생 겨울만 사는 나라', emoji: '❄️' },
  },
  {
    id: 'q020',
    category: 'daily',
    choiceA: { text: '평생 치킨 못 먹기', emoji: '🍗' },
    choiceB: { text: '평생 피자 못 먹기', emoji: '🍕' },
  },
  {
    id: 'q021',
    category: 'daily',
    choiceA: { text: '투명인간 되는 능력', emoji: '👻' },
    choiceB: { text: '하늘을 나는 능력', emoji: '🦅' },
  },
  {
    id: 'q022',
    category: 'daily',
    choiceA: { text: '과거로 돌아가기 (변경 불가)', emoji: '⏪' },
    choiceB: { text: '미래 1시간만 미리 보기', emoji: '⏩' },
  },
  {
    id: 'q023',
    category: 'daily',
    choiceA: { text: '평생 엘리베이터 못 타기', emoji: '🪜' },
    choiceB: { text: '평생 에스컬레이터 못 타기', emoji: '🚶‍♂️' },
  },
  {
    id: 'q024',
    category: 'daily',
    choiceA: { text: '모든 꿈을 기억하기', emoji: '💭' },
    choiceB: { text: '원하는 꿈을 꾸기', emoji: '🌈' },
  },
  {
    id: 'q025',
    category: 'daily',
    choiceA: { text: '평생 매운 음식만 먹기', emoji: '🌶️' },
    choiceB: { text: '평생 단 음식만 먹기', emoji: '🍰' },
  },
  {
    id: 'q026',
    category: 'daily',
    choiceA: { text: '10년 전 나에게 편지 보내기', emoji: '✉️' },
    choiceB: { text: '10년 후 나에게서 편지 받기', emoji: '📬' },
  },
  {
    id: 'q027',
    category: 'daily',
    choiceA: { text: '좀비 아포칼립스에서 살아남기', emoji: '🧟' },
    choiceB: { text: '무인도에서 1년 살기', emoji: '🏝️' },
  },
  {
    id: 'q028',
    category: 'daily',
    choiceA: { text: '평생 배달음식 못 시키기', emoji: '🛵' },
    choiceB: { text: '평생 외식 못 하기', emoji: '🍽️' },
  },
];
