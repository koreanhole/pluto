import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Notice')
export class NoticeType {
  @Field(() => ID)
  id: string;

  @Field()
  listId: string;

  @Field()
  deptCode: string;

  @Field()
  deptName: string;

  @Field()
  title: string;

  @Field()
  authorName: string;

  @Field()
  authorDept: string;

  @Field()
  url: string;

  @Field()
  createdDateTime: string;

  // @Field()
  // attachmentLink: [string];

  @Field()
  contentHtml: string;

  @Field()
  contentString: string;
}
