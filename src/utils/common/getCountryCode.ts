import { AsyncStorage } from 'react-native';
import { telecode } from '../../constants';
import { parseJwt } from '../common';

export const getCountryCode = async () => {
  const token = await AsyncStorage.getItem('aysheetoken');
  const data = parseJwt(token);
  const teleitem =
    data.country === ''
      ? telecode.filter((cc: any) => cc.name === 'Qatar')
      : telecode.filter((cc: any) => cc.name === data.country);
  if (teleitem.length > 0) {
    return {
      country: data.country === '' ? 'Qatar' : data.country,
      ccode: teleitem[0].tel
    };
  } else {
    return { country: '', ccode: '' };
  }
};
