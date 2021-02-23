import { Column, Entity, PrimaryColumn } from 'typeorm';
import { DeptClassification, DeptType } from './department.enum';

@Entity()
export class Department {
  @PrimaryColumn()
  readonly id: string;

  @Column()
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
