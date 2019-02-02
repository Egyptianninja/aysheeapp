import {
  SET_LANGUAGE,
  SET_THEME,
  SET_BRANDS,
  SET_SUB_BRANDS,
  INIT_APP
} from "../types";

const initialState = {
  language: "",
  languageName: "",
  country: "",
  ccode: "",
  theme: "",
  themeName: "",
  brands: "",
  subBrands: ""
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
        ccode: action.ccode
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.theme,
        themeName: action.themeName
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
