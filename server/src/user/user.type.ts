import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DepartmentType } from '../department/department.type';

@ObjectType('User')
export class UserType {
  @Field(() => ID)
  id: string;

  @Field()
  expoPushToken: string;

  @Field(() => [DepartmentType])
  departments: string[];
}
