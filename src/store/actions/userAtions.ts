import {
  LOGIN,
  LOGOUT,
  EMAIL_ADDED,
  EMAIL_REMOVED,
  UPDATE_USER,
  PHONE_ADDED,
  PHOME_REMOVED,
  SMS_SENT,
  INIT_TIME,
  CODE_SENT,
  INIT_CODE
} from "../types";

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
