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

const initialState = {
  isAuthenticated: false,
  token: null,
  pushToken: null,
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
    case ADD_UNIQUENAME:
      return {
        ...state,
        user: {
          ...state.user,
          uniquename: action.name
        }
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
        email: action.email,
        name: action.name
      };
    case ADD_PUSH_TOKEN:
      return {
        ...state,
        pushToken: action.pushToken
      };
    case EMAIL_REMOVED:
      return {
        ...state,
        email: null,
        name: null
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
    case UPDATE_QTY:
      const nameqty = action.name + 'qty';
      return {
        ...state,
        user: {
          ...state.user,
          [nameqty]: state.user[nameqty] + action.num
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
