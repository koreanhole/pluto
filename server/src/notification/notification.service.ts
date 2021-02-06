import { Injectable } from '@nestjs/common';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { SendNotificationInput } from './notification.input';

@Injectable()
export class NotificationService {
  async sendPushNotification(sendNotificationInput: SendNotificationInput) {
    const { pushTokenList, title, body, extraData } = sendNotificationInput;
    const expo = new Expo();
    const messages: ExpoPushMessage[] = [];

    for (const pushToken of pushTokenList) {
      // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
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
          console.error(error);
          return false;
        }
      }
    })();
    return true;
  }
}
