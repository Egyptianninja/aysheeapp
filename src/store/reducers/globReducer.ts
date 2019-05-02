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
import { categoryIds } from '../../constants';

const initialState = {
  language: '',
  languageName: '',
  isRTL: false,
  country: '',
  code: '',
  brands: '',
  subBrands: '',
  permissions: {},
  recentLocation: {},
  showModal: false,
  notifications: 0,
  showcontact: true,
  favs: [],
  likes: [],
  favoorites: [],
  categoryIds
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
    case SHOW_MODAL:
      return {
        ...state,
        showModal: !state.showModal
      };
    case SHOW_CONTACT:
      return {
        ...state,
        showcontact: action.status
      };
    case HIDE_MODAL:
      return {
        ...state,
        showModal: false
      };
    case SET_SUB_BRANDS:
      return {
        ...state,
        subBrands: action.subBrands
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications + 1
      };
    case INIT_NOTIFICATIONS:
      return {
        ...state,
        notifications: 0
      };
    case ADD_PERMISSION:
      return {
        ...state,
        permissions: {
          ...state.permissions,
          [action.permission]: true
        }
      };
    case SET_RECENT_LOCATION:
      return {
        ...state,
        recentLocation: {
          location: action.location,
          expiresAt: action.expiresAt
        }
      };

    case ADD_FAV:
      const favlist: any = state.favs;
      if (favlist.includes(action.postId)) {
        return {
          ...state,
          favs: state.favs.filter((fav: any) => fav !== action.postId)
        };
      } else {
        if (state.favs.length > 100) {
          state.favs.shift();
        }
        return {
          ...state,
          favs: [...state.favs, action.postId]
        };
      }
    case SAVE_FAV:
      const favooriteslist: any = state.favoorites.map((fav: any) => fav.id);
      if (favooriteslist.includes(action.post.id)) {
        return {
          ...state,
          favoorites: state.favoorites.filter(
            (fav: any) => fav.id !== action.post.id
          )
        };
      } else {
        if (state.favoorites.length > 100) {
          state.favoorites.shift();
        }
        return {
          ...state,
          favoorites: [...state.favoorites, action.post]
        };
      }

    case ADD_LIKE:
      const likelist: any = state.likes;
      if (likelist.includes(action.postId)) {
        return {
          ...state,
          likes: state.likes.filter((like: any) => like !== action.postId)
        };
      } else {
        if (state.likes.length > 100) {
          state.likes.shift();
        }
        return {
          ...state,
          likes: [...state.likes, action.postId]
        };
      }

    case ADD_CATEGORYIDS:
      return {
        ...state,
        categoryIds: action.ids
      };

    default:
      return state;
  }
}
