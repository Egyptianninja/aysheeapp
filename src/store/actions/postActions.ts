import { GET_BUCKETS } from "../types";

export function setBuckets(buckets: any) {
  return {
    type: GET_BUCKETS,
    buckets
  };
}
