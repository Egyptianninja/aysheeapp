import {
  DEL_QUERY,
  GET_BUCKETS,
  SET_QUERY,
  GET_CONTROL_BUCKETS
} from '../types';

const initialState = {
  buckets: null,
  controlbuckets: null,
  query: ''
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case GET_BUCKETS:
      return {
        ...state,
        buckets: action.buckets
      };
    case GET_CONTROL_BUCKETS:
      return {
        ...state,
        controlbuckets: action.controlbuckets
      };
    case SET_QUERY:
      return {
        ...state,
        query: action.query
      };
    case DEL_QUERY:
      return {
        ...state,
        query: ''
      };

    default:
      return state;
  }
}
