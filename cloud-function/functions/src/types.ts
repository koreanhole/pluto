export type pushNotificationExtraData = {
  deptCode: string;
  listId: string;
};

export type PushNotification = {
  pushTokens: string[];
  title: string;
  body: string;
  data: pushNotificationExtraData;
};
