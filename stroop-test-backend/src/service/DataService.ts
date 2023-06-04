import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { Data } from '../entity/Data';

@Provide()
export class DataService {
  @InjectEntityModel(Data)
  dataModel: Repository<Data>;

  async storeData(data: Data) {
    return this.dataModel.save(data);
  }
}
