import zhcnLocale from 'element-plus/lib/locale/lang/zh-cn'

const zhcn = {
  home: {
    welcome: '欢迎参加斯特劳普效应测试调查',
    instruction: '请慢慢来，耐心回答问题，完成调查只需要大约30到60秒',
    lang: '请选择您最熟悉的语言：',
  },
  survey: {
    instruction: '你的目标是选择与单词颜色相匹配的颜色',
    question: '请从5种颜色中选择与下方单词的颜色相匹配的选项',
    ready: '我准备好了',
  },
  result: {
    instruction: '请填写下方的表单，您的测试报告将在提交表单后显示',
    matchedAvgTime: '当文本的颜色和含义匹配时：',
    unmatchedAvgTime: '当文本的颜色和含义不匹配时：',
    diffBetweenTwoAvg: '两个平均响应时间之间的差异：',
    totalWrong: '总计错误答案：',
    specialWrong: '错了，但选择的答案符合单词的含义：',
    success: '感谢您的耐心，祝您今天愉快~',
    invalidData: '无效数据集，超时或错误答案次数过多，请重新进行测试，谢谢',
    title: '您的测试结果如下：',
    done: '您已经完成了问卷，这是您的结果',
  },
  words: {
    instruction: '说明',
    age: '年龄',
    submit: '提交',
    avgResponseTime: '平均响应时间',
    seconds: '秒',
    incorrectAnswers: '错误答案',
    times: '次',
    variables: '变量',
    pleaseInput: '请输入',
    clickToBegin: '单击这里开始',
    date: '日期',
    red: '红色',
    blue: '蓝色',
    green: '绿色',
    black: '黑色',
    yellow: '黄色',
  },
  messages: {
    createBy: '制作人：柒夜雨猫 (Sam Zhou)',
    error: '出现了一些错误，请与管理员或开发者联系',
    ageLimit: '年龄必须在1 ~ 120之间',
    gpaLimit: 'GPA必须在0.1 ~ 5.5之间',
    fillForm: '请正确的填写表单',
  },
  ...zhcnLocale,
}

export default zhcn
