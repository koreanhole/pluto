import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DeptClassification, DeptType } from './department.enum';

@ObjectType('DepartmentType')
export class DepartmentType {
  @Field(() => ID)
  id: string;

  @Field()
  deptCode: string;

  @Field({ defaultValue: '' })
  subDeptCode: string;

  @Field()
  deptClassification: DeptClassification;

  @Field()
  deptType: DeptType;

  @Field()
  lastFetchedListId: string;
}
