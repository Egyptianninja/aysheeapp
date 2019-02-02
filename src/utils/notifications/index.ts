import { Permissions, Notifications } from "expo";

export const registerForPushNotificationsAsync = async () => {
  const permissions = Permissions.NOTIFICATIONS;
  const { status: existingStatus } = await Permissions.getAsync(permissions);
  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(permissions);

    if (status === "granted") {
      const token = await Notifications.getExpoPushTokenAsync();
      return token;
    } else {
      return false;
    }
  }
  const pushToken = await Notifications.getExpoPushTokenAsync();
  return pushToken;
};
export const getPushToken = async () => {
  return Notifications.getExpoPushTokenAsync();
};
