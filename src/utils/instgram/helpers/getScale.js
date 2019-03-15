// @flow

const SCALE_MULTIPLIER = 1;

export default function getScale(
  currentDistance: number,
  initialDistance: number
) {
  if ((currentDistance / initialDistance) * SCALE_MULTIPLIER < 1) {
    return 1;
  } else {
    return (currentDistance / initialDistance) * SCALE_MULTIPLIER;
  }
}
