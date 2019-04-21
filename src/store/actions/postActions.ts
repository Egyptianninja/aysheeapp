import {
  DEL_QUERY,
  GET_BUCKETS,
  SET_QUERY,
  GET_CONTROL_BUCKETS
} from '../types';

export function setBuckets(buckets: any) {
  return {
    type: GET_BUCKETS,
    buckets
  };
}
export function setControlBuckets(controlbuckets: any) {
  return {
    type: GET_CONTROL_BUCKETS,
    controlbuckets
  };
}
export function setQuery(query: any) {
  return {
    type: SET_QUERY,
    query
  };
}
export function delQuery() {
  return {
    type: DEL_QUERY
  };
}
