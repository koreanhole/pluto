import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DeptClassification, DeptType } from './department.enum';
import { Node } from '../nodes/node.model';
import { toGlobalId } from 'graphql-relay';

@Entity()
@ObjectType({ implements: Node })
export class Department {
  @PrimaryGeneratedColumn('uuid')
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

  @Field(() => ID, { name: 'id' })
  get relayId(): string {
    return toGlobalId('Department', this.id);
  }
}
