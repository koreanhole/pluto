import { Injectable, Logger } from '@nestjs/common';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { SendNotificationInput } from './notification.input';

@Injectable()
export class NotificationService {
  private logger = new Logger('NotificationService');
  async sendPushNotification(sendNotificationInput: SendNotificationInput) {
    const { pushTokenList, title, body, extraData } = sendNotificationInput;
    const expo = new Expo();
    const messages: ExpoPushMessage[] = [];

    for (const pushToken of pushTokenList) {
      if (!Expo.isExpoPushToken(pushToken)) {
        this.logger.error(
          `Push token ${pushToken} is not a valid Expo push token`,
        );
        continue;
      }

      messages.push({
        to: pushToken,
        sound: 'default',
        title: title,
        body: body,
        data: extraData,
        priority: 'high', //to make sure notification is delivered as fast as possible. see documentation for more details
        channelId: 'chat-messages', //for devices on android 8.0 and above
      });
    }
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];
    // tslint:disable-next-line:no-floating-promises
    (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (const chunk of chunks) {
        try {
          const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);
          // NOTE: If a ticket contains an error code in ticket.details.error, you
          // must handle it appropriately. The error codes are listed in the Expo
          // documentation:
          // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
        } catch (error) {
          this.logger.error(error);
          return false;
        }
      }
    })();
    return true;
  }
}
