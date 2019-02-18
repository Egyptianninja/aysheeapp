import wc from 'which-country';

import { AsyncStorage } from 'react-native';
import { telecode } from '../../constants';
import { parseJwt } from './parseJwt';
export const getCountryCode = async () => {
  const token = await AsyncStorage.getItem('aysheetoken');
  const data = parseJwt(token);
  const teleitem = telecode.filter((cc: any) => cc.name === data.country);
  return {
    country: data.country,
    code: teleitem[0].tel
  };
};

export const getCountryCodeQatar = async () => {
  const token = await AsyncStorage.getItem('aysheetoken');
  const data = parseJwt(token);
  const teleitem =
    data.country === ''
      ? telecode.filter((cc: any) => cc.name === 'Qatar')
      : telecode.filter((cc: any) => cc.name === data.country);
  if (teleitem.length > 0) {
    return {
      country: data.country === '' ? 'Qatar' : data.country,
      code: teleitem[0].tel
    };
  } else {
    return { country: '', code: '' };
  }
};

export const getCountryFromLatLon = (lat: any, lon: any) => {
  const iso3 = wc([lon, lat]);
  const country = telecode.filter((cc: any) => cc.iso3 === iso3);
  if (country.length > 0) {
    return country[0].name;
  } else {
    return null;
  }
};
