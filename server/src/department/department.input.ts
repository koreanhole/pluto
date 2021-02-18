import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { DeptClassification, DeptType } from './department.enum';

@InputType()
export class CreateDepartmentInput {
  @IsNotEmpty({
    message: '부서 코드를 작성하세요 예시: FA1',
  })
  @Field()
  deptCode: string;

  @IsNotEmpty({
    message: '부서의 보조코드를 작성하세요 예시: cate_id2=000010059',
  })
  @Field()
  subDeptCode: string;

  @IsEnum(DeptClassification)
  @Field(() => DeptClassification)
  deptClassification: DeptClassification;

  @IsEnum(DeptType)
  @Field(() => DeptType)
  deptType: DeptType;

  @Field()
  lastFetchedListId: string;
}
