import { Inject, Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { Data } from '../entity/Data';
import { Context } from '@midwayjs/koa';
import { Result } from '../interface';

@Provide()
export class DataService {
  @Inject()
  ctx: Context;
  @InjectEntityModel(Data)
  dataModel: Repository<Data>;

  async storeData(result: Result) {
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

    if (wrong >= 15) {
      return null;
    }

    const matchedAvgTime = this.calculateAverage(matchedTimes);
    const unmatchedAvgTime = this.calculateAverage(unmatchedTimes);

    data.matchedAvgTime = matchedAvgTime.toFixed(4);
    data.unmatchedAvgTime = unmatchedAvgTime.toFixed(4);
    data.difference = (matchedAvgTime - unmatchedAvgTime).toFixed(4);
    data.specialWrong = specialWrong;
    data.wrong = wrong;
    data.age = result.age;
    data.gpa = result.gpa.toString();
    const createTime = this.currentDateTime();

    if ((await this.dataModel.save(data)) !== null) {
      this.ctx.cookies.set('user', JSON.stringify({ ...data, createTime }), { maxAge: 3600 * 24 * 365 * 100 });
      return { ...data, createTime };
    } else {
      return null;
    }
  }

  async getData() {
    let gpaList;
    let sAgeList;
    let tAgeList;
    let oAgeList;

    await this.dataModel.find().then(res => {
      gpaList = res
        .map(({ difference, gpa }) => {
          if (Number.parseFloat(gpa) < 5.4) return [difference, gpa];
        })
        .filter(item => item !== undefined);

      sAgeList = res
        .map(({ difference, age, gpa }) => {
          if (Number.parseFloat(gpa) < 5.4) return [age, difference];
        })
        .filter(item => item !== undefined);

      tAgeList = res
        .map(({ difference, age, gpa }) => {
          if (Number.parseFloat(gpa) === 5.5) return [age, difference];
        })
        .filter(item => item !== undefined);

      oAgeList = res
        .map(({ difference, age, gpa }) => {
          if (Number.parseFloat(gpa) === 5.49) return [age, difference];
        })
        .filter(item => item !== undefined);
    });
    return {
      gpaList: gpaList,
      studentAgeList: sAgeList,
      teacherAgeList: tAgeList,
      outsiderAgeList: oAgeList,
    };
  }

  calculateAverage(numbers: number[]): number {
    const convertedNumbers = numbers.map(n => parseFloat(String(n)));
    const sum = convertedNumbers.reduce((acc, curr) => acc + curr, 0);
    return sum / convertedNumbers.length;
  }

  currentDateTime() {
    // 生成当前时间
    const currentDate = new Date();

    // 格式化日期时间
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    // 格式化字符串
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
