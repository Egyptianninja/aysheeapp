import { Linking, Platform } from 'react-native';

const isString = (str: any) =>
  Object.prototype.toString.call(str) === '[object String]';
const isBool = (bool: any) =>
  Object.prototype.toString.call(bool) === '[object Boolean]';

const createError = (msg = '') => Promise.reject(new Error(msg));

const openLink = (url: any) => {
  return Linking.canOpenURL(url).then(canOpen => {
    if (!canOpen) {
      return createError(`invalid URL provided: ${url}`);
    } else {
      return Linking.openURL(url).catch(err => Promise.reject(err));
    }
  });
};

const call = (args = {}) => {
  const settings: any = {
    prompt: true,
    ...args
  };

  if (!settings.number) {
    return createError('no number provided');
  }
  if (!isString(settings.number)) {
    return createError('number should be string');
  }
  if (!isBool(settings.prompt)) {
    return createError('prompt should be bool');
  }

  const url = `${
    Platform.OS === 'ios' && settings.prompt ? 'telprompt:' : 'tel:'
  }${settings.number}`;

  return openLink(url);
};

export default call;
