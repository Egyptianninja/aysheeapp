import { LEFT_FLOOR_UPDATE, APP_LOADED } from "../types";

export function leftFloorUpdate(leftHieght: number) {
  return {
    type: LEFT_FLOOR_UPDATE,
    leftHieght
  };
}
export function appLoaded() {
  return {
    type: APP_LOADED
  };
}
