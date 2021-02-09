import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DeptType, DeptClassification } from './department.entity';

@ObjectType('DepartmentType')
export class DepartmentType {
  @Field(() => ID)
  id: string;

  @Field()
  deptName: string;

  @Field()
  deptCode: string;

  @Field()
  deptClassification: DeptClassification;

  @Field()
  deptType: DeptType;

  @Field({ defaultValue: 0 })
  lastFetchedListId: string;
}
