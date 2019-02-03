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
} from '../types';

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null as any,
  phone: null,
  name: null,
  sms: {
    nextTime: null,
    qty: 0
  },
  code: {
    nextTime: null,
    qty: 0
  }
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.token,
        user: action.data
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null as any,
        phone: null,
        name: null,
        sms: {
          nextTime: null,
          qty: 0
        },
        code: {
          nextTime: null,
          qty: 0
        }
      };
    case EMAIL_ADDED:
      return {
        ...state,
        email: action.email
      };
    case EMAIL_REMOVED:
      return {
        ...state,
        email: null
      };
    case PHONE_ADDED:
      return {
        ...state,
        phone: action.phone,
        name: action.name
      };
    case PHOME_REMOVED:
      return {
        ...state,
        phone: null,
        name: null
      };
    case UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    case SMS_SENT:
      return {
        ...state,
        sms: {
          nextTime: action.nextTime,
          qty: state.sms.qty > 6 ? 0 : state.sms.qty + 1
        }
      };
    case CODE_SENT:
      return {
        ...state,
        code: {
          nextTime: action.nextTime,
          qty: state.code.qty > 5 ? 0 : state.code.qty + 1
        }
      };
    case INIT_TIME:
      return {
        ...state,
        sms: {
          nextTime: null,
          qty: 0
        }
      };
    case INIT_CODE:
      return {
        ...state,
        code: {
          nextTime: null,
          qty: 0
        }
      };
    default:
      return state;
  }
}
