import enLocale from 'element-plus/lib/locale/lang/en'

const en = {
  home: {
    welcome: 'Welcome to the Stroop Effect Test Survey',
    instruction:
      'Please take your time and answer the question with patience, it will only take you around 30 to 60 seconds to complete the survey',
    lang: 'Please select the language you are most familiar with:',
  },
  survey: {
    instruction: 'The goal for you is to select the color that match the COLOR of the word',
    question: 'Please select one of the 5 colors that match the COLOR of the word bellow',
    ready: "I'm ready",
  },
  result: {
    instruction: 'Please fill the form bellow, and your test report will be shown after submission',
    matchedAvgTime: 'When color of text and meaning match:',
    unmatchedAvgTime: 'When color of text and meaning does not match:',
    diffBetweenTwoAvg: 'Difference between two average response time:',
    totalWrong: 'Total incorrect choice:',
    specialWrong: 'Wrong, but the choice match the meaning of the word:',
    success: 'Thanks for your patience, have a nice day~',
    title: "Here's your test result:",
    done: "You have done the survey already, here's your result",
  },
  words: {
    instruction: 'Instruction',
    age: 'Age',
    submit: 'Submit',
    avgResponseTime: 'Average response time',
    seconds: 'Seconds',
    incorrectAnswers: 'Incorrect Answers',
    times: 'Times',
    variables: 'Variables',
    pleaseInput: 'Please input',
    clickToBegin: 'Click here to begin',
  },
  messages: {
    createBy: 'Creator: KiriRainCat (Sam Zhou)',
    error: 'Some error occurred, pls contact the administrator or developer',
    ageLimit: 'Age must be between 1 ~ 120',
    gpaLimit: 'GPA must be between 0.1 ~ 5.5',
    fillForm: 'Please correctly fill the form',
  },
  ...enLocale,
}

export default en
