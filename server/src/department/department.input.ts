import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { DeptClassification, DeptType } from './department.enum';

@InputType()
export class CreateDepartmentInput {
  @Field()
  deptCode: string;

  @IsEnum(DeptClassification)
  @Field(() => DeptClassification)
  deptClassification: DeptClassification;

  @IsEnum(DeptType)
  @Field(() => DeptType)
  deptType: DeptType;

  @Field()
  lastFetchedListId: string;
}
