import { user } from '../../store/getStore';
import { telecode } from '../../constants';
import { parseJwt } from '../common/parseJwt';

export const getPureNumber = (phone: any) => {
  const userData = user();
  const token = userData.token;
  const data = parseJwt(token);
  // TODO:
  const countryCode =
    data.country === ''
      ? 974
      : telecode.filter((cc: any) => cc.name === data.country)[0].tel;
  return phone.replace(countryCode, '');
};
