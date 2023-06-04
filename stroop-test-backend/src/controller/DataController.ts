import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { DataService } from '../service/DataService';
import { Data } from '../entity/Data';
import { Result } from '../interface';

@Controller()
export class DataController {
  @Inject()
  ctx: Context;
  @Inject()
  dataService: DataService;

  @Get('/currentData')
  async currentData() {
    return this.ctx.cookies.get('user');
  }

  @Post('/store')
  async store(@Body() result: Result) {
    const data = new Data();

    const matchedTimes: Array<number> = [];
    const unmatchedTimes: Array<number> = [];
    let specialWrong = 0;
    let wrong = 0;
    result.scores.forEach(item => {
      if (item.status === 1) {
        if (item.type === 0) {
          matchedTimes.push(item.time);
        } else {
          unmatchedTimes.push(item.time);
        }
      } else if (item.status === 0) {
        specialWrong++;
        wrong++;
      } else {
        wrong++;
      }
    });

    const matchedAvgTime = this.calculateAverage(matchedTimes);
    const unmatchedAvgTime = this.calculateAverage(unmatchedTimes);

    data.matchedAvgTime = matchedAvgTime.toFixed(4);
    data.unmatchedAvgTime = unmatchedAvgTime.toFixed(4);
    data.difference = (matchedAvgTime - unmatchedAvgTime).toFixed(4);
    data.specialWrong = specialWrong;
    data.wrong = wrong;
    data.age = result.age;
    data.gpa = result.gpa.toString();

    this.ctx.cookies.set('user', JSON.stringify(data));
    return this.dataService.storeData(data);
  }

  calculateAverage(numbers: number[]): number {
    const convertedNumbers = numbers.map(n => parseFloat(String(n)));
    const sum = convertedNumbers.reduce((acc, curr) => acc + curr, 0);
    return sum / convertedNumbers.length;
  }
}
