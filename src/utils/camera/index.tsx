import { Permissions } from 'expo';
import { store } from '../../store';
import { addPermission } from '../../store/actions/globActions';

export const getCameraRollPermission = async () => {
  const permissions: any = store.getState().glob.permissions;
  if (permissions.CAMERA_ROLL) {
    return true;
  }
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.CAMERA_ROLL
  );

  let finalStatus = existingStatus;

  if (finalStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    return false;
  }
  store.dispatch(addPermission('CAMERA_ROLL'));
  return true;
};

export const getCameraPermission = async () => {
  const permissions: any = store.getState().glob.permissions;
  if (permissions.CAMERA) {
    return true;
  }
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.CAMERA
  );

  let finalStatus = existingStatus;

  if (finalStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    return false;
  }
  store.dispatch(addPermission('CAMERA'));
  return true;
};
