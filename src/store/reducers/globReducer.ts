import {
  SET_LANGUAGE,
  SET_BRANDS,
  SET_SUB_BRANDS,
  INIT_APP,
  ADD_PERMISSION
} from '../types';

const initialState = {
  language: '',
  languageName: '',
  isRTL: false,
  country: '',
  code: '',
  brands: '',
  subBrands: '',
  permissions: {}
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.language,
        languageName: action.languageName,
        isRTL: action.isRTL
      };
    case INIT_APP:
      return {
        ...state,
        country: action.country,
        code: action.code
      };
    case SET_BRANDS:
      return {
        ...state,
        brands: action.brands
      };
    case SET_SUB_BRANDS:
      return {
        ...state,
        subBrands: action.subBrands
      };
    case ADD_PERMISSION:
      return {
        ...state,
        permissions: {
          ...state.permissions,
          [action.permission]: true
        }
      };

    default:
      return state;
  }
}
