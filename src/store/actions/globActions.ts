import {
  ADD_PERMISSION,
  INIT_APP,
  SET_BRANDS,
  SET_LANGUAGE,
  SET_RECENT_LOCATION,
  SET_SUB_BRANDS,
  SHOW_MODAL,
  HIDE_MODAL
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
export function showModal() {
  return {
    type: SHOW_MODAL
  };
}
export function hideModal() {
  return {
    type: HIDE_MODAL
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
export function setRecentLocation({ location, expiresAt }: any) {
  return {
    type: SET_RECENT_LOCATION,
    location,
    expiresAt
  };
}
