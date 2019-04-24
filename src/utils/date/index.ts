export const dateCheck = ({ from, to, check }: any) => {
  const fDate = Date.parse(from);
  const lDate = Date.parse(to);
  const cDate = Date.parse(check);

  if (cDate <= lDate && cDate >= fDate) {
    return true;
  }
  return false;
};

export const getOfferStatus = ({ start, end }: any) => {
  const nowDate = new Date();
  const now = nowDate.getTime();

  const startTime = start.getTime();
  const endTime = end.getTime();
  if (now < endTime && now > startTime) {
    return 2;
  } else if (now < startTime) {
    return 1;
  } else {
    return 3;
  }
};
