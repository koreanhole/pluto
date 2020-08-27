import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Expo, ExpoPushMessage } from "expo-server-sdk";
import { pushNotificationExtraData } from "./types";

admin.initializeApp();

const db = admin.firestore();

async function sendPushNotification({
  pushTokenList,
  title,
  body,
  extraData,
}: {
  pushTokenList: string[];
  title: string;
  body: string;
  extraData: pushNotificationExtraData;
}) {
  let expo = new Expo();
  let messages: ExpoPushMessage[] = [];

  for (let pushToken of pushTokenList) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
    messages.push({
      to: pushToken,
      sound: "default",
      title: title,
      body: body,
      data: extraData,
      priority: "high", //to make sure notification is delivered as fast as possible. see documentation for more details
      channelId: "chat-messages", //for devices on android 8.0 and above
    });
  }
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  // tslint:disable-next-line:no-floating-promises
  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
        console.log("notification sent");
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
      } catch (error) {
        console.error(error);
      }
    }
  })();
}

export const pushNotifications = functions
  .region("asia-northeast1")
  .firestore.document("/notice/{deptCodeAndlistId}")
  .onCreate((change, _context) => {
    let pushTokenList: string[] = [];
    const addedNotice = change.data();
    const title: string = addedNotice.deptName;
    const body: string = addedNotice.title;
    const extraData: pushNotificationExtraData = {
      deptCode: addedNotice.deptCode,
      listId: addedNotice.listId.toString(),
    };

    const getData = db
      .collection("userData")
      .where("favoriteDepartmentList", "array-contains", title)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          if (doc.exists) {
            pushTokenList.push(doc.id);
          } else {
            console.log("document not exists");
          }
        });
        sendPushNotification({
          pushTokenList,
          title,
          body,
          extraData,
        }).catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));

    return getData;
  });