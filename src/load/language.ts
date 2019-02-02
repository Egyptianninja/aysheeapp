import { Localization } from 'expo';

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
