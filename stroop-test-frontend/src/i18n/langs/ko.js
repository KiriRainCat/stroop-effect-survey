import koLocale from 'element-plus/lib/locale/lang/ko'

const ko = {
  home: {
    welcome: '스트롭 효과 테스트 조사에 참여해 주셔서 환영합니다.',
    instruction: '천천히 진행하고, 질문에 참여해 주시고, 조사 완료에는 약 30~60초가 소요됩니다.',
    lang: '가장 익숙한 언어를 선택해 주세요:',
  },
  survey: {
    instruction: '목표는 단어 색상과 일치하는 색상을 선택하는 것입니다.',
    question: '아래 단어의 색상과 일치하는 옵션을 5가지 중에서 선택해 주세요.',
    ready: '준비되었습니다.',
  },
  result: {
    instruction: '아래 양식을 작성해 주세요. 양식 제출 후에 테스트 결과가 표시됩니다.',
    matchedAvgTime: '텍스트 색상과 의미가 일치하는 경우:',
    unmatchedAvgTime: '텍스트 색상과 의미가 일치하지 않는 경우:',
    diffBetweenTwoAvg: '두 평균 응답 시간의 차이:',
    totalWrong: '총 오답 수:',
    specialWrong: '틀렸지만 선택한 답이 단어의 의미와 일치합니다:',
    success: '참여해 주셔서 감사합니다. 즐거운 하루 보내세요~',
    title: '테스트 결과:',
    done: '설문 조사가 완료되었습니다. 이것이 당신의 결과입니다.',
  },
  words: {
    instruction: '설명',
    age: '나이',
    submit: '제출',
    avgResponseTime: '평균 응답 시간',
    seconds: '초',
    incorrectAnswers: '오답',
    times: '회',
    variables: '변수',
    pleaseInput: '입력해 주세요',
    clickToBegin: '여기를 클릭하여 시작',
  },
  messages: {
    createBy: '제작자: KiriRainCat (Sam Zhou)',
    error: '오류가 발생했습니다. 관리자 또는 개발자에게 문의해 주세요.',
    ageLimit: '나이는 1~120 사이여야 합니다.',
    gpaLimit: 'GPA는 0.1~5.5 사이여야 합니다.',
    fillForm: '양식을 올바르게 작성해 주세요.',
  },
  ...koLocale,
}

export default ko
