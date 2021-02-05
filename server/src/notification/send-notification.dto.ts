import { IsNotEmpty } from 'class-validator';

class NotificationExtraData {
  @IsNotEmpty()
  deptCode: string;

  @IsNotEmpty()
  listId: string;
}

export class SendNotificationDto {
  @IsNotEmpty()
  pushTokenList: string[];

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  extraData: NotificationExtraData;
}
