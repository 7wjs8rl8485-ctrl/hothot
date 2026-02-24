export const CATEGORIES = {
  all:    { label: '전체',   emoji: '🔥' },
  dating: { label: '연애',   emoji: '💕' },
  work:   { label: '직장/돈', emoji: '💰' },
  daily:  { label: '일상',   emoji: '☕' },
  crazy:  { label: '병맛',   emoji: '🤪' },
};

export const ROUND_SIZE = 5;

export const questions = [
  // ═══════════════════════════════════════
  // ── 연애 (40개) ──
  // ═══════════════════════════════════════

  // -- 바람/신뢰 --
  {
    id: 'q001',
    category: 'dating',
    choiceA: { text: '바람피웠지만 평생 비밀로 하는 연인', emoji: '🤫' },
    choiceB: { text: '바람 안 피지만 극심한 질투를 하는 연인', emoji: '😤' },
  },
  {
    id: 'q052',
    category: 'dating',
    choiceA: { text: '연인이 나 몰래 전 애인 만남', emoji: '🕵️' },
    choiceB: { text: '연인이 나 몰래 이성 친구와 여행', emoji: '✈️' },
  },
  {
    id: 'q054',
    category: 'dating',
    choiceA: { text: '연인 카톡에서 썸녀/썸남 발견', emoji: '💬' },
    choiceB: { text: '연인 카톡에서 나 욕하는 대화 발견', emoji: '🤬' },
  },
  {
    id: 'q100',
    category: 'dating',
    choiceA: { text: '연인이 매일 이성한테 좋아요 누름', emoji: '❤️' },
    choiceB: { text: '연인이 전 애인 사진 몰래 저장', emoji: '📂' },
  },

  // -- 돈/조건 --
  {
    id: 'q002',
    category: 'dating',
    choiceA: { text: '월 200 버는 내 이상형', emoji: '💘' },
    choiceB: { text: '월 2000 버는 내가 싫어하는 스타일', emoji: '💸' },
  },
  {
    id: 'q062',
    category: 'dating',
    choiceA: { text: '데이트 비용 항상 내가 전액', emoji: '💳' },
    choiceB: { text: '데이트 비용 항상 1원 단위까지 더치', emoji: '🧮' },
  },
  {
    id: 'q101',
    category: 'dating',
    choiceA: { text: '연인이 빚 3억 (성실히 갚는 중)', emoji: '📉' },
    choiceB: { text: '연인이 부자인데 나한테 한 푼도 안 씀', emoji: '🤑' },
  },

  // -- 외모/성격 --
  {
    id: 'q007',
    category: 'dating',
    choiceA: { text: '얼굴은 내 스타일인데 성격 최악', emoji: '😍' },
    choiceB: { text: '성격은 완벽한데 외모가 내 취향 아님', emoji: '🤝' },
  },
  {
    id: 'q102',
    category: 'dating',
    choiceA: { text: '만날 때마다 3시간 늦는 연인', emoji: '⏰' },
    choiceB: { text: '만날 때마다 30분 일찍 와서 눈치 주는 연인', emoji: '👀' },
  },
  {
    id: 'q103',
    category: 'dating',
    choiceA: { text: '엄청 웃긴데 진지한 대화 불가', emoji: '🤣' },
    choiceB: { text: '진지한 대화는 최고인데 유머 제로', emoji: '🧐' },
  },

  // -- 전 애인 --
  {
    id: 'q008',
    category: 'dating',
    choiceA: { text: '전 애인이 나보다 잘 되기', emoji: '📈' },
    choiceB: { text: '전 애인이 나한테 연락 오기', emoji: '📲' },
  },
  {
    id: 'q049',
    category: 'dating',
    choiceA: { text: '연인이 전 애인 이름으로 나를 부름', emoji: '😶' },
    choiceB: { text: '내가 연인 부모님 앞에서 전 애인 이름 부름', emoji: '🫣' },
  },
  {
    id: 'q057',
    category: 'dating',
    choiceA: { text: '헤어진 날 전 애인 SNS에 새 연인 등장', emoji: '📱' },
    choiceB: { text: '헤어지고 1년 후 전 애인이 결혼 발표', emoji: '💒' },
  },
  {
    id: 'q058',
    category: 'dating',
    choiceA: { text: '연인이 나보다 전 애인 사진을 더 많이 간직', emoji: '🖼️' },
    choiceB: { text: '연인이 아직도 전 애인 선물을 사용 중', emoji: '🎁' },
  },
  {
    id: 'q064',
    category: 'dating',
    choiceA: { text: '결혼식에서 전 애인과 마주침', emoji: '😨' },
    choiceB: { text: '신혼여행지에서 전 애인과 마주침', emoji: '🏝️' },
  },
  {
    id: 'q104',
    category: 'dating',
    choiceA: { text: '전 애인이 내 절친과 사귀기 시작', emoji: '😵' },
    choiceB: { text: '내가 전 애인 친구를 좋아하게 됨', emoji: '🫠' },
  },

  // -- 관계 스타일 --
  {
    id: 'q003',
    category: 'dating',
    choiceA: { text: '첫사랑과 재회해서 결혼', emoji: '🥹' },
    choiceB: { text: '소개팅에서 만난 완벽한 조건의 상대와 결혼', emoji: '💍' },
  },
  {
    id: 'q005',
    category: 'dating',
    choiceA: { text: '매일 싸우지만 화해 후 더 달달한 연인', emoji: '🎢' },
    choiceB: { text: '절대 안 싸우지만 늘 심심한 연인', emoji: '😐' },
  },
  {
    id: 'q053',
    category: 'dating',
    choiceA: { text: '평생 장거리 연애만 하기', emoji: '🌏' },
    choiceB: { text: '평생 같은 집에서 동거만 하기', emoji: '🏠' },
  },
  {
    id: 'q055',
    category: 'dating',
    choiceA: { text: '100일마다 무조건 큰 싸움', emoji: '💥' },
    choiceB: { text: '기념일을 절대 안 챙기는 연인', emoji: '📅' },
  },
  {
    id: 'q060',
    category: 'dating',
    choiceA: { text: '매일 "사랑해" 100번 말해야 하는 연인', emoji: '💌' },
    choiceB: { text: '1년에 한 번도 "사랑해" 안 하는 연인', emoji: '🧊' },
  },
  {
    id: 'q105',
    category: 'dating',
    choiceA: { text: '연인이 나한테 존댓말만 씀', emoji: '🙏' },
    choiceB: { text: '연인이 처음부터 "야" 라고 부름', emoji: '😎' },
  },
  {
    id: 'q106',
    category: 'dating',
    choiceA: { text: '스킨십 엄청 좋아하는데 밖에서도 함', emoji: '🫂' },
    choiceB: { text: '집에서도 밖에서도 스킨십 제로', emoji: '🧱' },
  },

  // -- 극한 상황 --
  {
    id: 'q004',
    category: 'dating',
    choiceA: { text: '연인의 핸드폰을 보는 것', emoji: '📱' },
    choiceB: { text: '연인이 내 핸드폰을 보는 것', emoji: '😰' },
  },
  {
    id: 'q006',
    category: 'dating',
    choiceA: { text: '10년 사귄 연인에게 차이기', emoji: '💔' },
    choiceB: { text: '결혼 직전에 상대의 비밀 알게 되기', emoji: '😱' },
  },
  {
    id: 'q050',
    category: 'dating',
    choiceA: { text: '연인의 절친이 나를 대놓고 싫어함', emoji: '🙄' },
    choiceB: { text: '내 절친이 연인을 대놓고 싫어함', emoji: '😬' },
  },
  {
    id: 'q051',
    category: 'dating',
    choiceA: { text: '키스를 못하는 연인', emoji: '🚫' },
    choiceB: { text: '손을 못 잡는 연인', emoji: '🤚' },
  },
  {
    id: 'q056',
    category: 'dating',
    choiceA: { text: '연인이 코골이가 진짜 심함', emoji: '😴' },
    choiceB: { text: '연인이 잠꼬대로 비밀을 말함', emoji: '🗣️' },
  },
  {
    id: 'q059',
    category: 'dating',
    choiceA: { text: '사귀자마자 부모님 인사', emoji: '👨‍👩‍👦' },
    choiceB: { text: '3년 사귀어도 친구 소개 안 해줌', emoji: '🤷' },
  },
  {
    id: 'q061',
    category: 'dating',
    choiceA: { text: '연인이 나 빼고 이성 단체 여행', emoji: '🏖️' },
    choiceB: { text: '연인이 나 빼고 전 애인 포함 모임', emoji: '🍻' },
  },
  {
    id: 'q063',
    category: 'dating',
    choiceA: { text: '연인의 아이돌 앨범 300장', emoji: '💿' },
    choiceB: { text: '연인의 피규어 컬렉션 방 한 칸', emoji: '🗄️' },
  },
  {
    id: 'q065',
    category: 'dating',
    choiceA: { text: '연인이 SNS에 우리 사진 절대 안 올림', emoji: '🔒' },
    choiceB: { text: '연인이 우리 싸운 것까지 전부 SNS에 올림', emoji: '📢' },
  },
  {
    id: 'q107',
    category: 'dating',
    choiceA: { text: '프러포즈 받는데 이름을 틀림', emoji: '💍' },
    choiceB: { text: '프러포즈 하는데 반지를 잃어버림', emoji: '🤦' },
  },
  {
    id: 'q108',
    category: 'dating',
    choiceA: { text: '연인이 나 닮은 사람한테 호감 표현', emoji: '👯' },
    choiceB: { text: '연인이 나랑 정반대 스타일한테 호감 표현', emoji: '🔄' },
  },
  {
    id: 'q109',
    category: 'dating',
    choiceA: { text: '싸울 때마다 엄마한테 다 말하는 연인', emoji: '📞' },
    choiceB: { text: '싸울 때마다 SNS에 올리는 연인', emoji: '🌐' },
  },
  {
    id: 'q110',
    category: 'dating',
    choiceA: { text: '연인이 나한테 관심 없는 척 함 (속은 좋아함)', emoji: '😏' },
    choiceB: { text: '연인이 너무 집착함 (5분마다 연락)', emoji: '📲' },
  },
  {
    id: 'q111',
    category: 'dating',
    choiceA: { text: '결혼 후 시/처부모님과 같은 집', emoji: '🏘️' },
    choiceB: { text: '결혼 후 배우자가 1년에 한 번만 만나자고 함', emoji: '🗓️' },
  },
  {
    id: 'q112',
    category: 'dating',
    choiceA: { text: '연인이 나보다 친구를 항상 우선시', emoji: '👫' },
    choiceB: { text: '연인이 친구 하나 없이 나한테만 올인', emoji: '🎯' },
  },
  {
    id: 'q113',
    category: 'dating',
    choiceA: { text: '내가 고백했는데 "생각해볼게" 3개월째', emoji: '⏳' },
    choiceB: { text: '상대가 고백했는데 내가 감정이 없음', emoji: '😐' },
  },

  // ═══════════════════════════════════════
  // ── 직장/돈 (40개) ──
  // ═══════════════════════════════════════

  // -- 연봉/조건 --
  {
    id: 'q009',
    category: 'work',
    choiceA: { text: '왕복 4시간, 연봉 6천', emoji: '🚇' },
    choiceB: { text: '걸어서 10분, 연봉 3천', emoji: '🚶' },
  },
  {
    id: 'q011',
    category: 'work',
    choiceA: { text: '하고 싶은 일 연봉 2천', emoji: '🎨' },
    choiceB: { text: '하기 싫은 일 연봉 8천', emoji: '😩' },
  },
  {
    id: 'q013',
    category: 'work',
    choiceA: { text: '월급 안 오르고 10년 정년 보장', emoji: '🔒' },
    choiceB: { text: '매년 연봉 20% 인상인데 언제 잘릴지 모름', emoji: '📊' },
  },
  {
    id: 'q015',
    category: 'work',
    choiceA: { text: '평생 주 4일 근무', emoji: '🏖️' },
    choiceB: { text: '연봉 2배로 올려주기', emoji: '💰' },
  },
  {
    id: 'q067',
    category: 'work',
    choiceA: { text: '연봉 1억인데 매일 상사한테 혼남', emoji: '😭' },
    choiceB: { text: '연봉 3천인데 회사에서 왕 대우', emoji: '👑' },
  },
  {
    id: 'q069',
    category: 'work',
    choiceA: { text: '월급 500 올려주고 주말 출근', emoji: '📆' },
    choiceB: { text: '월급 동결이지만 매일 2시 퇴근', emoji: '🕑' },
  },
  {
    id: 'q120',
    category: 'work',
    choiceA: { text: '연봉 5천에 점심 무한 제공', emoji: '🍱' },
    choiceB: { text: '연봉 6천에 점심 자비 + 구내식당 없음', emoji: '🍜' },
  },

  // -- 상사/동료 --
  {
    id: 'q012',
    category: 'work',
    choiceA: { text: '칼퇴근인데 상사가 최악', emoji: '👹' },
    choiceB: { text: '야근 매일인데 동료가 최고', emoji: '🌙' },
  },
  {
    id: 'q066',
    category: 'work',
    choiceA: { text: '상사가 매일 나한테만 반말', emoji: '😡' },
    choiceB: { text: '동료가 내 아이디어를 매번 자기 것처럼 발표', emoji: '🦊' },
  },
  {
    id: 'q074',
    category: 'work',
    choiceA: { text: '사장이 매일 퇴근 시간에 "잠깐만"', emoji: '⏰' },
    choiceB: { text: '사장이 주말마다 카톡 업무 지시', emoji: '📲' },
  },
  {
    id: 'q121',
    category: 'work',
    choiceA: { text: '상사가 내 SNS 팔로우 + 매일 체크', emoji: '🔍' },
    choiceB: { text: '동료가 내 뒤에서 항상 험담', emoji: '🗣️' },
  },
  {
    id: 'q122',
    category: 'work',
    choiceA: { text: '회의할 때 내 의견만 무시당함', emoji: '🙈' },
    choiceB: { text: '회의할 때 나한테만 질문 폭탄', emoji: '🎯' },
  },

  // -- 근무 환경 --
  {
    id: 'q016',
    category: 'work',
    choiceA: { text: '재택근무인데 24시간 대기', emoji: '🏠' },
    choiceB: { text: '출근하지만 퇴근 후 완전 자유', emoji: '🏢' },
  },
  {
    id: 'q071',
    category: 'work',
    choiceA: { text: '회사 화장실이 항상 만석', emoji: '🚽' },
    choiceB: { text: '회사 점심이 매일 같은 메뉴', emoji: '🍱' },
  },
  {
    id: 'q123',
    category: 'work',
    choiceA: { text: '에어컨 없는 사무실 (한여름)', emoji: '🥵' },
    choiceB: { text: '난방 없는 사무실 (한겨울)', emoji: '🥶' },
  },
  {
    id: 'q124',
    category: 'work',
    choiceA: { text: '회사 컴퓨터 부팅 10분', emoji: '🖥️' },
    choiceB: { text: '회사 와이파이 수시로 끊김', emoji: '📡' },
  },

  // -- 사건/사고 --
  {
    id: 'q073',
    category: 'work',
    choiceA: { text: '내 실수로 회사 서버 다운 (전 직원 알게 됨)', emoji: '💥' },
    choiceB: { text: '회의 중 실수로 사적인 화면 공유', emoji: '🖥️' },
  },
  {
    id: 'q070',
    category: 'work',
    choiceA: { text: '전 직장 상사가 새 직장 면접관', emoji: '😰' },
    choiceB: { text: '전 애인이 새 직장 동료', emoji: '💀' },
  },
  {
    id: 'q125',
    category: 'work',
    choiceA: { text: '전체 메일에 실수로 급여 명세서 첨부', emoji: '📧' },
    choiceB: { text: '사장에게 보내는 카톡을 단톡방에 전송', emoji: '💬' },
  },
  {
    id: 'q126',
    category: 'work',
    choiceA: { text: '발표 중 바지 지퍼 열려 있었음', emoji: '👖' },
    choiceB: { text: '거래처 미팅에서 상대 이름을 계속 틀림', emoji: '🏷️' },
  },

  // -- 돈/재테크 --
  {
    id: 'q010',
    category: 'work',
    choiceA: { text: '평생 100억 받고 스마트폰/인터넷 없이 살기', emoji: '🏝️' },
    choiceB: { text: '그냥 지금처럼 살기', emoji: '📱' },
  },
  {
    id: 'q014',
    category: 'work',
    choiceA: { text: '로또 50억 당첨', emoji: '🎰' },
    choiceB: { text: '내가 만든 사업으로 50억 벌기', emoji: '🚀' },
  },
  {
    id: 'q075',
    category: 'work',
    choiceA: { text: '코인으로 5억 벌고 세금 폭탄', emoji: '📊' },
    choiceB: { text: '부동산으로 5억 벌고 10년 묶임', emoji: '🏗️' },
  },
  {
    id: 'q077',
    category: 'work',
    choiceA: { text: '50억 있는데 아무한테도 말 못 함', emoji: '🤐' },
    choiceB: { text: '0원인데 모두가 내가 부자인 줄 앎', emoji: '🎭' },
  },
  {
    id: 'q072',
    category: 'work',
    choiceA: { text: '월급날 통장에 0원 찍힘 (다음 날 입금)', emoji: '📉' },
    choiceB: { text: '매달 월급이 랜덤 날짜에 들어옴', emoji: '🎲' },
  },
  {
    id: 'q127',
    category: 'work',
    choiceA: { text: '친구한테 빌려준 500만원 못 받기', emoji: '💸' },
    choiceB: { text: '부모님한테 빌린 500만원 갚으라고 재촉 받기', emoji: '📞' },
  },
  {
    id: 'q128',
    category: 'work',
    choiceA: { text: '월급 전부 주식에 올인 (반토막 가능)', emoji: '📈' },
    choiceB: { text: '평생 적금만 (물가 상승으로 실질 손해)', emoji: '🏦' },
  },

  // -- 커리어/선택 --
  {
    id: 'q068',
    category: 'work',
    choiceA: { text: '퇴사 후 6개월간 무직', emoji: '🛋️' },
    choiceB: { text: '평생 이 회사에서 버티기', emoji: '⛓️' },
  },
  {
    id: 'q076',
    category: 'work',
    choiceA: { text: '평생 알바만 (자유로움)', emoji: '🎒' },
    choiceB: { text: '평생 대기업 (안정적이지만 갈려나감)', emoji: '🏢' },
  },
  {
    id: 'q129',
    category: 'work',
    choiceA: { text: '꿈의 회사 합격인데 해외 발령', emoji: '🌏' },
    choiceB: { text: '별로인 회사인데 집 앞 + 고연봉', emoji: '🏘️' },
  },
  {
    id: 'q130',
    category: 'work',
    choiceA: { text: '30살에 은퇴 (대신 월 100만원만)', emoji: '🌴' },
    choiceB: { text: '60살에 은퇴 (대신 연금 월 500만원)', emoji: '👴' },
  },
  {
    id: 'q131',
    category: 'work',
    choiceA: { text: '평생 야근인데 성과급 2천만원', emoji: '🌃' },
    choiceB: { text: '평생 칼퇴인데 성과급 0원', emoji: '🌅' },
  },
  {
    id: 'q132',
    category: 'work',
    choiceA: { text: '내 사업 대박이지만 친구 다 잃음', emoji: '💰' },
    choiceB: { text: '내 사업 망했지만 친구들이 다 도와줌', emoji: '🤝' },
  },
  {
    id: 'q133',
    category: 'work',
    choiceA: { text: '회사에서 인정받지만 집에선 투명인간', emoji: '🏅' },
    choiceB: { text: '회사에선 투명인간이지만 집에선 영웅', emoji: '🦸' },
  },
  {
    id: 'q134',
    category: 'work',
    choiceA: { text: '매일 출근길에 무조건 비', emoji: '☔' },
    choiceB: { text: '매일 퇴근길에 무조건 정체', emoji: '🚗' },
  },
  {
    id: 'q135',
    category: 'work',
    choiceA: { text: '면접에서 방귀 뀌었는데 합격', emoji: '💨' },
    choiceB: { text: '완벽한 면접이었는데 불합격', emoji: '❌' },
  },
  {
    id: 'q136',
    category: 'work',
    choiceA: { text: '상사 험담하다 본인한테 들킴', emoji: '🫢' },
    choiceB: { text: '이력서 넣은 거 현 직장 상사가 발견', emoji: '📋' },
  },

  // ═══════════════════════════════════════
  // ── 일상 (30개) ──
  // ═══════════════════════════════════════

  // -- 음식 --
  {
    id: 'q017',
    category: 'daily',
    choiceA: { text: '평생 탄산음료 못 마시기', emoji: '🥤' },
    choiceB: { text: '평생 라면 못 먹기', emoji: '🍜' },
  },
  {
    id: 'q020',
    category: 'daily',
    choiceA: { text: '평생 치킨 못 먹기', emoji: '🍗' },
    choiceB: { text: '평생 피자 못 먹기', emoji: '🍕' },
  },
  {
    id: 'q025',
    category: 'daily',
    choiceA: { text: '평생 매운 음식만 먹기', emoji: '🌶️' },
    choiceB: { text: '평생 단 음식만 먹기', emoji: '🍰' },
  },
  {
    id: 'q028',
    category: 'daily',
    choiceA: { text: '평생 배달음식 못 시키기', emoji: '🛵' },
    choiceB: { text: '평생 외식 못 하기', emoji: '🍽️' },
  },
  {
    id: 'q080',
    category: 'daily',
    choiceA: { text: '평생 커피 못 마시기', emoji: '☕' },
    choiceB: { text: '평생 술 못 마시기', emoji: '🍺' },
  },
  {
    id: 'q140',
    category: 'daily',
    choiceA: { text: '평생 밥만 먹기 (반찬 없음)', emoji: '🍚' },
    choiceB: { text: '평생 반찬만 먹기 (밥 없음)', emoji: '🥗' },
  },
  {
    id: 'q141',
    category: 'daily',
    choiceA: { text: '평생 떡볶이 못 먹기', emoji: '🍡' },
    choiceB: { text: '평생 삼겹살 못 먹기', emoji: '🥓' },
  },

  // -- 생활 습관 --
  {
    id: 'q018',
    category: 'daily',
    choiceA: { text: '눈 뜨고 재채기하기', emoji: '🤧' },
    choiceB: { text: '입 열고 양치하기', emoji: '🪥' },
  },
  {
    id: 'q078',
    category: 'daily',
    choiceA: { text: '평생 찬물 샤워만', emoji: '🥶' },
    choiceB: { text: '평생 뜨거운 물 샤워만', emoji: '🥵' },
  },
  {
    id: 'q081',
    category: 'daily',
    choiceA: { text: '매일 아침 6시 기상 (주말 포함)', emoji: '⏰' },
    choiceB: { text: '매일 밤 10시 강제 취침', emoji: '😴' },
  },
  {
    id: 'q085',
    category: 'daily',
    choiceA: { text: '매일 30분 달리기', emoji: '🏃' },
    choiceB: { text: '매일 찬물 1분 샤워', emoji: '🚿' },
  },
  {
    id: 'q142',
    category: 'daily',
    choiceA: { text: '하루 4시간만 자도 피곤 안 함', emoji: '⚡' },
    choiceB: { text: '하루 10시간 자야 정상 컨디션', emoji: '🛏️' },
  },
  {
    id: 'q143',
    category: 'daily',
    choiceA: { text: '평생 목욕탕/사우나 못 가기', emoji: '♨️' },
    choiceB: { text: '평생 수영장/바다 못 가기', emoji: '🏊' },
  },

  // -- 환경/계절 --
  {
    id: 'q019',
    category: 'daily',
    choiceA: { text: '평생 여름만 사는 나라', emoji: '☀️' },
    choiceB: { text: '평생 겨울만 사는 나라', emoji: '❄️' },
  },
  {
    id: 'q023',
    category: 'daily',
    choiceA: { text: '평생 엘리베이터 못 타기', emoji: '🪜' },
    choiceB: { text: '평생 에스컬레이터 못 타기', emoji: '🚶‍♂️' },
  },
  {
    id: 'q084',
    category: 'daily',
    choiceA: { text: '평생 택시/버스 못 타기', emoji: '🚌' },
    choiceB: { text: '평생 비행기 못 타기', emoji: '✈️' },
  },
  {
    id: 'q144',
    category: 'daily',
    choiceA: { text: '5평 원룸인데 강남', emoji: '🏙️' },
    choiceB: { text: '30평 아파트인데 시골 끝', emoji: '🌾' },
  },

  // -- 디지털/미디어 --
  {
    id: 'q079',
    category: 'daily',
    choiceA: { text: '핸드폰 배터리 항상 5%', emoji: '🪫' },
    choiceB: { text: '와이파이 속도 항상 느림', emoji: '🐌' },
  },
  {
    id: 'q082',
    category: 'daily',
    choiceA: { text: '평생 유튜브 못 보기', emoji: '📺' },
    choiceB: { text: '평생 게임 못 하기', emoji: '🎮' },
  },
  {
    id: 'q083',
    category: 'daily',
    choiceA: { text: '1년간 SNS 완전 금지', emoji: '📵' },
    choiceB: { text: '1년간 내 모든 SNS 공개 계정', emoji: '🔓' },
  },
  {
    id: 'q145',
    category: 'daily',
    choiceA: { text: '넷플릭스 평생 무료인데 광고 5분씩', emoji: '📺' },
    choiceB: { text: '유튜브 프리미엄인데 추천 알고리즘 고장', emoji: '🔀' },
  },
  {
    id: 'q146',
    category: 'daily',
    choiceA: { text: '평생 이어폰/헤드폰 못 쓰기', emoji: '🎧' },
    choiceB: { text: '평생 선글라스 못 쓰기', emoji: '🕶️' },
  },

  // -- 사회/관계 --
  {
    id: 'q147',
    category: 'daily',
    choiceA: { text: '모든 비밀을 아는 친구 1명', emoji: '🤐' },
    choiceB: { text: '가벼운 친구 100명', emoji: '🎉' },
  },
  {
    id: 'q148',
    category: 'daily',
    choiceA: { text: '친구 결혼식 축의금 30만원 (매달 1건)', emoji: '💸' },
    choiceB: { text: '친구가 내 결혼식에 5만원', emoji: '😅' },
  },
  {
    id: 'q149',
    category: 'daily',
    choiceA: { text: '카톡 읽씹 당하기', emoji: '✓' },
    choiceB: { text: '카톡 안 읽고 무시당하기', emoji: '💤' },
  },
  {
    id: 'q150',
    category: 'daily',
    choiceA: { text: '아는 사람 없는 도시에서 새 출발', emoji: '🧳' },
    choiceB: { text: '모든 사람이 나를 아는 동네에서 평생', emoji: '🏘️' },
  },
  {
    id: 'q151',
    category: 'daily',
    choiceA: { text: '평생 혼밥만', emoji: '🍽️' },
    choiceB: { text: '평생 혼술 불가 (항상 누군가와)', emoji: '🍻' },
  },
  {
    id: 'q152',
    category: 'daily',
    choiceA: { text: '매일 아침 엄마한테 모닝콜', emoji: '📞' },
    choiceB: { text: '매일 밤 부모님 통화 10분 필수', emoji: '🌙' },
  },

  // ═══════════════════════════════════════
  // ── 병맛 (60개) ──
  // ═══════════════════════════════════════

  // -- 신체/감각 저주 --
  {
    id: 'q033',
    category: 'crazy',
    choiceA: { text: '평생 손톱 못 깎기', emoji: '💅' },
    choiceB: { text: '평생 머리카락 못 자르기', emoji: '💇' },
  },
  {
    id: 'q041',
    category: 'crazy',
    choiceA: { text: '평생 신발에 레고 한 개 깔려 있기', emoji: '🧱' },
    choiceB: { text: '평생 양말이 살짝 젖어 있기', emoji: '🧦' },
  },
  {
    id: 'q047',
    category: 'crazy',
    choiceA: { text: '평생 매운맛만 느끼기', emoji: '🌶️' },
    choiceB: { text: '평생 아무 맛도 못 느끼기', emoji: '😶' },
  },
  {
    id: 'q035',
    category: 'crazy',
    choiceA: { text: '평생 뒤로만 걷기', emoji: '🔙' },
    choiceB: { text: '평생 옆으로만 걷기', emoji: '🦀' },
  },
  {
    id: 'q038',
    category: 'crazy',
    choiceA: { text: '평생 밥 먹을 때 정좌해서 먹기', emoji: '🧎' },
    choiceB: { text: '평생 서서만 잠자기', emoji: '🧍' },
  },
  {
    id: 'q160',
    category: 'crazy',
    choiceA: { text: '평생 눈 깜빡일 때 "딸깍" 소리 남', emoji: '👁️' },
    choiceB: { text: '평생 걸을 때마다 오리 소리 남', emoji: '🦆' },
  },
  {
    id: 'q161',
    category: 'crazy',
    choiceA: { text: '손가락이 소시지로 변함', emoji: '🌭' },
    choiceB: { text: '발가락이 젤리로 변함', emoji: '🍬' },
  },
  {
    id: 'q162',
    category: 'crazy',
    choiceA: { text: '평생 등이 간지러운데 손이 안 닿음', emoji: '🤏' },
    choiceB: { text: '평생 재채기 나올 것 같은데 안 나옴', emoji: '😤' },
  },
  {
    id: 'q163',
    category: 'crazy',
    choiceA: { text: '머리에서 팝콘 냄새 남', emoji: '🍿' },
    choiceB: { text: '겨드랑이에서 꽃 향기 남', emoji: '🌸' },
  },

  // -- 방귀/트림/소리 --
  {
    id: 'q030',
    category: 'crazy',
    choiceA: { text: '면접 중 5초간 방귀', emoji: '💨' },
    choiceB: { text: '소개팅 중 5초간 방귀', emoji: '💀' },
  },
  {
    id: 'q034',
    category: 'crazy',
    choiceA: { text: '웃을 때마다 돼지 소리 나기', emoji: '🐷' },
    choiceB: { text: '화날 때마다 눈물 나기', emoji: '😭' },
  },
  {
    id: 'q036',
    category: 'crazy',
    choiceA: { text: '좋아하는 사람 앞에서 트림', emoji: '😳' },
    choiceB: { text: '상사 앞에서 코골기', emoji: '😴' },
  },
  {
    id: 'q039',
    category: 'crazy',
    choiceA: { text: '랜덤으로 하루 한 번 방귀 MAX', emoji: '💣' },
    choiceB: { text: '랜덤으로 하루 한 번 3초간 투명', emoji: '👤' },
  },
  {
    id: 'q042',
    category: 'crazy',
    choiceA: { text: '내 방귀에 색깔이 보이기', emoji: '🌈' },
    choiceB: { text: '내 트림에 자막이 뜨기', emoji: '📝' },
  },
  {
    id: 'q031',
    category: 'crazy',
    choiceA: { text: '평생 모든 말을 소리질러야 하기', emoji: '📢' },
    choiceB: { text: '평생 속삭이듯만 말하기', emoji: '🤫' },
  },
  {
    id: 'q032',
    category: 'crazy',
    choiceA: { text: '1년간 방귀 소리 나는 신발 신기', emoji: '👟' },
    choiceB: { text: '1년간 이상한 냄새 나는 모자 쓰기', emoji: '🧢' },
  },
  {
    id: 'q164',
    category: 'crazy',
    choiceA: { text: '딸꾹질이 1시간마다 5분씩', emoji: '🫧' },
    choiceB: { text: '하품이 전염력 10배 (주변 다 하품)', emoji: '🥱' },
  },

  // -- 사회적 망신 --
  {
    id: 'q029',
    category: 'crazy',
    choiceA: { text: '온 국민이 내 브라우저 기록 보기', emoji: '💻' },
    choiceB: { text: '온 국민이 내 카톡 내용 보기', emoji: '💬' },
  },
  {
    id: 'q040',
    category: 'crazy',
    choiceA: { text: '전 세계에 내 졸업사진 공개', emoji: '📸' },
    choiceB: { text: '전 세계에 내 중2 일기장 공개', emoji: '📖' },
  },
  {
    id: 'q045',
    category: 'crazy',
    choiceA: { text: '100명 앞에서 2분간 춤추기', emoji: '💃' },
    choiceB: { text: '100명 앞에서 2분간 노래하기', emoji: '🎤' },
  },
  {
    id: 'q037',
    category: 'crazy',
    choiceA: { text: '내 혼잣말이 전부 스피커로 나오기', emoji: '🔊' },
    choiceB: { text: '내 표정이 실시간 이모지로 뜨기', emoji: '😵' },
  },
  {
    id: 'q165',
    category: 'crazy',
    choiceA: { text: '내 인스타 좋아요 숫자가 머리 위에 뜸', emoji: '🔢' },
    choiceB: { text: '내 은행 잔고가 이마에 표시됨', emoji: '💲' },
  },
  {
    id: 'q166',
    category: 'crazy',
    choiceA: { text: '거짓말할 때마다 머리카락 1가닥 빠짐', emoji: '💇' },
    choiceB: { text: '욕할 때마다 키 1mm 줄어듦', emoji: '📏' },
  },
  {
    id: 'q167',
    category: 'crazy',
    choiceA: { text: '내 카톡 프사가 매일 랜덤으로 바뀜', emoji: '🔄' },
    choiceB: { text: '내 카톡 상메가 속마음으로 자동 업데이트', emoji: '💭' },
  },

  // -- 초능력/저주 --
  {
    id: 'q021',
    category: 'crazy',
    choiceA: { text: '투명인간 되는 능력', emoji: '👻' },
    choiceB: { text: '하늘을 나는 능력', emoji: '🦅' },
  },
  {
    id: 'q022',
    category: 'crazy',
    choiceA: { text: '과거로 돌아가기 (변경 불가)', emoji: '⏪' },
    choiceB: { text: '미래 1시간만 미리 보기', emoji: '⏩' },
  },
  {
    id: 'q024',
    category: 'crazy',
    choiceA: { text: '모든 꿈을 기억하기', emoji: '💭' },
    choiceB: { text: '원하는 꿈을 꾸기', emoji: '🌈' },
  },
  {
    id: 'q046',
    category: 'crazy',
    choiceA: { text: '나한테만 중력 2배', emoji: '⬇️' },
    choiceB: { text: '나한테만 중력 절반', emoji: '🎈' },
  },
  {
    id: 'q048',
    category: 'crazy',
    choiceA: { text: '거짓말하면 코가 빛나기', emoji: '🔴' },
    choiceB: { text: '흥분하면 귀가 커지기', emoji: '🐰' },
  },
  {
    id: 'q168',
    category: 'crazy',
    choiceA: { text: '동물과 대화 가능 (사람 말 불가)', emoji: '🐕' },
    choiceB: { text: '외국어 전부 가능 (한국어 불가)', emoji: '🌍' },
  },
  {
    id: 'q169',
    category: 'crazy',
    choiceA: { text: '만진 음식이 전부 치킨 맛', emoji: '🍗' },
    choiceB: { text: '만진 음료가 전부 소주 맛', emoji: '🍶' },
  },
  {
    id: 'q170',
    category: 'crazy',
    choiceA: { text: '10초 뒤를 볼 수 있는 능력', emoji: '🔮' },
    choiceB: { text: '10초 전으로 돌아가는 능력', emoji: '⏪' },
  },
  {
    id: 'q171',
    category: 'crazy',
    choiceA: { text: '읽은 책 내용 완벽 기억 (단, 소리내어 읽기)', emoji: '📚' },
    choiceB: { text: '들은 노래 완벽 재현 (단, 음치 목소리)', emoji: '🎵' },
  },

  // -- 황당한 선택 --
  {
    id: 'q026',
    category: 'crazy',
    choiceA: { text: '10년 전 나에게 편지 보내기', emoji: '✉️' },
    choiceB: { text: '10년 후 나에게서 편지 받기', emoji: '📬' },
  },
  {
    id: 'q027',
    category: 'crazy',
    choiceA: { text: '좀비 아포칼립스에서 살아남기', emoji: '🧟' },
    choiceB: { text: '무인도에서 1년 살기', emoji: '🏝️' },
  },
  {
    id: 'q043',
    category: 'crazy',
    choiceA: { text: '3일간 닭 울음소리로만 대화하기', emoji: '🐔' },
    choiceB: { text: '3일간 온몸에 털 인형 옷 입고 다니기', emoji: '🧸' },
  },
  {
    id: 'q044',
    category: 'crazy',
    choiceA: { text: '매일 아침 랜덤 헤어스타일로 기상', emoji: '🤡' },
    choiceB: { text: '매일 아침 랜덤 옷 조합으로 출근', emoji: '🎪' },
  },
  {
    id: 'q172',
    category: 'crazy',
    choiceA: { text: '1주일간 엘리베이터에서만 생활', emoji: '🛗' },
    choiceB: { text: '1주일간 편의점에서만 생활', emoji: '🏪' },
  },
  {
    id: 'q173',
    category: 'crazy',
    choiceA: { text: '고양이 500마리와 아파트 생활', emoji: '🐱' },
    choiceB: { text: '대형견 1마리와 원룸 생활', emoji: '🐕' },
  },
  {
    id: 'q174',
    category: 'crazy',
    choiceA: { text: '평생 교복만 입기', emoji: '🎒' },
    choiceB: { text: '평생 정장만 입기', emoji: '👔' },
  },
  {
    id: 'q175',
    category: 'crazy',
    choiceA: { text: '엄마가 내 회사 신입으로 입사', emoji: '👩' },
    choiceB: { text: '내가 엄마 회사에 부하 직원으로 입사', emoji: '👨‍💼' },
  },
  {
    id: 'q176',
    category: 'crazy',
    choiceA: { text: '1년간 거울 못 보기', emoji: '🪞' },
    choiceB: { text: '1년간 사진 못 찍기', emoji: '📷' },
  },

  // -- 극한 양자택일 --
  {
    id: 'q177',
    category: 'crazy',
    choiceA: { text: '평생 맨발로 다니기', emoji: '🦶' },
    choiceB: { text: '평생 장갑 끼고 다니기', emoji: '🧤' },
  },
  {
    id: 'q178',
    category: 'crazy',
    choiceA: { text: '매일 100명한테 인사해야 하는 저주', emoji: '👋' },
    choiceB: { text: '매일 1명한테 "사랑해" 해야 하는 저주', emoji: '😘' },
  },
  {
    id: 'q179',
    category: 'crazy',
    choiceA: { text: '이빨 사이에 항상 뭐가 낀 느낌', emoji: '🦷' },
    choiceB: { text: '눈에 항상 속눈썹 들어간 느낌', emoji: '👁️' },
  },
  {
    id: 'q180',
    category: 'crazy',
    choiceA: { text: '모든 음식이 파인애플 피자 맛', emoji: '🍍' },
    choiceB: { text: '모든 음료가 미지근한 물 맛', emoji: '💧' },
  },
  {
    id: 'q181',
    category: 'crazy',
    choiceA: { text: '재채기 한 번에 1만원 벌기 (하루 3번 제한)', emoji: '🤧' },
    choiceB: { text: '방귀 한 번에 5천원 벌기 (하루 무제한)', emoji: '💨' },
  },
  {
    id: 'q182',
    category: 'crazy',
    choiceA: { text: '꿈에서 한 행동이 현실에 반영됨', emoji: '💭' },
    choiceB: { text: '현실의 생각이 주변에 다 들림', emoji: '📡' },
  },
  {
    id: 'q183',
    category: 'crazy',
    choiceA: { text: '평생 계단 올라갈 때 한 칸씩만', emoji: '🪜' },
    choiceB: { text: '평생 문을 열 때 3번 노크 필수', emoji: '🚪' },
  },
  {
    id: 'q184',
    category: 'crazy',
    choiceA: { text: '셀카 찍으면 10살 늙어 보임', emoji: '📱' },
    choiceB: { text: '거울 보면 10살 어려 보이는데 사진은 실물', emoji: '🪞' },
  },
  {
    id: 'q185',
    category: 'crazy',
    choiceA: { text: '평생 BGM이 깔리는 인생 (선택 불가)', emoji: '🎵' },
    choiceB: { text: '평생 내 머리 위에 감정 이모지 표시', emoji: '😤' },
  },
  {
    id: 'q186',
    category: 'crazy',
    choiceA: { text: '눈 마주치면 상대 속마음이 들림', emoji: '🧠' },
    choiceB: { text: '악수하면 상대 비밀 1개 알게 됨', emoji: '🤝' },
  },
  {
    id: 'q187',
    category: 'crazy',
    choiceA: { text: '평생 오른쪽으로만 고개 돌리기', emoji: '➡️' },
    choiceB: { text: '평생 왼손으로만 생활하기', emoji: '✋' },
  },
  {
    id: 'q188',
    category: 'crazy',
    choiceA: { text: '택배가 항상 3주 걸림', emoji: '📦' },
    choiceB: { text: '배달 음식이 항상 30분 늦음', emoji: '🕐' },
  },
  {
    id: 'q189',
    category: 'crazy',
    choiceA: { text: '스마트폰 화면이 항상 최대 밝기', emoji: '☀️' },
    choiceB: { text: '스마트폰 볼륨이 항상 최대', emoji: '🔊' },
  },
];
