import { GET_BUCKETS, SET_QUERY, DEL_QUERY } from '../types';

const initialState = {
  buckets: null,
  query: ''
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case GET_BUCKETS:
      return {
        ...state,
        buckets: action.buckets
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
