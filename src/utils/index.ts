import {
  getDBNextPosts,
  getNamedAggs,
  getNewPosts,
  getNextPosts,
  getTimeLineBuckets,
  readyPost,
  readyPosts,
  readyUserPosts
} from './apollo';
import BottomDrawer from './bottomDrawar';
import { call, getPureNumber } from './call';
import { getCameraPermission, getCameraRollPermission } from './camera';
import ColorPicker from './color';
import {
  arabicToNum,
  filterOptions,
  getCodeFromCountry,
  getCountryCityFromToken,
  getCountryCode,
  getCountryCodeQatar,
  getCountryFromLatLon,
  getCurrency,
  getDate,
  getLang,
  getLocale,
  getLocaleCountry,
  isArabic,
  nameToColor,
  Orientation,
  parseJwt,
  rtlos,
  StyleSheet,
  ZoomView
} from './common';
import {
  compressImage,
  flipImage,
  ImagePicker,
  ImageViewer,
  pickImage,
  pickImageWithoutUpload,
  ProgressiveImage,
  uploadPhoto,
  uploadPhotos,
  uploadPickedImage
} from './image';
import {
  getDateDistance,
  getSecondsDistance,
  getSendSmsInterval
} from './interval';
import DotIndicator from './loading';
import DotIndicatorSmall from './loading/small';
import { getUserLocation, ItemLocation, UserLocation } from './location';
import Message from './message';
import { registerForPushNotificationsAsync } from './notifications';
import { isIphoneX, isTablet } from './platform/device';
import { onShare } from './share';
import { since } from './since';
export {
  StyleSheet,
  uploadPhoto,
  uploadPhotos,
  pickImage,
  compressImage,
  ImagePicker,
  since,
  getNextPosts,
  getNewPosts,
  readyPosts,
  readyPost,
  readyUserPosts,
  getDBNextPosts,
  isArabic,
  parseJwt,
  getTimeLineBuckets,
  getNamedAggs,
  arabicToNum,
  registerForPushNotificationsAsync,
  onShare,
  UserLocation,
  ItemLocation,
  getPureNumber,
  call,
  getDateDistance,
  getSecondsDistance,
  getSendSmsInterval,
  getCountryCode,
  ImageViewer,
  getCountryCodeQatar,
  nameToColor,
  getLang,
  getLocale,
  ProgressiveImage,
  Message,
  filterOptions,
  DotIndicator,
  getUserLocation,
  getCountryFromLatLon,
  DotIndicatorSmall,
  Orientation,
  ZoomView,
  flipImage,
  getLocaleCountry,
  getCodeFromCountry,
  getCountryCityFromToken,
  ColorPicker,
  pickImageWithoutUpload,
  uploadPickedImage,
  getDate,
  getCurrency,
  isIphoneX,
  isTablet,
  rtlos,
  BottomDrawer,
  getCameraRollPermission,
  getCameraPermission
};
