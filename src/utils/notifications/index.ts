import { Permissions, Notifications } from 'expo';
import { store } from '../../store';
import { addPermission } from '../../store/actions/globActions';
import { addPushToken } from '../../store/actions/userAtions';

export const registerForPushNotificationsAsync = async () => {
  const permissions = Permissions.NOTIFICATIONS;
  const { status: existingStatus } = await Permissions.getAsync(permissions);
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(permissions);

    if (status === 'granted') {
      const token = await Notifications.getExpoPushTokenAsync();
      store.dispatch(addPushToken(token));
      store.dispatch(addPermission('NOTIFICATIONS'));
      return token;
    } else {
      return false;
    }
  }
  const pushToken = await Notifications.getExpoPushTokenAsync();
  store.dispatch(addPushToken(pushToken));
  store.dispatch(addPermission('NOTIFICATIONS'));
  return pushToken;
};
export const getPushToken = async () => {
  return Notifications.getExpoPushTokenAsync();
};
