import { Location, Permissions } from 'expo';
import { store } from '../../store';
import { addPermission } from '../../store/actions/globActions';
export const getLocation = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    return false;
  }
  store.dispatch(addPermission('LOCATION'));
  const location = await Location.getCurrentPositionAsync({});
  return location;
};
