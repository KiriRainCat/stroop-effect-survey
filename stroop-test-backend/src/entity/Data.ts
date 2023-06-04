import { EntityModel } from '@midwayjs/orm';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel('ses_data')
export class Data {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn({ name: 'create_time' })
  createTime: string;
  @Column({ name: 'matched_avg_time' })
  matchedAvgTime: string;
  @Column({ name: 'unmatched_avg_time' })
  unmatchedAvgTime: string;
  @Column()
  difference: string;
  @Column({ name: 'special_wrong', default: 0 })
  specialWrong: number;
  @Column({ default: 0 })
  wrong: number;
  @Column()
  age: number;
  @Column({ nullable: true })
  gpa: string;
}
