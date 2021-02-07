import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, IsUUID } from 'class-validator';

@InputType()
class AttachmentLinksInput {
  @Field()
  fileName: string;

  @Field()
  fileLink: string;
}

@InputType()
export class CreateNoticeInput {
  @Field(() => [AttachmentLinksInput])
  attachmentLinks: AttachmentLinksInput[];

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

  @IsUUID('4')
  @Field(() => ID)
  department: string;

  @Field()
  listId: string;

  @Field()
  title: string;

  @Field()
  url: string;
}
