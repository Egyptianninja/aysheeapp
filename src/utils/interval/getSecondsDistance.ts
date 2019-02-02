export const getSecondsDistance = (distance: number) => {
  const d = 86400; // 60 * 60 * 24;
  const h = 3600; // 60 * 60;
  const m = 60;

  const days = Math.floor(distance / d);
  const hours = Math.floor((distance % d) / h);
  const minutes = Math.floor((distance % h) / m);
  const seconds = Math.floor(distance % m);
  if (distance < 0) {
    return false;
  }
  return {
    days,
    hours,
    minutes,
    seconds
  };
};
