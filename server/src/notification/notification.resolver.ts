import { Resolver, Query, Args } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { SendNotificationInput } from './notification.input';

@Resolver()
export class NotificationResolver {
  constructor(private notificationService: NotificationService) {}

  @Query(() => Boolean)
  async sendNotification(
    @Args('sendNotificationInput') sendNotificationInput: SendNotificationInput,
  ) {
    return await this.notificationService.sendPushNotification(
      sendNotificationInput,
    );
  }
}
