import { Field, InputType } from '@nestjs/graphql';
import { IsDateString } from 'class-validator';

@InputType()
export class CreateNoticeInput {
  @Field(() => [String])
  attachmentLinks: string[];

  @Field()
  authorDept: string;

  @Field()
  authorName: string;

  @Field()
  contentHtml: string;

  @Field()
  contentString: string;

  @IsDateString()
  @Field()
  createdDatetime: string;

  @Field()
  deptCode: string;

  @Field()
  deptName: string;

  @Field()
  listId: string;

  @Field()
  title: string;

  @Field()
  url: string;
}
