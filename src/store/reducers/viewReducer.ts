import { LEFT_FLOOR_UPDATE, APP_LOADED } from "../types";

const initialState = {
  leftHieght: 0,
  appLoaded: false
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case LEFT_FLOOR_UPDATE:
      return {
        ...state,
        leftHieght: state.leftHieght + action.leftHieght
      };
    case APP_LOADED:
      return {
        ...state,
        appLoaded: true
      };

    default:
      return state;
  }
}
