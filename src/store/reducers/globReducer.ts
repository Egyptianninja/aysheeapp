import { SET_LANGUAGE, SET_BRANDS, SET_SUB_BRANDS, INIT_APP } from '../types';

const initialState = {
  language: '',
  languageName: '',
  country: '',
  code: '',
  brands: '',
  subBrands: ''
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.language,
        languageName: action.languageName
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

    default:
      return state;
  }
}
