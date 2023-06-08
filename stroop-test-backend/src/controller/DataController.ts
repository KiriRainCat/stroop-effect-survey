import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { DataService } from '../service/DataService';
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
    const res = await this.dataService.storeData(result);
    if (res === null) {
      return 'Invalid Data';
    }
    return res;
  }

  @Get('/get')
  async get() {
    return this.dataService.getData();
  }
}
