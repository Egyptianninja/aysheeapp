import { Location, Permissions } from 'expo';
import { store } from '../../store';
import {
  addPermission,
  setRecentLocation
} from '../../store/actions/globActions';
import { locationExpiryTiem } from '../../constants';
import { notExpire } from '../interval';
export const getUserLocation = async (current = false) => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    return;
  }
  setLocationPermissionInState();

  if (!current) {
    const recentLocation: any = store.getState().glob.recentLocation;
    if (recentLocation.location && notExpire(recentLocation.expiresAt)) {
      return recentLocation.location;
    } else {
      return setLocationInState(calculateexpiresAt());
    }
  } else {
    return setLocationInState(calculateexpiresAt());
  }
};

const setLocationInState = async (expiresAt: any) => {
  const currentLocation = await Location.getCurrentPositionAsync({});
  await store.dispatch(
    setRecentLocation({ location: currentLocation, expiresAt })
  );
  return currentLocation;
};

const calculateexpiresAt = () => {
  const now = new Date().getTime();
  return now + locationExpiryTiem;
};

const setLocationPermissionInState = () => {
  const permissions: any = store.getState().glob.permissions;
  if (!permissions.LOCATION) {
    store.dispatch(addPermission('LOCATION'));
  }
};
