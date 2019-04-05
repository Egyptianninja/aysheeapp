import {
  ADD_PUSH_TOKEN,
  ADD_UNIQUENAME,
  CODE_SENT,
  EMAIL_ADDED,
  EMAIL_REMOVED,
  INIT_CODE,
  INIT_TIME,
  LOGIN,
  LOGOUT,
  PHOME_REMOVED,
  PHONE_ADDED,
  SMS_SENT,
  UPDATE_QTY,
  UPDATE_USER
} from '../types';

export function login(token: string, data: any) {
  return {
    type: LOGIN,
    token,
    data
  };
}
export function logout() {
  return {
    type: LOGOUT
  };
}
export function addUniquename(name: any) {
  return {
    type: ADD_UNIQUENAME,
    name
  };
}
export function addPushToken(pushToken: any) {
  return {
    type: ADD_PUSH_TOKEN,
    pushToken
  };
}
export function emailAdded(email: string) {
  return {
    type: EMAIL_ADDED,
    email
  };
}
export function emailRemoved() {
  return {
    type: EMAIL_REMOVED
  };
}
export function phoneAdded(phone: string, name: string) {
  return {
    type: PHONE_ADDED,
    phone,
    name
  };
}
export function phoneRemoved() {
  return {
    type: PHOME_REMOVED
  };
}
export function updateUser(payload: any) {
  return {
    type: UPDATE_USER,
    payload
  };
}
export function smsSent(nextTime: any) {
  return {
    type: SMS_SENT,
    nextTime
  };
}
export function codeSent(nextTime: any) {
  return {
    type: CODE_SENT,
    nextTime
  };
}
export function initTime() {
  return {
    type: INIT_TIME
  };
}
export function initCode() {
  return {
    type: INIT_CODE
  };
}
export function updateQty(name: any, num: any) {
  return {
    type: UPDATE_QTY,
    name,
    num
  };
}
