import dayjs from 'dayjs';
import fromNowAr from './fromNowAr';
import fromNowEn from './fromNowEn';

declare module 'dayjs' {
  interface Dayjs {
    fromNow(): any;
  }
}
const since = (time: any, languageName: any) => {
  languageName === 'ar' ? dayjs.extend(fromNowAr) : dayjs.extend(fromNowEn);
  return dayjs(time).fromNow();
};

export { fromNowEn, fromNowAr, since };
