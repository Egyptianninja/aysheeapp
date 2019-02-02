import dayjs from "dayjs";
import fromNowEn from "./fromNowEn";
import fromNowAr from "./fromNowAr";

declare module "dayjs" {
  interface Dayjs {
    fromNow(): any;
  }
}
const since = (time: any, languageName: any) => {
  languageName === "ar" ? dayjs.extend(fromNowAr) : dayjs.extend(fromNowEn);
  return dayjs(time).fromNow();
};

export { fromNowEn, fromNowAr, since };
