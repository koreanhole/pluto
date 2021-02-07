import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('DepartmentType')
export class DepartmentType {
  @Field(() => ID)
  id: string;

  @Field()
  deptName: string;

  @Field()
  deptCode: string;
}
