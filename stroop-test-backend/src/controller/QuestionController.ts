import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Controller('/questions')
export class QuestionController {
  @Inject()
  ctx: Context;

  @Get()
  async getQuestions() {
    const staticQuestions: Array<number> = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4];

    const arr1: Array<number> = [];
    const arr2: Array<number> = [];
    for (let i = 0; i < 20; i++) {
      const rand1 = Math.round(Math.random() * 4);
      let rand2 = Math.round(Math.random() * 4);
      if (arr1.indexOf(rand1) <= 3) {
        arr1.push(rand1);
        while (rand1 === rand2 || !(arr2.indexOf(rand2) <= 3)) {
          rand2 = Math.round(Math.random() * 4);
        }
        arr2.push(rand2);
      } else {
        i--;
      }
    }

    const questions: Array<object> = [];
    staticQuestions.forEach(i => {
      questions.push({
        context: {
          type: this.convert(i) + '-text',
          value: this.convert(i),
        },
        relative: i,
        answer: i,
        type: 0,
      });
    });

    for (let i = 0; i < 20; i++) {
      questions.push({
        context: {
          type: this.convert(arr1[i]) + '-text',
          value: this.convert(arr2[i]),
        },
        relative: arr2[i],
        answer: arr1[i],
        type: 1,
      });
    }

    questions.sort(() => Math.random() - 0.5);
    return questions;
  }

  convert(index: number) {
    switch (index) {
      case 0:
        return 'Red';
      case 1:
        return 'Blue';
      case 2:
        return 'Green';
      case 3:
        return 'Black';
      case 4:
        return 'Yellow';
    }
  }
}
