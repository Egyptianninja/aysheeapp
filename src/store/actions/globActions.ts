import {
  ADD_PERMISSION,
  INIT_APP,
  SET_BRANDS,
  SET_LANGUAGE,
  SET_RECENT_LOCATION,
  SET_SUB_BRANDS,
  SHOW_MODAL,
  HIDE_MODAL,
  ADD_NOTIFICATION,
  INIT_NOTIFICATIONS,
  SHOW_CONTACT,
  ADD_FAV,
  ADD_LIKE,
  SAVE_FAV,
  ADD_CATEGORYIDS
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

export function addNotification() {
  return {
    type: ADD_NOTIFICATION
  };
}
export function initNotifications() {
  return {
    type: INIT_NOTIFICATIONS
  };
}
export function showContact(status: any) {
  return {
    type: SHOW_CONTACT,
    status
  };
}

export function addFav(postId: any) {
  return {
    type: ADD_FAV,
    postId
  };
}
export function saveFav(post: any) {
  return {
    type: SAVE_FAV,
    post
  };
}

export function addLike(postId: any) {
  return {
    type: ADD_LIKE,
    postId
  };
}
export function addCategoryId(ids: any) {
  return {
    type: ADD_CATEGORYIDS,
    ids
  };
}
