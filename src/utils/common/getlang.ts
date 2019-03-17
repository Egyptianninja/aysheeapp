import { Localization } from 'expo';
import { Platform } from 'react-native';
export const getLocale = () => {
  const loc = Localization;
  const local = {
    country: loc.country,
    isRTL: loc.isRTL,
    lang: loc.locale,
    timezone: loc.timezone
  };
  return local;
};

export const getLang = () => {
  const locale = getLocale();
  return locale.lang.substring(0, 2);
};
export const getLocaleLang = () => {
  const locale = getLocale();
  return locale.lang;
};

export const isRTLISO = () => {
  const loc = Localization;
  const isRTL = loc.isRTL;
  const IOS = Platform.OS === 'ios';
  return isRTL && IOS;
};
export const isRTLAndroid = () => {
  const loc = Localization;
  const isRTL = loc.isRTL;
  const Android = Platform.OS === 'android';
  return isRTL && Android;
};

export const rtlos = () => {
  const loc = Localization;
  const isRTL = loc.isRTL;
  const Android = Platform.OS === 'android';
  return !isRTL && !Android
    ? 0
    : !isRTL && Android
    ? 1
    : isRTL && !Android
    ? 2
    : isRTL && Android
    ? 3
    : null;
};
