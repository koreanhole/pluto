import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DepartmentType } from '../department/department.type';

@ObjectType()
class AttachmentLinksType {
  @Field()
  fileName: string;

  @Field()
  fileLink: string;
}

@ObjectType('Notice')
export class NoticeType {
  @Field(() => ID)
  id: string;

  @Field(() => [AttachmentLinksType], { nullable: true })
  attachmentLinks: AttachmentLinksType[];

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

  @Field(() => DepartmentType)
  department: string;

  @Field()
  listId: string;

  @Field()
  title: string;

  @Field()
  url: string;
}
