import { Field, InputType } from '@nestjs/graphql';

@InputType()
class NotificationExtraData {
  @Field()
  deptCode: string;

  @Field()
  listId: string;
}

@InputType()
export class SendNotificationInput {
  @Field(() => [String])
  pushTokenList: string[];

  @Field()
  title: string;

  @Field()
  body: string;

  @Field(() => NotificationExtraData)
  extraData: NotificationExtraData;
}
