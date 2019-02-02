const times = [0, 60, 300, 900, 3600, 10800, 86400];

export const getSendSmsInterval = (
  sendTime: any,
  qty: number,
  initTime: any
) => {
  if (!sendTime) {
    return 0;
  }
  const currentTime = Math.floor(new Date().getTime() / 1000);
  const lastSentTime = Math.floor(new Date(sendTime).getTime() / 1000);
  const diffTime = currentTime - lastSentTime;

  if (diffTime > 86400) {
    initTime();
    return 0;
  }

  switch (qty) {
    case 0:
      return 0;
    case 1:
      return diffTime < times[1] ? times[1] - diffTime : 0; // wait fro 60 seconds
    case 2:
      return diffTime < times[2] ? times[2] - diffTime : 0; // wait fro 300 seconds - 5 min
    case 3:
      return diffTime < times[3] ? times[3] - diffTime : 0; // wait fro 900 seconds - 15 min
    case 4:
      return diffTime < times[4] ? times[4] - diffTime : 0; // wait fro 60 min - 1h
    case 5:
      return diffTime < times[5] ? times[5] - diffTime : 0; // wait fro 3h
    case 6:
      return diffTime < times[6] ? times[6] - diffTime : 0; // wait fro 24h - 1 day
    default:
      break;
  }
};
