import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Notice')
export class NoticeType {
  @Field(() => ID)
  id: string;

  @Field(() => [String], { nullable: true })
  attachmentLinks: string[];

  @Field()
  authorDept: string;

  @Field()
  authorName: string;

  @Field()
  contentHtml: string;

  @Field()
  contentString: string;

  @Field()
  createdDatetime: string;

  @Field()
  deptCode: string;

  @Field({ nullable: true })
  deptName: string;

  @Field()
  listId: string;

  @Field()
  title: string;

  @Field()
  url: string;
}
