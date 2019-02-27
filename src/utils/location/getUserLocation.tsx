import { Location, Permissions } from 'expo';
import { store } from '../../store';
import { addPermission } from '../../store/actions/globActions';
export const getUserLocation = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    return;
  }
  store.dispatch(addPermission('LOCATION'));
  return Location.getCurrentPositionAsync({});
};
