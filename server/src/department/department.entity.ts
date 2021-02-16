import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { DeptClassification, DeptType } from './department.enum';

@Entity()
export class Department {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column({ default: '' })
  deptCode: string;

  @Column()
  subDeptCode: string;

  @Column()
  deptClassification: DeptClassification;

  @Column()
  deptType: DeptType;

  @Column()
  lastFetchedListId: string;
}
