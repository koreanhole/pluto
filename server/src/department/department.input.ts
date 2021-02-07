import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDepartmentInput {
  @Field()
  deptName: string;

  @Field()
  deptCode: string;
}
