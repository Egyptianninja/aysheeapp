export const notExpire = (date: any) => {
  const expireTime = new Date(date).getTime();
  const now = new Date().getTime();
  return expireTime - now > 0 ? true : false;
};
