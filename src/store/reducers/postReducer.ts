import { GET_BUCKETS } from "../types";

const initialState = {
  buckets: null
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case GET_BUCKETS:
      return {
        ...state,
        buckets: action.buckets
      };

    default:
      return state;
  }
}
