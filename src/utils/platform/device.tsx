import { Dimensions, PixelRatio, Platform } from 'react-native';

export function isIphoneX() {
  const dim = Dimensions.get('window');

  return Platform.OS === 'ios' && (isIPhoneXSize(dim) || isIPhoneXrSize(dim));
}

export function isIPhoneXSize(dim: any) {
  return dim.height === 812 || dim.width === 812;
}

export function isIPhoneXrSize(dim: any) {
  return dim.height === 896 || dim.width === 896;
}

export function isTablet() {
  const dim = Dimensions.get('window');
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = dim.width * pixelDensity;
  const adjustedHeight = dim.height * pixelDensity;

  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else if (
    pixelDensity === 2 &&
    (adjustedWidth >= 1920 || adjustedHeight >= 1920)
  ) {
    return true;
  } else {
    return false;
  }
}
