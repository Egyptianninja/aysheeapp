import {
  SET_LANGUAGE,
  SET_BRANDS,
  SET_SUB_BRANDS,
  INIT_APP,
  ADD_PERMISSION
} from '../types';

export function setLanguage(language: any, languageName: string, isRTL: any) {
  return {
    type: SET_LANGUAGE,
    language,
    languageName,
    isRTL
  };
}
export function initApp(country: any, code: any) {
  return {
    type: INIT_APP,
    country,
    code
  };
}

export function initBrands(brands: any) {
  return {
    type: SET_BRANDS,
    brands
  };
}

export function initSubBrands(subBrands: any) {
  return {
    type: SET_SUB_BRANDS,
    subBrands
  };
}

export function addPermission(permission: any) {
  return {
    type: ADD_PERMISSION,
    permission
  };
}
