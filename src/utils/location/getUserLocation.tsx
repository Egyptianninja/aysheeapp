import { Location, Permissions } from 'expo';

export const getUserLocation = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    return;
  }
  return Location.getCurrentPositionAsync({});
};
