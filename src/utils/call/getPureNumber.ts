import { telecode } from '../../constants';
import { user, code } from '../../store/getStore';
import { parseJwt } from '../common/parseJwt';

export const getPureNumberFromToken = (phone: any) => {
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
export const getPureNumber = (phone: any) => {
  return phone.replace(code(), '');
};
