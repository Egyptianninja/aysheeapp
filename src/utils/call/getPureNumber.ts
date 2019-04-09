import { telecode } from '../../constants';
import { user } from '../../store/getStore';
import { parseJwt } from '../common/parseJwt';

export const getPureNumber = (phone: any) => {
  const userData = user();
  console.log(userData);

  const token = userData.token;
  const data = parseJwt(token);
  console.log('data', data);

  // TODO:
  const countryCode =
    data.country === ''
      ? 974
      : telecode.filter((cc: any) => cc.name === data.country)[0].tel;
  return phone.replace(countryCode, '');
};
