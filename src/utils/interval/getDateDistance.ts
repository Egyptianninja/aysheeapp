export const getDateDistance = (countDownDate: Date) => {
  const ms = 1000;

  const d = 86400; // 60 * 60 * 24;
  const h = 3600; // 60 * 60;
  const m = 60;

  const count = new Date(countDownDate).getTime() / ms;
  const now = new Date().getTime() / ms;

  const distance = count - now;

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
