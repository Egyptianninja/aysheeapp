import { getLocaleLang } from './getlang';

export const getDate = (date: any, type = 'short') => {
  const newDate = new Date(date);
  const locale: any = getLocaleLang ? getLocaleLang : 'en-us';
  const day = newDate.getDate();
  const month = newDate.toLocaleString(locale, { month: type });
  return `${day} ${month}`;
};
