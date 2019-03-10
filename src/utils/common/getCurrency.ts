import { currencyTypes } from '../../constants';
import { country } from '../../store/getStore';

export const getCurrency = () => {
  const deviceCountry = country();
  const localCurrency: any = currencyTypes.filter(
    cur => cur.country === deviceCountry
  );
  if (localCurrency.length > 0) {
    return localCurrency[0];
  } else {
    return currencyTypes[0];
  }
};
