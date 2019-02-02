import { Location, Permissions } from "expo";

export const getLocation = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    return false;
  }

  const location = await Location.getCurrentPositionAsync({});
  return location;
};
