import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { DeptType, DeptClassification } from './department.entity';

@InputType()
export class CreateDepartmentInput {
  @Field()
  deptName: string;

  @Field()
  deptCode: string;

  @IsEnum(DeptClassification)
  @Field(() => DeptClassification)
  deptClassification: DeptClassification;

  @IsEnum(DeptType)
  @Field(() => DeptType)
  deptType: DeptType;

  @Field({ nullable: true })
  lastFetchedListId: string;
}
